import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    Legend,
    TooltipContentProps,
    TooltipIndex,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: TooltipContentProps) => {
    const isVisible = active && payload && payload.length;

    const salary = payload?.[0]?.value;

    return (
        <div
            className="bg-foreground py-1 px-2 rounded-[6px]"
            style={{ visibility: isVisible ? "visible" : "hidden" }}
        >
            {isVisible && (
                <>
                    <p className="text-secondary font-bold text-[10px]">
                        Day {label}
                    </p>
                    <p className="text-secondary text-[10px]">
                        Salary: {salary ? salary.toLocaleString() : "—"}
                    </p>
                </>
            )}
        </div>
    );
};

const SalaryTrendsChart = ({
    isAnimationActive,
    defaultIndex,
    data,
}: {
    isAnimationActive?: boolean;
    defaultIndex?: TooltipIndex;
    data: Array<{ name: string; salary: number }>;
}) => {
    return (
        <BarChart
            style={{
                width: "100%",
                maxWidth: "942px",
                maxHeight: "70vh",
                aspectRatio: 1.618,
            }}
            responsive
            data={data}
            margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 0,
            }}
        >
            <XAxis
                dataKey="name"
                niceTicks="snap125"
                style={{ fontSize: "10px", margin: "4px 0", fontWeight: "700" }}
            />
            <Tooltip
                content={CustomTooltip}
                isAnimationActive={isAnimationActive}
                defaultIndex={defaultIndex}
            />
            <Legend />
            <Bar
                dataKey="salary"
                barSize={11}
                fill="#2563eb"
                isAnimationActive={isAnimationActive}
            />
        </BarChart>
    );
};

export default SalaryTrendsChart;
