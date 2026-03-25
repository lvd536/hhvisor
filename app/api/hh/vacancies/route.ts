import { VACANCIES_PER_PAGE } from "@/consts/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const text = searchParams.get("text") || "";
    const salary = searchParams.get("salary");
    const area = searchParams.get("area") || "1";
    const page = searchParams.get("page") || "0";
    const experiences = searchParams.getAll("experience");
    const work_format = searchParams.getAll("work_format");

    const hhUrl = new URL("https://api.hh.ru/vacancies");
    hhUrl.searchParams.append("text", text);
    hhUrl.searchParams.append("area", area);
    hhUrl.searchParams.append("page", page);
    hhUrl.searchParams.append("per_page", VACANCIES_PER_PAGE.toString());
    hhUrl.searchParams.append("clusters", "true");

    experiences.forEach((exp) => hhUrl.searchParams.append("experience", exp));

    work_format.forEach((sch) => hhUrl.searchParams.append("work_format", sch));

    if (salary && salary !== "0") {
        hhUrl.searchParams.append("salary", salary);
        hhUrl.searchParams.append("only_with_salary", "true");
    }

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
