import { VACANCIES_PER_PAGE } from "@/consts/api";
import { IVacancy, IVacancyResponse } from "@/types/api.types";
import { create } from "zustand";
import { IFilterStore } from "./useFilterStore";
import { getMonthDaysRanges } from "@/utils/date";

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
    getSalaryTrends: (
        area: number | null,
        filters?: IFilterStore,
    ) => Promise<Array<{
        name: string;
        salary: number;
    }> | null>;
}

export const useJobStore = create<JobStore>((set, get) => ({
    query: "",
    page: 0,
    pages: 0,
    hasMorePages: true,
    setQuery: (query) => set({ query }),
    vacancies: [],
    isLoading: false,
    error: null,
    keywords: [
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
    ],
    setKeywords: (keywords) => set({ keywords }),
    fetchVacancies: async (area, filters) => {
        const store = get();
        set((prev) => ({ isLoading: true, error: null, query: prev.query }));
        try {
            const params = new URLSearchParams();
            params.append("text", store.query);

            filters?.experience.forEach((exp) =>
                params.append("experience", exp),
            );
            filters?.workFormat.forEach((format) => {
                const map: Record<string, string> = {
                    HYBRID: "hybrid",
                    REMOTE: "remote",
                    ON_SITE: "on_site",
                };
                params.append("work_format", map[format].toUpperCase());
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
    getSalaryTrends: async (area, filters) => {
        const store = get();
        set({ isLoading: true, error: null });

        const result: Array<{ name: string; salary: number }> = [];
        const ranges = getMonthDaysRanges();

        const params = new URLSearchParams();

        const query = store.query.trim();
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
            const map: Record<string, string> = {
                HYBRID: "HYBRID",
                REMOTE: "REMOTE",
                ON_SITE: "ON_SITE",
            };
            params.append("work_format", map[format]);
        });

        params.append("per_page", "100");
        params.append("date_from", ranges.from);
        params.append("date_to", ranges.to);
        params.append("only_with_salary", "true");

        const firstUrl = `/api/hh/vacancies?${params.toString()}`;
        const firstRes = await fetch(firstUrl);
        const firstData = (await firstRes.json()) as IVacancyResponse;

        const allItems = [...(firstData.items ?? [])];
        const totalPages = firstData.pages ?? 1;

        const pageRequests = Array.from(
            { length: totalPages - 1 },
            (_, idx) => {
                const page = idx + 1;
                const p = new URLSearchParams(params);
                p.set("page", page.toString());
                return fetch(`/api/hh/vacancies?${p.toString()}`).then(
                    async (res) => (await res.json()) as IVacancyResponse,
                );
            },
        );

        const restPages = await Promise.all(pageRequests);

        for (const pageData of restPages) {
            allItems.push(...(pageData.items ?? []));
        }

        for (let day = 1; day <= ranges.daysInMonth; day++) {
            const dayItems = allItems.filter((item) => {
                const created = new Date(item.created_at);
                return created.getDate() === day;
            });

            result.push({
                name: day.toString(),
                salary: getAverageSalary(dayItems),
            });
        }

        set({ isLoading: false });
        return result;
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
