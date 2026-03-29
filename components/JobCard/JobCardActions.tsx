import { useSavedStore } from "@/stores/useSavedStore";
import { IVacancy } from "@/types/api.types";

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
                className="text-center rounded-sm w-16 md:w-32 py-3 bg-primary"
            >
                Analyze
            </a>
            <button
                className="rounded-sm w-16 md:w-32 py-3 bg-secondary"
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
