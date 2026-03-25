import { VACANCIES_PER_PAGE } from "@/consts/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const text = searchParams.get("text") || "";
    const per_page = searchParams.get("per_page");
    const salary = searchParams.get("salary");
    const area = searchParams.get("area");
    const page = searchParams.get("page") || "0";
    const experiences = searchParams.getAll("experience");
    const work_format = searchParams.getAll("work_format");
    const date_from = searchParams.get("date_from") || "";
    const date_to = searchParams.get("date_to") || "";

    const hhUrl = new URL("https://api.hh.ru/vacancies");
    hhUrl.searchParams.append("text", text);
    hhUrl.searchParams.append("page", page);
    hhUrl.searchParams.append(
        "per_page",
        per_page ?? VACANCIES_PER_PAGE.toString(),
    );
    hhUrl.searchParams.append("clusters", "true");

    experiences.forEach((exp) => hhUrl.searchParams.append("experience", exp));

    work_format.forEach((sch) => hhUrl.searchParams.append("work_format", sch));

    if (area) hhUrl.searchParams.append("area", area);

    if (salary && +salary !== 0) {
        hhUrl.searchParams.append("salary", salary);
        hhUrl.searchParams.append("only_with_salary", "true");
    }

    if (date_from) hhUrl.searchParams.append("date_from", date_from);
    if (date_to) hhUrl.searchParams.append("date_to", date_to);

    try {
        const response = await fetch(hhUrl.toString(), {
            headers: { "User-Agent": "HHVisorDev/1.0 (nbikiti@bk.com)" },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("HH API Error:", errorText);

            return NextResponse.json(
                { error: "HH API Error", details: errorText },
                { status: response.status },
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
