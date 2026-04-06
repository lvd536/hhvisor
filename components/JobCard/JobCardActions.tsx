import { useSavedStore } from "@/stores/useSavedStore";
import { IVacancy } from "@/types/api.types";
import { Sparkles } from "lucide-react";

interface IProps {
    vacancy: IVacancy;
}

export default function JobCardActions({ vacancy }: IProps) {
    const { savedVacancies, setSavedVacancies } = useSavedStore();
    const isSaved = savedVacancies.some((v) => v.id === vacancy.id);
    return (
        <div className="flex flex-col items-start justify-center gap-3">
            <a
                href={`/vacancy/${vacancy.id}`}
                className="flex items-center justify-center gap-1 text-center font-bold rounded-sm w-16 md:w-32 py-3 bg-primary"
            >
                <Sparkles className="w-4 h-4" />
                <p>Analyze</p>
            </a>
            <button
                className="rounded-sm w-16 md:w-32 py-3 bg-secondary font-bold"
                onClick={() => {
                    if (isSaved) {
                        setSavedVacancies(
                            savedVacancies.filter((v) => v.id !== vacancy.id),
                        );
                    } else {
                        setSavedVacancies([...savedVacancies, vacancy]);
                    }
                }}
            >
                {isSaved ? "Delete" : "Save"}
            </button>
        </div>
    );
}
