import { useJobStore } from "@/stores/useJobStore";

export default function KeywordHeader() {
    const { query } = useJobStore();
    return (
        <>
            <p className="w-fit font-bold text-[10px] tracking-widest rounded-[2px] py-0.5 px-2 bg-secondary uppercase text-[#cbd5e1]">
                Market Keyword
            </p>

            <h1 className="font-black text-[48px] tracking-[-0.03em] leading-[150%]">
                {query || "Labor Market Overview"}
            </h1>

            <p className="text-[18px] leading-[163%] text-muted-foreground mb-12">
                {query
                    ? `Comprehensive labor market analysis of technical requirements, compensation benchmarks, and demand velocity for ${query} roles.`
                    : "Comprehensive labor market analysis of technical requirements, compensation benchmarks, and demand velocity across current вакансии and skill trends."}
            </p>
        </>
    );
}
