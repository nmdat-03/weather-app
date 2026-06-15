"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackButton() {
    return (
        <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 rounded-xl bg-linear-to-t from-zinc-300 via-zinc-200 to-zinc-100 px-4 py-2"
        >
            <ArrowLeft size={18} />
            Back
        </Link>
    );
}