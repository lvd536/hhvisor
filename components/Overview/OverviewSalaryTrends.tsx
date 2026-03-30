import SalaryTrendsChart from "../Charts/SalaryTrendsChart";

type Props = {
    salaryTrends?: Array<{
        name: string;
        salary: number;
    }>;
};

export default function OverviewSalaryTrends({ salaryTrends }: Props) {
    return (
        <div className="w-full border border-secondary rounded-[8px] p-8 bg-card">
            <p className="tracking-tight font-bold text-[20px]">
                Salary Trends over Time
            </p>
            <p className="text-[12px] leading-[133%] text-[#64748b] mt-1 mb-10">
                Aggregated data across top 50 metropolitan hubs.
            </p>

            {salaryTrends ? (
                <SalaryTrendsChart data={salaryTrends} />
            ) : (
                "Loading..."
            )}
        </div>
    );
}
