import Image from "next/image";
import { IDetailedEmployer } from "@/types/api.types";

interface Props {
    employer: IDetailedEmployer;
}

export default function VacancyEmployerCard({ employer }: Props) {
    return (
        <div
            className="w-full md:w-1/3 rounded-[8px] p-8 bg-card"
            style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
        >
            <div className="flex flex-col w-full gap-4 font-bold text-[16px] text-center leading-normal pb-3">
                <a
                    href={employer.site_url ?? "#"}
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
                            className="shrink-0"
                            unoptimized
                        />
                    ) : (
                        <p className="shrink-0 w-12 h-12 rounded-[4px] bg-primary flex items-center justify-center">
                            I
                        </p>
                    )}

                    <div>
                        <p className="font-bold text-[16px] leading-normal">
                            {employer.name}
                        </p>
                        <div
                            className="flex gap-2 font-medium text-[11px] tracking-widest uppercase text-muted-foreground text-wrap"
                            style={{ lineHeight: "133%" }}
                        >
                            <p
                                className={
                                    employer.trusted
                                        ? "text-green-500"
                                        : "text-red-500"
                                }
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
    );
}
