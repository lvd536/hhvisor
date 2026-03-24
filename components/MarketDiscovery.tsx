"use client";
import { useJobStore } from "@/stores/useJobStore";
import { PaginationWithLinks } from "./ui/pagination-with-links";
import { VACANCIES_PER_PAGE } from "@/consts/api";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Briefcase, InfoIcon, MapPin, User } from "lucide-react";
import JobCard from "./JobCard";
import JobFilters from "./JobFilters";
import { useFilterStore } from "@/stores/useFilterStore";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAreaStore } from "@/stores/useAreaStore";

export default function MarketDiscovery() {
    const {
        hasMorePages,
        page,
        pages,
        fetchVacancies,
        vacancies,
        query,
        setQuery,
        setPage,
    } = useJobStore();
    const filters = useFilterStore();
    const { areas, currentArea, setCurrentArea } = useAreaStore();
    const params = useSearchParams();

    useEffect(() => {
        const clear = setTimeout(async () => {
            const page = params.get("page") ?? 0;
            setPage(+page);
            await fetchVacancies(currentArea, filters);
        }, 300);
        return () => clearTimeout(clear);
    }, [
        params,
        hasMorePages,
        query,
        setPage,
        fetchVacancies,
        filters,
        currentArea,
    ]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full flex flex-col">
                <h1
                    className="font-bold text-5xl mb-0 my-8"
                    style={{ letterSpacing: "-0.05em" }}
                >
                    Market Discovery
                </h1>
                <h2
                    className="font-medium text-md text-muted-foreground"
                    style={{ lineHeight: "156%" }}
                >
                    Real-time labor market instrumentation and competitive
                    position mapping.
                </h2>
            </div>
            <div className="flex items-center border border-secondary bg-card p-2 rounded-[8px] gap-2 mt-6 mb-10">
                <InputGroup className="rounded-[4px] py-4 h-12 bg-secondary">
                    <InputGroupAddon align="inline-start">
                        <Briefcase />
                    </InputGroupAddon>
                    <InputGroupInput
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Role (e.g. Senior Data Scientist)"
                        className="placeholder:text-md"
                    />
                </InputGroup>
                <Select onValueChange={(e) => setCurrentArea(+e)}>
                    <SelectTrigger className="w-1/5 rounded-[4px] py-4 min-h-12 bg-secondary">
                        <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="null">None</SelectItem>
                        {areas.map((area) => (
                            <SelectGroup key={area.id}>
                                <SelectLabel>{area.name}</SelectLabel>
                                <SelectItem value={area.id}>
                                    {area.name}
                                </SelectItem>
                                {area.areas.map((secondArea) => (
                                    <SelectItem
                                        value={secondArea.id}
                                        key={secondArea.id}
                                    >
                                        {secondArea.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        ))}
                    </SelectContent>
                </Select>
                <JobFilters />
            </div>
            <div className="flex flex-col items-start gap-2">
                {vacancies &&
                    vacancies.length > 0 &&
                    vacancies.map((vacancy) => (
                        <JobCard vacancy={vacancy} key={vacancy.id} />
                    ))}
                {!hasMorePages && (
                    <p className="text-secondary text-center">
                        Вакансий больше нет
                    </p>
                )}
            </div>
            <PaginationWithLinks
                page={page}
                pageSize={VACANCIES_PER_PAGE}
                totalCount={(pages - 1) * VACANCIES_PER_PAGE}
            />
        </div>
    );
}
