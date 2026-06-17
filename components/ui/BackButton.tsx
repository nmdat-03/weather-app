"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BackButton() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2 rounded-xl bg-linear-to-t from-zinc-300 via-zinc-200 to-zinc-100 p-3 transition-all duration-200 hover:-translate-x-1"
            >
                <ArrowLeft size={20} />
            </Link>
        </motion.div>
    );
}