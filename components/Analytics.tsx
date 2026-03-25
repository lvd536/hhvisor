import { Command, Table2 } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import { useEffect, useState } from "react";
import SalaryTrendsChart from "./SalaryTrendsChart";
import { useJobStore } from "@/stores/useJobStore";
import { useFilterStore } from "@/stores/useFilterStore";
import { useAreaStore } from "@/stores/useAreaStore";

const Analytics = () => {
    const [salaryTrendsData, setSalaryTrendsData] = useState<Array<{
        name: string;
        salary: number;
    }> | null>(null);
    const [hash, setHash] = useState("");

    const { getSalaryTrends } = useJobStore();
    const filters = useFilterStore();
    const { currentArea } = useAreaStore();

    useEffect(() => {
        setTimeout(() => setHash(window.location.hash.replace("#", "")));

        const handleHashChange = () => {
            setHash(window.location.hash.replace("#", ""));
        };

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    useEffect(() => {
        (async () => {
            const res = await getSalaryTrends(currentArea, filters);
            if (!res) return;
            console.log(res);
            setSalaryTrendsData(res);
        })();
    }, [getSalaryTrends, currentArea, filters]);

    return (
        <div className="flex min-h-dvh w-full">
            <SidebarProvider>
                <Sidebar collapsible="icon">
                    <SidebarContent className="mt-10">
                        <SidebarGroup>
                            <SidebarGroupLabel>Analytics</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="#overview">
                                                <Table2 />
                                                <span>Overview</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="#keyword">
                                                <Command />
                                                <span>Keyword</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
                <div className="flex flex-1 flex-col">
                    <SidebarTrigger className="[&_svg]:size-5! ml-4 sm:ml-5 rounded-sm" />
                    <div className="size-full flex-1 px-4 py-6 sm:px-6">
                        <p className="font-black text-[11px] text-[#60a5fa] leading-normal tracking-wide uppercase">
                            Quarterly Analysis
                        </p>
                        <h1 className="font-black text-5xl leading-none tracking-[-0.03em] my-2">
                            Job Market Intelligence Dashboard.
                        </h1>
                        <p className="text-sm leading-[163%] text-muted-foreground">
                            A high-fidelity analysis of current engineering
                            labor market conditions, utilizing real- time
                            aggregation from top technology sectors.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            <div className="relative flex flex-col gap-2 max-w-75 items-start justify-start border border-secondary bg-card rounded-[8px] p-8">
                                <p className="font-bold text-[11px] leading-normal tracking-widest text-[#64748b]">
                                    Avg Salary
                                </p>
                                <p className="font-black tracking-tighter leading-[111%] text-[36px] text-[#60a5fa]">
                                    $150k
                                </p>
                            </div>
                            <div className="relative flex flex-col gap-2 max-w-75 items-start justify-start border border-secondary bg-card rounded-[8px] p-8">
                                <p className="font-bold text-[11px] leading-normal tracking-widest text-[#64748b]">
                                    Jobs Count
                                </p>
                                <p className="font-black tracking-tighter leading-[111%] text-[36px] text-[#60a5fa]">
                                    4,200
                                </p>
                            </div>
                            <div className="relative flex flex-col gap-2 max-w-75 items-start justify-start border border-secondary bg-card rounded-[8px] p-8">
                                <p className="font-bold text-[11px] leading-normal tracking-widest text-[#64748b]">
                                    Top Skill
                                </p>
                                <p className="font-black tracking-tighter leading-[111%] text-[36px] text-[#60a5fa]">
                                    React
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:flex gap-8 mt-12 items-start justify-between">
                            {salaryTrendsData ? (
                                <div className="w-full border border-secondary rounded-[8px] p-8 bg-card">
                                    <p className="tracking-tight font-bold text-[20px]">
                                        Salary Trends over Time
                                    </p>
                                    <p className="text-[12px] leading-[133%] text-[#64748b] mt-1 mb-10">
                                        Aggregated data across top 50
                                        metropolitan hubs.
                                    </p>
                                    <SalaryTrendsChart
                                        data={salaryTrendsData}
                                    />
                                </div>
                            ) : (
                                "Loading..."
                            )}
                            <div className="rounded-[8px] p-8 bg-card border border-secondary">
                                <p
                                    className="font-bold text-[14px] text-[#64748b] tracking-widest uppercase mb-6"
                                    style={{ lineHeight: "143%" }}
                                >
                                    Top Required Technologies
                                </p>
                                <div className="flex flex-col gap-5">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <p className="font-bold text-[12px] leading-[133%]">
                                                React
                                            </p>
                                            <p className="text-[10px] text-[#60a5fa] leading-normal">
                                                96%
                                            </p>
                                        </div>
                                        <div className="relative w-full h-1 bg-secondary rounded-full mt-2">
                                            <div
                                                className="bg-ring rounded-full h-full"
                                                style={{ width: `96%` }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <p className="font-bold text-[12px] leading-[133%]">
                                                Python
                                            </p>
                                            <p className="text-[10px] text-[#60a5fa] leading-normal">
                                                57%
                                            </p>
                                        </div>
                                        <div className="relative w-full h-1 bg-secondary rounded-full mt-2">
                                            <div
                                                className="bg-ring rounded-full h-full"
                                                style={{ width: `57%` }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <p className="font-bold text-[12px] leading-[133%]">
                                                TypeScript
                                            </p>
                                            <p className="text-[10px] text-[#60a5fa] leading-normal">
                                                86%
                                            </p>
                                        </div>
                                        <div className="relative w-full h-1 bg-secondary rounded-full mt-2">
                                            <div
                                                className="bg-ring rounded-full h-full"
                                                style={{ width: `86%` }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <p className="font-bold text-[12px] leading-[133%]">
                                                Porno
                                            </p>
                                            <p className="text-[10px] text-[#60a5fa] leading-normal">
                                                10%
                                            </p>
                                        </div>
                                        <div className="relative w-full h-1 bg-secondary rounded-full mt-2">
                                            <div
                                                className="bg-ring rounded-full h-full"
                                                style={{ width: `10%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default Analytics;
