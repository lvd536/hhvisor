"use clients";
import { Briefcase } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "../ui/input-group";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Area = {
    id: string | number;
    name: string;
    areas: {
        id: string | number;
        name: string;
    }[];
};

type Props = {
    query: string;
    setQuery: (value: string) => void;
    areas: Area[];
    currentArea: number;
    setCurrentArea: (value: number) => void;
};

export default function MarketDiscoverySearchBar({
    query,
    setQuery,
    areas,
    currentArea,
    setCurrentArea,
}: Props) {
    return (
        <>
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

            <Select
                value={currentArea ? String(currentArea) : "all"}
                onValueChange={(value) => {
                    if (value === "all") return setCurrentArea(0);
                    setCurrentArea(Number(value));
                }}
            >
                <SelectTrigger className="w-1/5 rounded-[4px] py-4 min-h-12 bg-secondary">
                    <SelectValue placeholder="Select area" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">None</SelectItem>

                    {areas &&
                        areas.length > 0 &&
                        areas.map((area) => (
                            <SelectGroup key={area.id}>
                                <SelectLabel>{area.name}</SelectLabel>
                                <SelectItem value={String(area.id)}>
                                    {area.name}
                                </SelectItem>

                                {area.areas.map((secondArea) => (
                                    <SelectItem
                                        value={String(secondArea.id)}
                                        key={secondArea.id}
                                    >
                                        {secondArea.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        ))}
                </SelectContent>
            </Select>
        </>
    );
}
