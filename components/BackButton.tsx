"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-sm bg-secondary text-md"
        >
            ←
        </button>
    );
}
