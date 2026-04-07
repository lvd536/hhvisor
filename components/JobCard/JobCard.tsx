import { getPublishedAt } from "@/utils/date";
import { IVacancy } from "@/types/api.types";
import JobCardMeta from "./JobCardMeta";
import JobCardActions from "./JobCardActions";

interface IProps {
    vacancy: IVacancy;
}

export default function JobCard({ vacancy }: IProps) {
    return (
        <div className="flex max-md:flex-col justify-between w-full min-h-51 bg-card rounded-[8px] p-8">
            <div className="flex flex-col gap-2">
                <p
                    className="font-semibold text-[12px] text-[#64748b]"
                    style={{ lineHeight: "133%" }}
                >
                    {getPublishedAt(vacancy.created_at)}
                </p>
                <h3 className="font-black text-xl">{vacancy.name}</h3>
                <JobCardMeta vacancy={vacancy} />
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
            <JobCardActions vacancy={vacancy} />
        </div>
    );
}
