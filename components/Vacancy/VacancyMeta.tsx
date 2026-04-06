import { Banknote, Building2, Clock } from "lucide-react";
import { IDetailedVacancy } from "@/types/api.types";

interface Props {
    vacancy: IDetailedVacancy;
    publishedAt: string;
}

export default function VacancyMeta({ vacancy, publishedAt }: Props) {
    return (
        <ul className="flex flex-wrap w-full gap-6">
            <li className="flex gap-2 items-center rounded-[8px] py-2 px-4 bg-card">
                <Building2 color="#60A5FA" />
                <p
                    className="text-[14px] font-medium"
                    style={{ lineHeight: "143%" }}
                >
                    {vacancy.address.city || "None"}
                </p>
            </li>

            <li className="flex gap-2 items-center rounded-[8px] py-2 px-4 bg-card">
                <Banknote color="#60A5FA" />
                {vacancy.salary ? (
                    <div className="flex gap-1 items-center text-[14px] font-medium">
                        {vacancy.salary.currency && (
                            <p>{vacancy.salary.currency}</p>
                        )}
                        {vacancy.salary.from && <p>{vacancy.salary.from}</p>}
                        {vacancy.salary.to && (
                            <>
                                <p>-</p>
                                <p>{vacancy.salary.to}</p>
                            </>
                        )}
                    </div>
                ) : (
                    <p className="font-medium text-muted-foreground">
                        Not specified
                    </p>
                )}
            </li>

            <li className="flex gap-2 items-center rounded-[8px] py-2 px-4 bg-card">
                <Clock color="#60A5FA" />
                <p
                    className="text-[14px] font-medium"
                    style={{ lineHeight: "143%" }}
                >
                    {publishedAt}
                </p>
            </li>
        </ul>
    );
}
