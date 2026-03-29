import { useFilterStore } from "@/stores/useFilterStore";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

export default function SalaryFilter() {
    const { salary, setSalary } = useFilterStore();
    return (
        <>
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
        </>
    );
}
