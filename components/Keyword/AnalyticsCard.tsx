import { ReactNode } from "react";

interface IProps {
    children: ReactNode;
    className?: string;
}

export default function AnalyticsCard({ children, className = "" }: IProps) {
    return (
        <div
            className={`bg-card rounded-[8px] p-8 ${className}`}
            style={{
                border: "1px solid rgba(30, 41, 59, 0.5)",
            }}
        >
            {children}
        </div>
    );
}
