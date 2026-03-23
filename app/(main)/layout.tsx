"use client";

import { useJobStore } from "@/stores/useJobStore";
import { useEffect } from "react";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { initVacancies } = useJobStore();
    useEffect(() => {
        initVacancies();
    }, [initVacancies]);
    return <>{children}</>;
}
