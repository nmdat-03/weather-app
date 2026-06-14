import { Clock3, MapPin } from "lucide-react";

type LocationInfoProps = {
    city: string;
    country: string;
    localtime: string;
};

export default function LocationInfo({
    city,
    country,
    localtime,
}: LocationInfoProps) {
    const time = localtime.split(" ")[1];

    return (
        <div className="py-6 text-center text-white">
            <div className="flex items-center justify-center gap-2 text-white/80 text-2xl">
                <MapPin size={16} />
                <span>{country}</span>
            </div>

            <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-6xl">
                {city}
            </h1>

            <div className="mt-6 flex items-center justify-center gap-2 text-3xl font-light md:text-4xl">
                <Clock3 size={28} />
                <span>{time}</span>
            </div>
        </div>
    );
}