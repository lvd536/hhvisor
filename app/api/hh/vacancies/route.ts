import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const text = searchParams.get("text") || "";
    const salary = searchParams.get("salary");
    const area = searchParams.get("area") || "1";
    const page = searchParams.get("page") || "0";

    const hhUrl = new URL("https://api.hh.ru/vacancies");
    hhUrl.searchParams.append("text", text);
    hhUrl.searchParams.append("area", area);
    hhUrl.searchParams.append("page", page);
    hhUrl.searchParams.append("per_page", "20");
    hhUrl.searchParams.append("clusters", "true");

    if (salary) {
        hhUrl.searchParams.append("salary", salary);
        hhUrl.searchParams.append("only_with_salary", "true");
    }

    try {
        const response = await fetch(hhUrl.toString(), {
            headers: {
                "User-Agent": "HHVisorDev/1.0 (nbikiti@bk.com)",
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch from HH" },
                { status: response.status },
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
