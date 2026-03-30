import { useOverviewAnalytics } from "@/hooks/useOverviewAnalytics";
import OverviewHeader from "./OverviewHeader";
import OverviewSalaryTrends from "./OverviewSalaryTrends";
import OverviewStatsCards from "./OverviewStatsCards";
import OverviewTopTechnologies from "./OverviewTopTechnologies";

export default function Overview() {
    const { overviewAnalytics, isLoading } = useOverviewAnalytics();

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="size-full flex-1 px-4 py-6 sm:px-6">
            <OverviewHeader />

            <OverviewStatsCards overviewAnalytics={overviewAnalytics} />

            <div className="w-full md:flex gap-8 mt-12 items-start justify-between">
                {overviewAnalytics && overviewAnalytics.salaryTrends && (
                    <OverviewSalaryTrends
                        salaryTrends={overviewAnalytics.salaryTrends}
                    />
                )}

                <OverviewTopTechnologies
                    topWords={overviewAnalytics?.topWords}
                />
            </div>
        </div>
    );
}
