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
import { KeyWordType, OverviewAnalyticsType } from "@/types/stores.types";
import Overview from "./Overview";

const Analytics = () => {
    const [overviewAnalytics, setOverviewAnalytics] =
        useState<OverviewAnalyticsType | null>(null);
    const [hash, setHash] = useState("");

    const { getOverviewAnalytics } = useJobStore();
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
            const res = await getOverviewAnalytics(currentArea, filters);
            if (!res) return;
            console.log(res);
            setOverviewAnalytics(res);
        })();
    }, [getOverviewAnalytics, currentArea, filters]);

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
                    {hash === "keyword" ? "keyword" : <Overview />}
                </div>
            </SidebarProvider>
        </div>
    );
};

export default Analytics;
