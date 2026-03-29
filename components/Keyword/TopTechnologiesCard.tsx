import AnalyticsCard from "./AnalyticsCard";

interface IWord {
    keyword: string;
    percentage: string | number;
}

interface IProps {
    data?: IWord[];
    loading: boolean;
}

export default function TopTechnologiesCard({ data, loading }: IProps) {
    return (
        <AnalyticsCard>
            <p
                className="font-bold text-[14px] text-[#64748b] tracking-widest uppercase mb-6"
                style={{ lineHeight: "143%" }}
            >
                Top Required Technologies
            </p>

            <div className="flex flex-col gap-5">
                {loading ? (
                    <div>Loading...</div>
                ) : data ? (
                    data.map((word, index) => (
                        <div key={`${word.keyword}-${index}`}>
                            <div className="flex items-center justify-between">
                                <p className="font-bold text-[12px] leading-[133%]">
                                    {word.keyword}
                                </p>

                                <p className="text-[10px] text-[#60a5fa] leading-normal">
                                    {+word.percentage}%
                                </p>
                            </div>

                            <div className="relative w-full h-1 bg-secondary rounded-full mt-2">
                                <div
                                    className="bg-ring rounded-full h-full"
                                    style={{
                                        width: `${word.percentage}%`,
                                    }}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No data</div>
                )}
            </div>
        </AnalyticsCard>
    );
}
