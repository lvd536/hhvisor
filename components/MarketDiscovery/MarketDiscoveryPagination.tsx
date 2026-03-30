import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

type Props = {
    page: number;
    pages: number;
    pageSize: number;
};

export default function MarketDiscoveryPagination({
    page,
    pages,
    pageSize,
}: Props) {
    return (
        <PaginationWithLinks
            page={page}
            pageSize={pageSize}
            totalCount={pages * pageSize}
        />
    );
}
