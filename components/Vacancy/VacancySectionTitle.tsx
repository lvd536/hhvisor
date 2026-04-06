interface Props {
    title: string;
}

export default function VacancySectionTitle({ title }: Props) {
    return (
        <div className="flex items-center gap-3 mt-12">
            <div className="w-8 h-1 rounded-full bg-ring" />
            <div
                className="font-bold text-[20px] tracking-tight"
                style={{ lineHeight: "140%" }}
            >
                {title}
            </div>
        </div>
    );
}
