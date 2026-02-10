"use client";

import Image from "next/image";
import { ROTATING_SPEED } from "@/app/constants";

export function RotatingBaby() {
    return (
        <div className="flex items-center justify-center">
            <div className="relative">
                <Image
                src="/images/BabySean.jpg"
                alt="Baby Sean"
                width={300}
                height={300}
                className="rounded-full animate-spin-slow"
                style={{
                    animationDuration: `${60 / ROTATING_SPEED}s`,
                }}
                />
            </div>
        </div>
    );
}
