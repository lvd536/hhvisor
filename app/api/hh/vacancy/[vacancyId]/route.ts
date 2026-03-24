import { NextRequest, NextResponse } from "next/server";

type Context = {
    params: Promise<{ vacancyId: string }>;
};

export async function GET(_request: NextRequest, { params }: Context) {
    const { vacancyId } = await params;
    const hhUrl = `https://api.hh.ru/vacancies/${vacancyId}`;

    try {
        const response = await fetch(hhUrl, {
            headers: {
                "User-Agent": "HHVisorDev/1.0 (nbikiti@bk.com)",
            },
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
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
