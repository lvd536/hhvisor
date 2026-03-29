import { IVacancy } from "@/types/api.types";
import { Banknote, Building2, Clock } from "lucide-react";

interface IProps {
    vacancy: IVacancy;
}

export default function JobCardMeta({ vacancy }: IProps) {
    return (
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
    );
}
