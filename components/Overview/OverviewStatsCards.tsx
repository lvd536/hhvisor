import { OverviewAnalyticsType } from "@/types/stores.types";

type Props = {
    overviewAnalytics: OverviewAnalyticsType | null;
};

function StatCard({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="relative flex flex-col gap-2 max-w-75 items-start justify-start border border-secondary bg-card rounded-[8px] p-8">
            <p className="font-bold text-[11px] leading-normal tracking-widest text-[#64748b]">
                {label}
            </p>
            <p className="font-black tracking-tighter leading-[111%] text-[36px] text-[#60a5fa]">
                {value}
            </p>
        </div>
    );
}

export default function OverviewStatsCards({ overviewAnalytics }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <StatCard
                label="Avg Salary"
                value={
                    overviewAnalytics?.avgSalary
                        ? Math.round(overviewAnalytics.avgSalary)
                        : "Loading..."
                }
            />
            <StatCard
                label="Jobs Count"
                value={overviewAnalytics?.jobsCount ?? "Loading..."}
            />
            <StatCard
                label="Top Skill"
                value={overviewAnalytics?.topWord.keyword ?? "Loading..."}
            />
        </div>
    );
}
