import { useAreaStore } from "@/stores/useAreaStore";
import { IFilterStore, useFilterStore } from "@/stores/useFilterStore";
import { useJobStore } from "@/stores/useJobStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export function useMarketDiscovery() {
    const params = useSearchParams();
    const {
        hasMorePages,
        page,
        pages,
        fetchVacancies,
        vacancies,
        query,
        setQuery,
        setPage,
    } = useJobStore(
        useShallow((s) => ({
            hasMorePages: s.hasMorePages,
            page: s.page,
            pages: s.pages,
            fetchVacancies: s.fetchVacancies,
            vacancies: s.vacancies,
            query: s.query,
            setQuery: s.setQuery,
            setPage: s.setPage,
        })),
    );

    const filters = useFilterStore(
        useShallow((s) => ({
            experience: s.experience,
            workFormat: s.workFormat,
            salary: s.salary,
        })),
    );

    const { areas, currentArea, setCurrentArea } = useAreaStore();

    useEffect(() => {
        fetchVacancies(currentArea, filters as IFilterStore);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const pageParam = Number(params.get("page") ?? "0");
            setPage(pageParam);
            fetchVacancies(currentArea, filters as IFilterStore);
        }, 300);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentArea, filters, query, params]);

    return {
        hasMorePages,
        page,
        pages,
        vacancies,
        query,
        setQuery,
        setCurrentArea,
        currentArea,
        areas,
    };
}
