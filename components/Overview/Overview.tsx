import { useAreaStore } from "@/stores/useAreaStore";
import { useFilterStore } from "@/stores/useFilterStore";
import { useJobStore } from "@/stores/useJobStore";
import { OverviewAnalyticsType } from "@/types/stores.types";
import { useEffect, useState } from "react";
import SalaryTrendsChart from "../Charts/SalaryTrendsChart";
import { useShallow } from "zustand/react/shallow";

export default function Overview() {
    const [overviewAnalytics, setOverviewAnalytics] =
        useState<OverviewAnalyticsType | null>(null);

    const getOverviewAnalytics = useJobStore((s) => s.getOverviewAnalytics);

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
            const res = await getOverviewAnalytics(currentArea, filters);
            if (cancelled || !res) return;
            setOverviewAnalytics(res);
        })();
        return () => {
            cancelled = true;
        };
    }, [getOverviewAnalytics, currentArea, filters]);

    return (
        <div className="size-full flex-1 px-4 py-6 sm:px-6">
            <p className="font-black text-[11px] text-[#60a5fa] leading-normal tracking-wide uppercase">
                Quarterly Analysis
            </p>
            <h1 className="font-black text-5xl leading-none tracking-[-0.03em] my-2">
                Job Market Intelligence Dashboard.
            </h1>
            <p className="text-sm leading-[163%] text-muted-foreground">
                A high-fidelity analysis of current engineering labor market
                conditions, utilizing real- time aggregation from top technology
                sectors.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="relative flex flex-col gap-2 max-w-75 items-start justify-start border border-secondary bg-card rounded-[8px] p-8">
                    <p className="font-bold text-[11px] leading-normal tracking-widest text-[#64748b]">
                        Avg Salary
                    </p>
                    <p className="font-black tracking-tighter leading-[111%] text-[36px] text-[#60a5fa]">
                        {overviewAnalytics?.avgSalary
                            ? Math.round(overviewAnalytics.avgSalary)
                            : "Loading..."}
                    </p>
                </div>
                <div className="relative flex flex-col gap-2 max-w-75 items-start justify-start border border-secondary bg-card rounded-[8px] p-8">
                    <p className="font-bold text-[11px] leading-normal tracking-widest text-[#64748b]">
                        Jobs Count
                    </p>
                    <p className="font-black tracking-tighter leading-[111%] text-[36px] text-[#60a5fa]">
                        {overviewAnalytics?.jobsCount || "Loading..."}
                    </p>
                </div>
                <div className="relative flex flex-col gap-2 max-w-75 items-start justify-start border border-secondary bg-card rounded-[8px] p-8">
                    <p className="font-bold text-[11px] leading-normal tracking-widest text-[#64748b]">
                        Top Skill
                    </p>
                    <p className="font-black tracking-tighter leading-[111%] text-[36px] text-[#60a5fa]">
                        {overviewAnalytics?.topWord.keyword || "Loading..."}
                    </p>
                </div>
            </div>
            <div className="w-full md:flex gap-8 mt-12 items-start justify-between">
                <div className="w-full border border-secondary rounded-[8px] p-8 bg-card">
                    <p className="tracking-tight font-bold text-[20px]">
                        Salary Trends over Time
                    </p>
                    <p className="text-[12px] leading-[133%] text-[#64748b] mt-1 mb-10">
                        Aggregated data across top 50 metropolitan hubs.
                    </p>
                    {overviewAnalytics && overviewAnalytics.salaryTrends ? (
                        <SalaryTrendsChart
                            data={overviewAnalytics.salaryTrends}
                        />
                    ) : (
                        "Loading..."
                    )}
                </div>
                <div className="rounded-[8px] p-8 bg-card border border-secondary">
                    <p
                        className="font-bold text-[14px] text-[#64748b] tracking-widest uppercase mb-6"
                        style={{ lineHeight: "143%" }}
                    >
                        Top Required Technologies
                    </p>
                    <div className="flex flex-col gap-5">
                        {overviewAnalytics && overviewAnalytics.topWords
                            ? overviewAnalytics.topWords.map((word, index) => (
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
            </div>
        </div>
    );
}
