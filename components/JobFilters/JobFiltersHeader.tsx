import { SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";

export default function JobFiltersHeader() {
    return (
        <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
                Filter the vacancies as you wish
            </SheetDescription>
        </SheetHeader>
    );
}
