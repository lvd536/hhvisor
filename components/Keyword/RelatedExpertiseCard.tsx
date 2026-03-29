import AnalyticsCard from "./AnalyticsCard";

interface IWord {
    keyword: string;
    percentage: string | number;
}

interface IProps {
    data?: IWord[];
    loading: boolean;
}

export default function RelatedExpertiseCard({ data, loading }: IProps) {
    return (
        <AnalyticsCard>
            <p className="font-bold text-[20px] leading-[140%] mb-2">
                Related Expertise
            </p>

            <p className="text-[14px] leading-[143%] text-muted-foreground mb-2">
                Co-occurrence frequency in job listings
            </p>

            {loading ? (
                <div>Loading...</div>
            ) : data ? (
                <ul className="flex flex-wrap gap-3">
                    {data.map((word, index) => (
                        <li
                            className={`font-bold text-[14px] rounded-[12px] py-2 px-4 list-none ${
                                index === 0 ? "bg-primary" : "bg-secondary"
                            } ${+word.percentage <= 0 && "text-[#64748b]"}`}
                            key={`${word.keyword}-${index}`}
                        >
                            {word.keyword}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No data</div>
            )}
        </AnalyticsCard>
    );
}
