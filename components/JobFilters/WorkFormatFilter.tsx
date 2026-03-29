import { useFilterStore, WorkFormat } from "@/stores/useFilterStore";
import { Label } from "../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export default function WorkFormatFilter() {
    const { workFormat, setWorkFormat } = useFilterStore();
    return (
        <>
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
                    setWorkFormat(new Set<WorkFormat>([...(e as WorkFormat[])]))
                }
            >
                <ToggleGroupItem
                    className={`rounded-[4px] justify-start uppercase text-[12px] font-bold ${workFormat.has("ON_SITE") && "text-[#60a5fa]"}`}
                    value="ON_SITE"
                >
                    On-Site
                </ToggleGroupItem>
                <ToggleGroupItem
                    className={`rounded-[4px] justify-start uppercase text-[12px] font-bold ${workFormat.has("REMOTE") && "text-[#60a5fa]"}`}
                    value="REMOTE"
                >
                    Remote
                </ToggleGroupItem>
                <ToggleGroupItem
                    className={`rounded-[4px] justify-start uppercase text-[12px] font-bold ${workFormat.has("HYBRID") && "text-[#60a5fa]"}`}
                    value="HYBRID"
                >
                    Hybrid
                </ToggleGroupItem>
            </ToggleGroup>
        </>
    );
}
