import { useAreaStore } from "@/stores/useAreaStore";
import { useFilterStore } from "@/stores/useFilterStore";
import { useJobStore } from "@/stores/useJobStore";
import { KeywordAnalyticsType } from "@/types/stores.types";
import { useEffect, useState } from "react";
import KeywordsChart from "./Charts/KeywordsChart";
import { useShallow } from "zustand/react/shallow";

export default function Keyword() {
    const [keywordAnalytics, setKeywordAnalytics] =
        useState<KeywordAnalyticsType | null>(null);

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
            const res = await getKeywordAnalytics(currentArea, filters);
            if (cancelled || !res) return;
            setKeywordAnalytics(res);
        })();
        return () => {
            cancelled = true;
        };
    }, [getKeywordAnalytics, currentArea, filters]);
    return (
        <div className="size-full flex-1 px-4 py-6 sm:px-6">
            <p className="w-fit font-bold text-[10px] tracking-widest rounded-[2px] py-0.5 px-2 bg-secondary uppercase text-[#cbd5e1]">
                Market Keyword
            </p>
            <h1 className="font-black text-[48px] tracking-[-0.03em] leading-[150%]"></h1>
            <p className="text-[18px] leading-[163%] text-muted-foreground mb-12">
                Comprehensive labor market analysis of technical requirements,
                compensation benchmarks, and demand velocity for frontend
                engineering roles.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div
                    className="bg-card rounded-[8px] p-8"
                    style={{
                        border: "1px solid rgba(30, 41, 59, 0.5)",
                    }}
                >
                    <p className="font-bold text-[18px] leading-[156%] mb-2">
                        Demand velocity
                    </p>
                    <p className="text-[12px] leading-[133%] -tracking-tighter uppercase text-[#64748b] mb-8">
                        Open Postings (Last Month)
                    </p>
                    {keywordAnalytics && keywordAnalytics.demandVelocity ? (
                        <KeywordsChart
                            data={keywordAnalytics.demandVelocity}
                            valueName="vacanciesCount"
                        />
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div
                    className="bg-card rounded-[8px] p-8"
                    style={{
                        border: "1px solid rgba(30, 41, 59, 0.5)",
                    }}
                >
                    <p
                        className="font-bold text-[14px] text-[#64748b] tracking-widest uppercase mb-6"
                        style={{ lineHeight: "143%" }}
                    >
                        Top Required Technologies
                    </p>
                    <div className="flex flex-col gap-5">
                        {keywordAnalytics && keywordAnalytics.topWords
                            ? keywordAnalytics.topWords.map((word, index) => (
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
                                                  width: +word.percentage,
                                              }}
                                          />
                                      </div>
                                  </div>
                              ))
                            : "Loading..."}
                    </div>
                </div>
                <div
                    className="bg-card rounded-[8px] p-8"
                    style={{
                        border: "1px solid rgba(30, 41, 59, 0.5)",
                    }}
                >
                    <p className="font-bold text-[20px] leading-[140%] mb-2">
                        Salary distribution
                    </p>
                    <p className="text-[14px] leading-[143%] text-muted-foreground">
                        Annual Total Compensation (RUR)
                    </p>
                    {keywordAnalytics && keywordAnalytics.salaryDistribution ? (
                        <KeywordsChart
                            data={keywordAnalytics.salaryDistribution}
                            valueName="jobsCount"
                        />
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div
                    className="bg-card rounded-[8px] p-8"
                    style={{
                        border: "1px solid rgba(30, 41, 59, 0.5)",
                    }}
                >
                    <p className="font-bold text-[20px] leading-[140%] mb-2">
                        Related Expertise
                    </p>
                    <p className="text-[14px] leading-[143%] text-muted-foreground mb-2">
                        Co-occurrence frequency in job listings
                    </p>
                    <ul className="flex flex-wrap gap-3">
                        {keywordAnalytics && keywordAnalytics.topWords ? (
                            keywordAnalytics.topWords.map((word, index) => (
                                <div
                                    className={`font-bold text-[14px] rounded-[12px] py-2 px-4 ${index === 0 ? "bg-primary" : "bg-secondary"} ${+word.percentage <= 0 && "text-[#64748b]"}`}
                                    key={index}
                                >
                                    {word.keyword}
                                </div>
                            ))
                        ) : (
                            <div>Loading...</div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
