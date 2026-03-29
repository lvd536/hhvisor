import KeywordsChart from "../Charts/KeywordsChart";
import AnalyticsCard from "./AnalyticsCard";

interface IProps {
    data?: {
        name: string;
        jobsCount: number;
    }[] | null;
    loading: boolean;
}

export default function SalaryDistributionCard({ data, loading }: IProps) {
    return (
        <AnalyticsCard>
            <p className="font-bold text-[20px] leading-[140%] mb-2">
                Salary distribution
            </p>

            <p className="text-[14px] leading-[143%] text-muted-foreground">
                Annual Total Compensation (RUR)
            </p>

            {loading ? (
                <div>Loading...</div>
            ) : data ? (
                <KeywordsChart data={data} valueName="jobsCount" />
            ) : (
                <div>No data</div>
            )}
        </AnalyticsCard>
    );
}
