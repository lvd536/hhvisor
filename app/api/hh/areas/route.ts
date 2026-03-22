import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const areaId = searchParams.get("areaId") || "";

    const hhUrl = new URL(`https://api.hh.ru/areas${areaId}`);
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
