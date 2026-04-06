type AIAnalysis = {
    clarity_score?: string | number;
    salary_range_estimate?: string;
    skills_match_score?: string | number;
    tech_stack_relevance_score?: string | number;
    summary?: string;
};

interface Props {
    aiAnalysis?: AIAnalysis | null;
}

function MetricCard({
    label,
    value,
}: {
    label: string;
    value?: string | number;
}) {
    return (
        <div
            className="flex items-center justify-between gap-5 text-wrap rounded-[8px] p-4"
            style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
        >
            <p
                className="text-[14px] text-muted-foreground"
                style={{ lineHeight: "143%" }}
            >
                {label}
            </p>
            <p
                className="font-medium text-[14px]"
                style={{ lineHeight: "143%" }}
            >
                {value ?? "—"}
            </p>
        </div>
    );
}

export default function VacancyAiAnalysis({ aiAnalysis }: Props) {
    if (!aiAnalysis || Object.keys(aiAnalysis).length === 0) {
        return (
            <p className="mt-6 text-muted-foreground">
                AI not provide any info
            </p>
        );
    }

    return (
        <div className="flex flex-wrap w-full mt-6 gap-4">
            <MetricCard
                label="Clarity Score"
                value={aiAnalysis.clarity_score}
            />
            <MetricCard
                label="Salary Range Estimate"
                value={aiAnalysis.salary_range_estimate}
            />
            <MetricCard
                label="Skills Match Score"
                value={aiAnalysis.skills_match_score}
            />
            <MetricCard
                label="Tech Stack Relevance Score"
                value={aiAnalysis.tech_stack_relevance_score}
            />
            <MetricCard label="Summary" value={aiAnalysis.summary} />
        </div>
    );
}
