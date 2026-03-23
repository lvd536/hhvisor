import { VACANCIES_PER_PAGE } from "@/consts/api";
import { IVacancy, IVacancyResponse } from "@/types/api.types";
import { create } from "zustand";
import { IFilterStore } from "./useFilterStore";

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
    fetchVacancies: (filters?: IFilterStore) => Promise<void>;
    initVacancies: () => Promise<void>;
    keywords: string[];
    setKeywords: (keywords: string[]) => void;
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
    fetchVacancies: async (filters) => {
        const store = get();
        if (!store.query.trim()) return;
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
}));
