"use client";

import { searchLocations, type LocationResult } from "@/services/geocoding";
import { Search } from "lucide-react";
import { useRef, useState } from "react";

type SearchBarProps = {
    onSelectLocation: (location: LocationResult) => void;
};

export default function SearchBar({
    onSelectLocation,
}: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<LocationResult[]>([]);
    const [loading, setLoading] = useState(false);

    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;

        setQuery(value);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (value.trim().length < 2) {
            setResults([]);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            try {
                setLoading(true);

                const locations = await searchLocations(value);

                setResults(locations);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 400);
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
    };

    return (
        <div className="absolute left-1/2 top-6 z-20 w-80 -translate-x-1/2">
            <div className="relative">
                <form
                    onSubmit={handleSubmit}
                    className="relative flex items-center"
                >
                    <input
                        value={query}
                        onChange={handleChange}
                        placeholder="Search city..."
                        className="w-full rounded-xl border border-white/20 bg-black/30 py-3 pl-3 pr-12 text-white backdrop-blur outline-none" />

                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 flex h-8 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-white text-black transition hover:scale-105"
                    >
                        <Search size={16} />
                    </button>
                </form>
            </div>

            {(results.length > 0 || loading) && (
                <div className="mt-2 overflow-hidden rounded-xl border border-white/10 bg-black/70 backdrop-blur-xl">
                    {loading && (
                        <div className="px-4 py-3 text-sm text-white/60">
                            Searching...
                        </div>
                    )}

                    {!loading &&
                        results.map((location) => (
                            <button
                                key={`${location.lat}-${location.lon}`}
                                type="button"
                                onClick={() => {
                                    onSelectLocation(location);

                                    setQuery(`${location.name}, ${location.country}`);

                                    setResults([]);
                                }}
                                className="block w-full border-b border-white/10 px-4 py-3 text-left transition hover:bg-white/10 last:border-b-0"
                            >
                                <div className="font-medium text-white">
                                    {location.name}
                                </div>

                                <div className="text-sm text-white/60">
                                    {location.region
                                        ? `${location.region}, `
                                        : ""}
                                    {location.country}
                                </div>
                            </button>
                        ))}
                </div>
            )}
        </div>
    );
}