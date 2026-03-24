"use client";

import { useAreaStore } from "@/stores/useAreaStore";
import { useJobStore } from "@/stores/useJobStore";
import { useEffect } from "react";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { initVacancies } = useJobStore();
    const { initAreas } = useAreaStore();
    useEffect(() => {
        initVacancies();
        initAreas();
    }, [initVacancies, initAreas]);
    return <>{children}</>;
}
