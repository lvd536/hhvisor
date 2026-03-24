"use client";

import { useMemo } from "react";
import DOMPurify from "dompurify";

export default function SafeHTML({ html }: { html: string }) {
    const clean = useMemo(() => {
        if (typeof window === "undefined") return html;
        return DOMPurify.sanitize(html);
    }, [html]);

    return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
