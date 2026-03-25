import { getPublishedAt } from "@/utils/date";
import { IDetailedEmployer, IDetailedVacancy } from "@/types/api.types";
import { CheckCircle, Banknote, Building2, Clock } from "lucide-react";
import { headers } from "next/headers";
import SafeHTML from "@/components/SafeHTML";
import Image from "next/image";
import BackButton from "@/components/BackButton";

interface IProps {
    params: Promise<{ id: string }>;
}

export default async function VacancyPage({ params }: IProps) {
    const { id } = await params;
    const h = await headers();
    const host = h.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    if (!host) {
        throw new Error("Missing host header");
    }

    const resp = await fetch(`${protocol}://${host}/api/hh/vacancy/${id}`, {
        cache: "no-store",
    });

    if (!resp.ok) {
        throw new Error("Failed to load vacancy");
    }

    const vacancy = (await resp.json()) as IDetailedVacancy;
    if (!vacancy) return <div>Не удалось найти вакансию</div>;

    const res = await fetch(
        `${protocol}://${host}/api/hh/employer/${vacancy.employer.id}`,
        {
            cache: "no-store",
        },
    );

    const employer = (await res.json()) as IDetailedEmployer;

    return (
        <div className="flex w-full h-full items-start gap-4 justify-between my-8 container mx-auto">
            <BackButton />
            <div className="w-2/3">
                <h1 className="font-black text-2xl leading-normal tracking-tighter mb-4">
                    {vacancy.name}
                </h1>
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
                                {vacancy.salary.from && (
                                    <p>{vacancy.salary.from}</p>
                                )}
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
                            {getPublishedAt(vacancy.created_at)}
                        </p>
                    </li>
                </ul>
                <div className="flex items-center gap-3 mt-12">
                    <div className="w-8 h-1 rounded-full bg-ring" />
                    <div
                        className="font-bold text-[20px] tracking-tight"
                        style={{ lineHeight: "140%" }}
                    >
                        Role Description
                    </div>
                </div>
                <div
                    className="text-[16px] mt-6"
                    style={{ lineHeight: "163%" }}
                >
                    <SafeHTML html={vacancy.description ?? ""} />
                </div>
                <div className="flex items-center gap-3 mt-12">
                    <div className="w-8 h-1 rounded-full bg-ring" />
                    <p
                        className="font-bold text-[20px] tracking-tight"
                        style={{ lineHeight: "140%" }}
                    >
                        Strategic Requirements
                    </p>
                </div>
                <div className="grid grid-cols-2 w-full mt-6 gap-4">
                    {vacancy.key_skills &&
                        vacancy.key_skills.map((skill, index) => (
                            <div
                                className="flex items-start justify-start gap-5 text-wrap rounded-[8px] p-4"
                                style={{
                                    border: "1px solid rgba(255, 255, 255, 0.05)",
                                }}
                                key={`skill-${index}`}
                            >
                                <CheckCircle color="#60A5FA" />
                                <p
                                    className="font-medium text-[14px]"
                                    style={{ lineHeight: "143%" }}
                                >
                                    {skill.name}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
            <div
                className="w-1/3 rounded-[8px] p-8 bg-card"
                style={{
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
            >
                <div className="flex flex-col w-full gap-4 font-bold text-[16px] text-center leading-normal pb-3">
                    <a
                        href={vacancy.alternate_url}
                        className="flex justify-center items-center bg-primary vacancy-credits-shadow rounded-[8px] h-14 text-center"
                    >
                        Apply for position
                    </a>
                    <button className="h-14 rounded-[8px] bg-secondary">
                        Save to Analytics
                    </button>
                </div>
                <div
                    className="flex flex-col gap-4 pt-3"
                    style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
                >
                    <div className="flex items-center justify-start gap-4">
                        {employer.logo_urls ? (
                            <Image
                                src={
                                    employer.logo_urls.original ||
                                    employer.logo_urls[90] ||
                                    employer.logo_urls[240] ||
                                    ""
                                }
                                width={48}
                                height={48}
                                alt="Employer logo"
                                unoptimized
                            />
                        ) : (
                            <p className="w-12 h-12 rounded-[4px] bg-primary flex items-center justify-center">
                                I
                            </p>
                        )}

                        <div>
                            <p className="font-bold text-[16px] leading-normal">
                                {employer.name}
                            </p>
                            <div
                                className="flex gap-2 font-medium text-[12px] tracking-widest uppercase text-muted-foreground"
                                style={{ lineHeight: "133%" }}
                            >
                                <p
                                    className={`${employer.trusted ? "text-green-500" : "text-red-500"}`}
                                >
                                    {employer.trusted ? "Trusted" : "Untrusted"}
                                </p>
                                <span>•</span>
                                <p>{employer.open_vacancies} vacancies</p>
                            </div>
                        </div>
                    </div>
                    {employer.industries[0] && (
                        <div className="flex items-center justify-between gap-2">
                            <p
                                className="text-[14px] text-muted-foreground"
                                style={{ lineHeight: "143%" }}
                            >
                                Industry
                            </p>
                            <p
                                className="font-bold text-[14px] truncate"
                                style={{ lineHeight: "143%" }}
                            >
                                {employer.industries[0].name}
                            </p>
                        </div>
                    )}
                    {employer.site_url && (
                        <div className="flex items-center justify-between">
                            <p
                                className="text-[14px] text-muted-foreground"
                                style={{ lineHeight: "143%" }}
                            >
                                Website
                            </p>
                            <a
                                className="text-[#60a5fa] underline"
                                style={{ lineHeight: "143%" }}
                                href={employer.site_url}
                            >
                                {employer.site_url}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
