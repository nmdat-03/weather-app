import {
    Sunrise,
    Sunset,
    Moon,
    CircleDashed,
    SunMoon,
} from "lucide-react";

type SunInfoProps = {
    sunrise: string;
    sunset: string;
    moonPhase: string;
    moonIllumination: string;
};

function InfoItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-medium">
                {icon}
                {label}
            </p>

            <p className="text-center text-xl font-bold">
                {value}
            </p>
        </div>
    );
}

export default function SunInfo({
    sunrise,
    sunset,
    moonPhase,
    moonIllumination,
}: SunInfoProps) {
    const glassClass = `
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/20
        bg-white/50
        p-4
        backdrop-blur-2xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-white/60
        [box-shadow:
        inset_0_2px_2px_rgba(255,255,255,0.4),
        inset_0_-2px_2px_rgba(255,255,255,0.1),
        0_10px_30px_rgba(0,0,0,0.15)
        ]
    `;

    return (
        <div className={glassClass}>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/20 to-transparent" />

            <div className="mb-5">
                <h2 className="flex gap-2 items-center text-xl font-semibold">
                    <SunMoon size={20} />
                    Sun & Moon Info
                </h2>
            </div>

            <div className="relative grid grid-cols-2 gap-6">
                <InfoItem
                    icon={<Sunrise size={22} />}
                    label="Sunrise"
                    value={sunrise}
                />

                <InfoItem
                    icon={<Sunset size={22} />}
                    label="Sunset"
                    value={sunset}
                />

                <InfoItem
                    icon={<Moon size={22} />}
                    label="Moon Phase"
                    value={moonPhase}
                />

                <InfoItem
                    icon={<CircleDashed size={22} />}
                    label="Illumination"
                    value={`${moonIllumination}%`}
                />

            </div>
        </div>
    );
}