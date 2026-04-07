"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
    { href: "/", label: "Home" },
    { href: "/analytics", label: "Analytics" },
    { href: "/saved", label: "Saved" },
];

export default function MainNav() {
    const pathname = usePathname();

    return (
        <div className="w-full grid grid-cols-3 items-center md:px-10 min-h-10 nav-shadow container mx-auto z-99">
            <p className="font-black text-xl">HH Visor</p>
            <div className="flex justify-center gap-2">
                {items.map((item) => {
                    const active =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={
                                active
                                    ? "px-3 py-1 rounded-md font-semibold text-white"
                                    : "px-3 py-1 rounded-md text-muted-foreground hover:text-foreground"
                            }
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </div>
            <div />
        </div>
    );
}
