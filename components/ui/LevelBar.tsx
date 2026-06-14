type LevelBarProps = {
    total: number;
    current: number;
    color: string;
};

export default function LevelBar({
    total,
    current,
    color,
}: LevelBarProps) {
    return (
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
            {Array.from({ length: total }, (_, index) => (
                <div
                    key={index}
                    className={`h-3 rounded transition-all duration-300 ${
                        index + 1 <= current
                            ? color
                            : "bg-white/40"
                    }`}
                />
            ))}
        </div>
    );
}