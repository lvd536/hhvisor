import { VACANCIES_PER_PAGE } from "@/consts/api";
import { IVacancy, IVacancyResponse } from "@/types/api.types";
import { create } from "zustand";
import { IFilterStore } from "./useFilterStore";
import { getMonthDaysRanges } from "@/utils/date";
import {
    KeywordAnalyticsType,
    OverviewAnalyticsType,
} from "@/types/stores.types";

const DEFAULT_KEYWORDS = [
    "React",
    "Vue",
    "Angular",
    "TypeScript",
    "Node.js",
    "Next.js",
    "Tailwind",
    "Redux",
    "Zustand",
    "Docker",
    "PostgreSQL",
    "GraphQL",
] as const;

const WORK_FORMAT_MAP: Record<string, string> = {
    HYBRID: "hybrid",
    REMOTE: "remote",
    ON_SITE: "on_site",
} as const;

const ANALYTICS_CACHE_TTL = 5 * 60 * 1000;

interface CacheEntry<T> {
    data: T;
    ts: number;
}

const analyticsCache = new Map<
    string,
    CacheEntry<OverviewAnalyticsType | KeywordAnalyticsType>
>();

interface JobStore {
    query: string;
    page: number;
    pages: number;
    hasMorePages: boolean;
    setQuery: (query: string) => void;
    setPage: (page: number) => void;
    vacancies: IVacancy[];
    isLoading: boolean;
    error: string | null;
    fetchVacancies: (
        area: number | null,
        filters?: IFilterStore,
    ) => Promise<void>;
    initVacancies: () => Promise<void>;
    keywords: string[];
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
    initVacancies: async () => {
        set({ isLoading: true, error: null });
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            set({ error: error?.message || error, isLoading: false });
        }
    },
    setPage: (page) => set({ page }),
    getOverviewAnalytics: async (area, filters) => {
        const store = get();

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
                    salary: getAverageSalary(dayItems),
                });
            }

            const stats = buildKeywordStats(allItems, store.keywords);
            const sorted = [...stats].sort((a, b) => b.count - a.count);

            const output: OverviewAnalyticsType = {
                salaryTrends: result,
                jobsCount: firstData.found ?? 0,
                topWord: sorted[0],
                topWords: sorted,
                avgSalary: getAverageSalary(allItems),
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
                salaryDistribution: getSalaryDistribution(allItems),
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

function getSalaryValue(salary: IVacancy["salary"]): number | null {
    if (!salary) return null;

    const { from, to } = salary;

    if (from && to) return (from + to) / 2;
    if (from) return from;
    if (to) return to;

    return null;
}

function getAverageSalary(items: IVacancyResponse["items"]): number {
    let sum = 0;
    let count = 0;

    for (const i of items) {
        const value = getSalaryValue(i.salary);

        if (value) {
            sum += value;
            count++;
        }
    }

    return count ? sum / count : 0;
}

function getSalaryDistribution(items: IVacancy[]) {
    const result: KeywordAnalyticsType["salaryDistribution"] = [];

    const targetValues = [0, 30000, 80000, 120000, 160000, 200000, 400000];

    const itemsSalaries = items.map((i) =>
        i.salary ? i.salary.from || i.salary.to || 0 : 0,
    );

    targetValues.forEach((value, index, arr) => {
        if (index !== 0) {
            const jobsCount = itemsSalaries.reduce(
                (acc, item) =>
                    item <= value && item > arr[index - 1] ? acc + 1 : acc,
                0,
            );
            result.push({
                name: `RUR${value}`,
                jobsCount,
            });
        } else {
            const jobsCount = itemsSalaries.reduce(
                (acc, item) => (item < arr[index + 1] ? acc + 1 : acc),
                0,
            );
            result.push({
                name: `RUR${value}`,
                jobsCount,
            });
        }
    });
    return result;
}

async function fetchAllVacancies(
    query: string,
    area: number | null,
    ranges: {
        from: string;
        to: string;
        daysInMonth: number;
    },
    filters?: IFilterStore,
): Promise<{ allItems: IVacancy[]; firstData: IVacancyResponse }> {
    const params = new URLSearchParams();

    if (query) {
        params.append("text", query);
    }

    if (area) {
        params.append("area", area.toString());
    }

    filters?.experience.forEach((exp) => {
        params.append("experience", exp);
    });

    filters?.workFormat.forEach((format) => {
        params.append("work_format", WORK_FORMAT_MAP[format]);
    });

    params.append("per_page", "100");
    params.append("date_from", ranges.from);
    params.append("date_to", ranges.to);
    params.append("only_with_salary", "true");

    const firstRes = await fetch(`/api/hh/vacancies?${params}`);
    const firstData = (await firstRes.json()) as IVacancyResponse;
    const allItems = [...(firstData.items ?? [])];
    const totalPages = firstData.pages ?? 1;

    const rest = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, i) => {
            const p = new URLSearchParams(params);
            p.set("page", (i + 1).toString());
            return fetch(`/api/hh/vacancies?${p}`).then(
                (r) => r.json() as Promise<IVacancyResponse>,
            );
        }),
    );

    rest.forEach((page) => allItems.push(...(page.items ?? [])));
    return { allItems, firstData };
}

function makeCacheKey(
    type: "overview" | "keyword",
    query: string,
    area: number | null,
    filters?: IFilterStore,
): string {
    return JSON.stringify({ type, query, area, filters });
}

function getFromCache<T>(key: string): T | null {
    const entry = analyticsCache.get(key) as CacheEntry<T> | undefined;
    if (!entry) return null;
    if (Date.now() - entry.ts > ANALYTICS_CACHE_TTL) {
        analyticsCache.delete(key);
        return null;
    }
    return entry.data;
}

function setToCache<T extends OverviewAnalyticsType | KeywordAnalyticsType>(
    key: string,
    data: T,
): void {
    analyticsCache.set(key, { data, ts: Date.now() });
}

function buildKeywordStats(
    items: IVacancy[],
    keywords: string[],
): Array<{ keyword: string; count: number; percentage: string }> {
    return keywords.map((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "i");
        let count = 0;

        items.forEach((job) => {
            const text = `${job.name} ${job.snippet?.requirement ?? ""} ${job.snippet?.responsibility ?? ""}`;
            if (regex.test(text)) count++;
        });

        return {
            keyword,
            count,
            percentage: items.length
                ? ((count / items.length) * 100).toFixed(1)
                : "0.0",
        };
    });
}
