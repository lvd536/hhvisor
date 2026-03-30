import { useAreaStore } from "@/stores/useAreaStore";
import { useFilterStore } from "@/stores/useFilterStore";
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
    } = useJobStore();

    const filters = useFilterStore(
        useShallow((s) => ({
            experience: s.experience,
            workFormat: s.workFormat,
            salary: s.salary,
            setExperience: s.setExperience,
            setSalary: s.setSalary,
            setWorkFormat: s.setWorkFormat,
        })),
    );

    const { areas, currentArea, setCurrentArea } = useAreaStore();

    useEffect(() => {
        const timeout = setTimeout(async () => {
            const pageParam = params.get("page") ?? "0";
            setPage(Number(pageParam));
            await fetchVacancies(currentArea, filters);
        }, 300);

        return () => clearTimeout(timeout);
    }, [params, currentArea, filters, fetchVacancies, setPage]);

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
