import { useAreaStore } from "@/stores/useAreaStore";
import { useFilterStore } from "@/stores/useFilterStore";
import { useJobStore } from "@/stores/useJobStore";
import { OverviewAnalyticsType } from "@/types/stores.types";
import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export function useOverviewAnalytics() {
    const [overviewAnalytics, setOverviewAnalytics] =
        useState<OverviewAnalyticsType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getOverviewAnalytics = useJobStore((s) => s.getOverviewAnalytics);

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

    const currentArea = useAreaStore((s) => s.currentArea);

    const stableFilters = useMemo(
        () => ({
            experience: filters.experience,
            workFormat: filters.workFormat,
            salary: filters.salary,
            setExperience: filters.setExperience,
            setSalary: filters.setSalary,
            setWorkFormat: filters.setWorkFormat,
        }),
        [
            filters.experience,
            filters.workFormat,
            filters.salary,
            filters.setExperience,
            filters.setSalary,
            filters.setWorkFormat,
        ],
    );

    useEffect(() => {
        let cancelled = false;

        const fetchAnalytics = async () => {
            try {
                setIsLoading(true);

                const res = await getOverviewAnalytics(
                    currentArea,
                    stableFilters,
                );

                if (cancelled || !res) return;

                setOverviewAnalytics(res);
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };

        fetchAnalytics();

        return () => {
            cancelled = true;
        };
    }, [getOverviewAnalytics, currentArea, stableFilters]);

    return {
        overviewAnalytics,
        isLoading,
    };
}
