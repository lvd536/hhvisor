import JobCard from "@/components/JobCard/JobCard";
import { IVacancy } from "@/types/api.types";

type Props = {
    vacancies: IVacancy[];
    hasMorePages: boolean;
};

export default function MarketDiscoveryVacanciesList({
    vacancies,
    hasMorePages,
}: Props) {
    return (
        <div className="flex flex-col items-start gap-2">
            {vacancies?.length > 0 ? (
                vacancies.map((vacancy) => (
                    <JobCard vacancy={vacancy} key={vacancy.id} />
                ))
            ) : (
                <p className="text-secondary">Ничего не найдено</p>
            )}

            {!hasMorePages && vacancies?.length > 0 && (
                <p className="text-secondary text-center">
                    Вакансий больше нет
                </p>
            )}
        </div>
    );
}
