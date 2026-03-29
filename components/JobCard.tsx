import { getPublishedAt } from "@/utils/date";
import { IVacancy } from "@/types/api.types";
import { Banknote, Building2, Clock } from "lucide-react";
import { useSavedStore } from "@/stores/useSavedStore";

interface IProps {
    vacancy: IVacancy;
}

export default function JobCard({ vacancy }: IProps) {
    const { savedVacancies, setSavedVacancies } = useSavedStore();
    const isSaved = savedVacancies.some((v) => v.id === vacancy.id);
    return (
        <div className="flex justify-between w-full min-h-51 bg-card rounded-[8px] p-8">
            <div className="flex flex-col gap-2">
                <p
                    className="font-semibold text-[12px] text-[#64748b]"
                    style={{ lineHeight: "133%" }}
                >
                    {getPublishedAt(vacancy.created_at)}
                </p>
                <h3 className="font-black text-xl">{vacancy.name}</h3>
                <div className="flex flex-wrap gap-2">
                    <div className="flex gap-1 items-center">
                        <Building2
                            width={19}
                            height={18}
                            className="stroke-muted-foreground"
                        />
                        <p
                            className="font-medium text-muted-foreground"
                            style={{ lineHeight: "143%" }}
                        >
                            {vacancy.employer.name}
                        </p>
                    </div>
                    {vacancy.work_format && (
                        <div className="flex flex-wrap gap-1 items-center ml-4.5">
                            <Clock
                                width={19}
                                height={18}
                                className="stroke-muted-foreground"
                            />
                            {vacancy.work_format.map((format) => (
                                <p
                                    key={`vacancy-${vacancy.id}-${format.id}`}
                                    className="font-medium text-muted-foreground"
                                    style={{ lineHeight: "143%" }}
                                >
                                    {format.name}
                                </p>
                            ))}
                        </div>
                    )}
                    {vacancy.salary ? (
                        <div className="flex gap-1 items-center font-bold ml-4">
                            <Banknote width={19} height={18} />
                            {vacancy.salary.currency && (
                                <p>{vacancy.salary.currency}</p>
                            )}
                            {vacancy.salary.from && (
                                <>
                                    <p>{vacancy.salary.from}</p>
                                    <p>-</p>
                                </>
                            )}
                            {vacancy.salary.to && <p>{vacancy.salary.to}</p>}
                        </div>
                    ) : (
                        <p className="font-medium text-muted-foreground">
                            Not specified
                        </p>
                    )}
                </div>
                <div className="flex gap-2 items-center justify-start mt-[24.5px]">
                    {vacancy.professional_roles.map((role) => (
                        <p
                            className="px-3 py-1.5 rounded-full font-bold text-bold text-[12px] bg-secondary"
                            style={{ lineHeight: "133%" }}
                            key={`vacancy-${vacancy.id}-role-${role.id}`}
                        >
                            {role.name}
                        </p>
                    ))}
                </div>
            </div>
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
                                savedVacancies.filter(
                                    (v) => v.id !== vacancy.id,
                                ),
                            );
                        } else {
                            setSavedVacancies([...savedVacancies, vacancy]);
                        }
                    }}
                >
                    {isSaved ? "Delete" : "Save"}
                </button>
            </div>
        </div>
    );
}
