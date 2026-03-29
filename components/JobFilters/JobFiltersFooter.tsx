import { Button } from "../ui/button";
import { SheetFooter, SheetClose } from "../ui/sheet";

export default function JobFiltersFooter() {
    return (
        <SheetFooter>
            <SheetClose asChild>
                <Button variant="outline">Close</Button>
            </SheetClose>
        </SheetFooter>
    );
}
