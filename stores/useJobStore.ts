import { VACANCIES_PER_PAGE } from "@/consts/api";
import { IVacancy, IVacancyResponse } from "@/types/api.types";
import { create } from "zustand";
import { IFilterStore } from "./useFilterStore";
import { getMonthDaysRanges } from "@/utils/date";
import {
    CurrenciesMap,
    KeywordAnalyticsType,
    OverviewAnalyticsType,
} from "@/types/stores.types";
import { DEFAULT_KEYWORDS, WORK_FORMAT_MAP } from "@/consts/jobStore";
import {
    getCurrencies,
    makeCacheKey,
    getFromCache,
    fetchAllVacancies,
    getAverageSalary,
    buildKeywordStats,
    setToCache,
    getSalaryDistribution,
} from "@/services/jobService";

interface JobStore {
    query: string;
    page: number;
    pages: number;
    hasMorePages: boolean;
    currencies: CurrenciesMap;
    vacancies: IVacancy[];
    isLoading: boolean;
    error: string | null;
    keywords: string[];
    setQuery: (query: string) => void;
    setPage: (page: number) => void;
    fetchVacancies: (
        area: number | null,
        filters?: IFilterStore,
    ) => Promise<void>;
    init: () => Promise<void>;
    setKeywords: (keywords: string[]) => void;
    getOverviewAnalytics: (
        area: number | null,
        filters?: IFilterStore,
    ) => Promise<OverviewAnalyticsType>;
    getKeywordAnalytics: (
        area: number | null,
        filters?: IFilterStore,
    ) => Promise<KeywordAnalyticsType>;
}

export const useJobStore = create<JobStore>((set, get) => ({
    query: "",
    page: 0,
    pages: 0,
    hasMorePages: true,
    currencies: {},
    setQuery: (query) => set({ query, page: 0, vacancies: [] }),
    vacancies: [],
    isLoading: false,
    error: null,
    keywords: [...DEFAULT_KEYWORDS],
    setKeywords: (keywords) => set({ keywords }),
    fetchVacancies: async (area, filters) => {
        const store = get();
        set({ isLoading: true, error: null });
        try {
            const params = new URLSearchParams();
            params.append("text", store.query);

            filters?.experience.forEach((exp) =>
                params.append("experience", exp),
            );
            filters?.workFormat.forEach((format) => {
                params.append(
                    "work_format",
                    WORK_FORMAT_MAP[format].toUpperCase(),
                );
            });

            if (filters?.salary) {
                params.append("salary", filters.salary[0].toString());
            }

            if (area) {
                params.append("area", area.toString());
            }

            params.append("page", store.page.toString());
            params.append("per_page", "50");

            const res = await fetch(`/api/hh/vacancies?${params.toString()}`);

            if (!res.ok) throw new Error("Failed to fetch");

            const data = (await res.json()) as IVacancyResponse;

            set({
                vacancies: data.items ?? [],
                isLoading: false,
                hasMorePages: data.pages > store.page,
                page: data.page ?? 0,
                pages: data.pages ?? 0,
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            set({ error: error?.message || error, isLoading: false });
        }
    },
    init: async () => {
        set({ isLoading: true, error: null });
        const store = get();
        try {
            const res = await fetch(
                `/api/hh/vacancies?per_page=${VACANCIES_PER_PAGE}`,
            );
            if (!res.ok) throw new Error("Failed to fetch");
            const data = (await res.json()) as IVacancyResponse;
            set({
                vacancies: data.items ?? [],
                isLoading: false,
                hasMorePages: data.pages > get().page,
                page: data.page ?? 0,
                pages: data.pages ?? 0,
            });

            if (Object.keys(store.currencies).length === 0) {
                const currencies = await getCurrencies();
                set({ currencies });
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            set({ error: error?.message || error, isLoading: false });
        }
    },
    setPage: (page) => set({ page }),
    getOverviewAnalytics: async (area, filters) => {
        const store = get();

        if (Object.keys(store.currencies).length === 0) {
            const currencies = await getCurrencies();
            set({ currencies });
        }

        const cacheKey = makeCacheKey(
            "overview",
            store.query.trim(),
            area,
            filters,
        );
        const cached = getFromCache<OverviewAnalyticsType>(cacheKey);
        if (cached) return cached;

        set({ isLoading: true, error: null });

        try {
            const ranges = getMonthDaysRanges();
            const { allItems, firstData } = await fetchAllVacancies(
                store.query.trim(),
                area,
                ranges,
                filters,
            );

            const result: Array<{ name: string; salary: number }> = [];

            for (let day = 1; day <= ranges.daysInMonth; day++) {
                const dayItems = allItems.filter(
                    (item) => new Date(item.created_at).getDate() === day,
                );
                result.push({
                    name: day.toString(),
                    salary: getAverageSalary(dayItems, store.currencies),
                });
            }

            const stats = buildKeywordStats(allItems, store.keywords);
            const sorted = [...stats].sort((a, b) => b.count - a.count);

            const output: OverviewAnalyticsType = {
                salaryTrends: result,
                jobsCount: firstData.found ?? 0,
                topWord: sorted[0],
                topWords: sorted,
                avgSalary: getAverageSalary(allItems, store.currencies),
            };

            setToCache(cacheKey, output);
            set({ isLoading: false });
            return output;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            set({ error: error?.message || error, isLoading: false });
            throw error;
        }
    },

    getKeywordAnalytics: async (area, filters) => {
        const store = get();

        if (Object.keys(store.currencies).length === 0) {
            const currencies = await getCurrencies();
            set({ currencies });
        }

        const cacheKey = makeCacheKey(
            "keyword",
            store.query.trim(),
            area,
            filters,
        );
        const cached = getFromCache<KeywordAnalyticsType>(cacheKey);
        if (cached) return cached;

        set({ isLoading: true, error: null });

        try {
            const ranges = getMonthDaysRanges();
            const { allItems } = await fetchAllVacancies(
                store.query.trim(),
                area,
                ranges,
                filters,
            );

            const demandVelocity: KeywordAnalyticsType["demandVelocity"] = [];

            for (let day = 1; day <= ranges.daysInMonth; day++) {
                const dayItems = allItems.filter(
                    (item) => new Date(item.created_at).getDate() === day,
                );
                demandVelocity.push({
                    name: day.toString(),
                    vacanciesCount: dayItems.length,
                });
            }

            const sorted = buildKeywordStats(allItems, store.keywords).sort(
                (a, b) => b.count - a.count,
            );

            const output: KeywordAnalyticsType = {
                demandVelocity,
                salaryDistribution: getSalaryDistribution(
                    allItems,
                    store.currencies,
                ),
                topWords: sorted,
            };

            setToCache(cacheKey, output);
            set({ isLoading: false });
            return output;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            set({ error: error?.message || error, isLoading: false });
            throw error;
        }
    },
}));
