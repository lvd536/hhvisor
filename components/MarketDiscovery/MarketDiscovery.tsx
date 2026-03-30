"use client";

import JobFilters from "@/components/JobFilters/JobFilters";
import { VACANCIES_PER_PAGE } from "@/consts/api";
import { useMarketDiscovery } from "@/hooks/useMarketDiscovery";
import MarketDiscoveryHeader from "./MarketDiscoveryHeader";
import MarketDiscoveryPagination from "./MarketDiscoveryPagination";
import MarketDiscoverySearchBar from "./MarketDiscoverySearchBar";
import MarketDiscoveryVacanciesList from "./MarketDiscoveryVacanciesList";

export default function MarketDiscovery() {
    const {
        hasMorePages,
        page,
        pages,
        vacancies,
        query,
        setQuery,
        setCurrentArea,
        areas,
        currentArea,
    } = useMarketDiscovery();

    return (
        <div className="w-full h-full flex flex-col">
            <MarketDiscoveryHeader />

            <div className="flex items-center border border-secondary bg-card p-2 rounded-[8px] gap-2 mt-6 mb-10">
                <MarketDiscoverySearchBar
                    query={query}
                    setQuery={setQuery}
                    areas={areas}
                    currentArea={currentArea || 0}
                    setCurrentArea={setCurrentArea}
                />
                <JobFilters />
            </div>

            <MarketDiscoveryVacanciesList
                vacancies={vacancies}
                hasMorePages={hasMorePages}
            />

            <MarketDiscoveryPagination
                page={page}
                pages={pages}
                pageSize={VACANCIES_PER_PAGE}
            />
        </div>
    );
}
