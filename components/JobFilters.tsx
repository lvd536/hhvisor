"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
    Experience,
    useFilterStore,
    WorkFormat,
} from "@/stores/useFilterStore";
import { Slider } from "@/components/ui/slider";

export default function JobFilters() {
    const {
        experience,
        salary,
        workFormat,
        setExperience,
        setSalary,
        setWorkFormat,
    } = useFilterStore();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Filter className="shrink-0 w-8 h-8 bg-secondary p-1.5 rounded-[4px]" />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                        Filter the vacancies as you wish
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col flex-1 items-start gap-6 px-4">
                    <Label className="mb-4 font-black uppercase text-[12px] leading-normal tracking-widest text-[#64748b]">
                        Salary Range (Annual)
                    </Label>
                    <Slider
                        value={salary}
                        onValueChange={(e) => setSalary(e as [number, number])}
                        max={2000000}
                        step={1000}
                        className="mx-auto w-full max-w-xs"
                    />
                    <div className="flex w-full px-4 items-center justify-between font-bold text-xs">
                        <p>0₽</p>
                        <p>2M₽</p>
                    </div>
                    <ToggleGroup
                        type="multiple"
                        orientation="vertical"
                        spacing={1}
                        value={Array.from(experience)}
                        onValueChange={(e) =>
                            setExperience(
                                new Set<Experience>([...(e as Experience[])]),
                            )
                        }
                    >
                        <Label className="mb-4 font-black uppercase text-[12px] leading-normal tracking-widest text-[#64748b]">
                            Experience Level
                        </Label>
                        <ToggleGroupItem
                            className={`rounded-[4px] font-medium justify-start ${!experience.has("noExperience") && "text-muted-foreground"}`}
                            value="noExperience"
                        >
                            Entry Level
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            className={`rounded-[4px] font-medium justify-start ${!experience.has("between1And3") && "text-muted-foreground"}`}
                            value="between1And3"
                        >
                            Mid-Level (3-5y)
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            className={`rounded-[4px] font-medium justify-start ${!experience.has("between3And6") && "text-muted-foreground"}`}
                            value="between3And6"
                        >
                            Senior (6y+)
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            className={`rounded-[4px] font-medium justify-start ${!experience.has("moreThan6") && "text-muted-foreground"}`}
                            value="moreThan6"
                        >
                            Leadership
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Label className="font-black uppercase text-[12px] leading-normal tracking-widest text-[#64748b]">
                        Operational Model
                    </Label>
                    <ToggleGroup
                        className="rounded-[4px] p-1 bg-card"
                        type="multiple"
                        orientation="horizontal"
                        spacing={1}
                        value={Array.from(workFormat)}
                        onValueChange={(e) =>
                            setWorkFormat(
                                new Set<WorkFormat>([...(e as WorkFormat[])]),
                            )
                        }
                    >
                        <ToggleGroupItem
                            className={`rounded-[4px] font-medium justify-start uppercase text-[12px] font-bold ${workFormat.has("ON_SITE") && "text-[#60a5fa]"}`}
                            value="ON_SITE"
                        >
                            On-Site
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            className={`rounded-[4px] font-medium justify-start uppercase text-[12px] font-bold ${workFormat.has("REMOTE") && "text-[#60a5fa]"}`}
                            value="REMOTE"
                        >
                            Remote
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            className={`rounded-[4px] font-medium justify-start uppercase text-[12px] font-bold ${workFormat.has("HYBRID") && "text-[#60a5fa]"}`}
                            value="HYBRID"
                        >
                            Hybrid
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
