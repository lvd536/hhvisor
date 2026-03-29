import { useAreaStore } from "@/stores/useAreaStore";
import { useFilterStore } from "@/stores/useFilterStore";
import { useJobStore } from "@/stores/useJobStore";
import { KeywordAnalyticsType } from "@/types/stores.types";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export function useKeywordAnalytics() {
    const [keywordAnalytics, setKeywordAnalytics] =
        useState<KeywordAnalyticsType | null>(null);
    const [loading, setLoading] = useState(true);

    const getKeywordAnalytics = useJobStore((s) => s.getKeywordAnalytics);

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

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setLoading(true);

            const res = await getKeywordAnalytics(currentArea, filters);

            if (cancelled) return;

            setKeywordAnalytics(res || null);
            setLoading(false);
        })();

        return () => {
            cancelled = true;
        };
    }, [getKeywordAnalytics, currentArea, filters]);

    return {
        keywordAnalytics,
        loading,
    };
}
