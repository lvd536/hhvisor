import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
    const hhUrl = new URL("https://api.hh.ru/dictionaries");
    try {
        const response = await fetch(hhUrl.toString(), {
            headers: {
                "User-Agent": "HHVisorDev/1.0 (nbikiti@bk.com)",
            },
            next: {
                revalidate: 60 * 60 * 24,
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
