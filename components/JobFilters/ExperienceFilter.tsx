import { Experience, useFilterStore } from "@/stores/useFilterStore";
import { ToggleGroupItem, ToggleGroup } from "../ui/toggle-group";
import { Label } from "../ui/label";

export default function ExperienceFilter() {
    const { experience, setExperience } = useFilterStore();
    return (
        <ToggleGroup
            type="multiple"
            orientation="vertical"
            spacing={1}
            value={Array.from(experience)}
            onValueChange={(e) =>
                setExperience(new Set<Experience>([...(e as Experience[])]))
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
    );
}
