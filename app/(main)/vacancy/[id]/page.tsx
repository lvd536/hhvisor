import VacancyPage from "@/components/Vacancy/VacancyPage";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function page({ params }: Props) {
    return <VacancyPage params={params} />;
}
