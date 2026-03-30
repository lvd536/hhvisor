"use client";

import { useAreaStore } from "@/stores/useAreaStore";
import { useJobStore } from "@/stores/useJobStore";
import { useEffect } from "react";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const init = useJobStore((s) => s.init);
    const initAreas = useAreaStore((s) => s.initAreas);

    useEffect(() => {
        init();
        initAreas();
    }, []);

    return <>{children}</>;
}
