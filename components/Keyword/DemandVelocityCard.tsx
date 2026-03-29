import KeywordsChart from "../Charts/KeywordsChart";
import AnalyticsCard from "./AnalyticsCard";

interface IProps {
    data?: {
        name: string;
        vacanciesCount: number;
    }[] | null;
    loading: boolean;
}

export default function DemandVelocityCard({ data, loading }: IProps) {
    return (
        <AnalyticsCard>
            <p className="font-bold text-[18px] leading-[156%] mb-2">
                Demand velocity
            </p>

            <p className="text-[12px] leading-[133%] -tracking-tighter uppercase text-[#64748b] mb-8">
                Open Postings (Last Month)
            </p>

            {loading ? (
                <div>Loading...</div>
            ) : data ? (
                <KeywordsChart data={data} valueName="vacanciesCount" />
            ) : (
                <div>No data</div>
            )}
        </AnalyticsCard>
    );
}
