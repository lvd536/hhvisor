"use client";

import { type ReactNode, useCallback } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export interface PaginationWithLinksProps {
    pageSizeSelectOptions?: {
        pageSizeSearchParam?: string;
        pageSizeOptions: number[];
    };
    totalCount: number;
    pageSize: number;
    page: number;
    pageSearchParam?: string;
}

export function PaginationWithLinks({
    pageSizeSelectOptions,
    pageSize,
    totalCount,
    page,
    pageSearchParam,
}: PaginationWithLinksProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const totalPageCount = Math.ceil(totalCount / pageSize);

    const buildLink = useCallback(
        (newPage: number) => {
            const key = pageSearchParam || "page";
            const newSearchParams = new URLSearchParams(
                searchParams?.toString(),
            );
            newSearchParams.set(key, String(newPage));
            return `${pathname}?${newSearchParams.toString()}`;
        },
        [searchParams, pathname, pageSearchParam],
    );

    const goToPage = useCallback(
        (newPage: number) => {
            router.replace(buildLink(newPage), { scroll: false });
        },
        [router, buildLink],
    );

    const renderPageNumbers = () => {
        const items: ReactNode[] = [];
        const maxVisiblePages = 5;

        const addPage = (p: number) => (
            <PaginationItem key={p}>
                <PaginationLink
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        goToPage(p);
                    }}
                    isActive={page === p}
                >
                    {p}
                </PaginationLink>
            </PaginationItem>
        );

        if (totalPageCount <= maxVisiblePages) {
            for (let i = 1; i <= totalPageCount; i++) {
                items.push(addPage(i));
            }
        } else {
            items.push(addPage(1));

            if (page > 3) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>,
                );
            }

            const start = Math.max(2, page - 1);
            const end = Math.min(totalPageCount - 1, page + 1);

            for (let i = start; i <= end; i++) {
                items.push(addPage(i));
            }

            if (page < totalPageCount - 2) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>,
                );
            }

            items.push(addPage(totalPageCount));
        }

        return items;
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-3 w-full">
            <Pagination
                className={cn({ "md:justify-end": pageSizeSelectOptions })}
            >
                <PaginationContent className="max-sm:gap-0">
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (page > 1) goToPage(page - 1);
                            }}
                            aria-disabled={page === 1}
                            tabIndex={page === 1 ? -1 : undefined}
                            className={
                                page === 1
                                    ? "pointer-events-none opacity-50"
                                    : undefined
                            }
                        />
                    </PaginationItem>

                    {renderPageNumbers()}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (page < totalPageCount) goToPage(page + 1);
                            }}
                            aria-disabled={page === totalPageCount}
                            tabIndex={page === totalPageCount ? -1 : undefined}
                            className={
                                page === totalPageCount
                                    ? "pointer-events-none opacity-50"
                                    : undefined
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
