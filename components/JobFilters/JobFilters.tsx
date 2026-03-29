"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import JobFiltersHeader from "./JobFiltersHeader";
import SalaryFilter from "./SalaryFilter";
import ExperienceFilter from "./ExperienceFilter";
import WorkFormatFilter from "./WorkFormatFilter";
import JobFiltersFooter from "./JobFiltersFooter";

export default function JobFilters() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Filter className="shrink-0 w-8 h-8 bg-secondary p-1.5 rounded-[4px]" />
            </SheetTrigger>
            <SheetContent>
                <JobFiltersHeader />
                <div className="flex flex-col flex-1 items-start gap-6 px-4">
                    <SalaryFilter />
                    <ExperienceFilter />
                    <WorkFormatFilter />
                </div>
                <JobFiltersFooter />
            </SheetContent>
        </Sheet>
    );
}
