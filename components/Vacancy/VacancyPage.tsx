import { headers } from "next/headers";
import BackButton from "@/components/BackButton";
import { getPublishedAt } from "@/utils/date";
import { IDetailedEmployer, IDetailedVacancy } from "@/types/api.types";
import { getAIVacancyMetrics } from "@/utils/ai";

import VacancyMeta from "./VacancyMeta";
import VacancySectionTitle from "./VacancySectionTitle";
import VacancySkillsGrid from "./VacancySkillsGrid";
import VacancyAiAnalysis from "./VacancyAiAnalysis";
import VacancyEmployerCard from "./VacancyEmployerCard";

interface IProps {
    params: Promise<{ id: string }>;
}

export default async function VacancyPage({ params }: IProps) {
    const { id } = await params;
    const h = await headers();
    const host = h.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    if (!host) throw new Error("Missing host header");

    const vacancyResp = await fetch(
        `${protocol}://${host}/api/hh/vacancy/${id}`,
        {
            cache: "no-store",
        },
    );

    if (!vacancyResp.ok) {
        throw new Error("Failed to load vacancy");
    }

    const vacancy = (await vacancyResp.json()) as IDetailedVacancy;
    if (!vacancy) return <div>Не удалось найти вакансию</div>;

    const employerResp = await fetch(
        `${protocol}://${host}/api/hh/employer/${vacancy.employer.id}`,
        { cache: "no-store" },
    );

    const employer = (await employerResp.json()) as IDetailedEmployer;
    const aiAnalysis = await getAIVacancyMetrics(vacancy);

    return (
        <div className="flex max-md:flex-col w-full h-full items-start gap-4 justify-between my-8 container mx-auto">
            <BackButton />

            <div className="w-full md:w-2/3">
                <h1 className="font-black text-2xl leading-normal tracking-tighter mb-4">
                    {vacancy.name}
                </h1>

                <VacancyMeta
                    vacancy={vacancy}
                    publishedAt={getPublishedAt(vacancy.created_at)}
                />

                <VacancySectionTitle title="Role Description" />
                <div
                    className="text-[16px] mt-6"
                    style={{ lineHeight: "163%" }}
                >
                    <div
                        dangerouslySetInnerHTML={{
                            __html: vacancy.description ?? "",
                        }}
                    />
                </div>

                <VacancySectionTitle title="Strategic Requirements" />
                <VacancySkillsGrid skills={vacancy.key_skills ?? []} />

                <VacancySectionTitle title="AI Analysis" />
                <VacancyAiAnalysis aiAnalysis={aiAnalysis} />
            </div>

            <VacancyEmployerCard employer={employer} />
        </div>
    );
}
