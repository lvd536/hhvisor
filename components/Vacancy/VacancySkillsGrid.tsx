import { CheckCircle } from "lucide-react";

interface Skill {
    name: string;
}

interface Props {
    skills: Skill[];
}

export default function VacancySkillsGrid({ skills }: Props) {
    if (!skills.length) {
        return (
            <p className="mt-6 text-muted-foreground">No skills specified</p>
        );
    }

    return (
        <div className="grid grid-cols-2 w-full mt-6 gap-4">
            {skills.map((skill, index) => (
                <div
                    key={`skill-${index}`}
                    className="flex items-start justify-start gap-5 text-wrap rounded-[8px] p-4"
                    style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
                >
                    <CheckCircle color="#60A5FA" className="shrink-0" />
                    <p
                        className="font-medium text-[14px]"
                        style={{ lineHeight: "143%" }}
                    >
                        {skill.name}
                    </p>
                </div>
            ))}
        </div>
    );
}
