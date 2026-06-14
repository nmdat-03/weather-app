"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackButton() {
    return (
        <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white/50 border border-white/60 px-4 py-2 backdrop-blur-lg"
        >
            <ArrowLeft size={18} />
            Back
        </Link>
    );
}