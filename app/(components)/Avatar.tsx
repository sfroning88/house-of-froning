"use client";

import Image from "next/image";
import {
  DS_TO_WEB_SCALE,
  MAP_AVATAR_IMAGE_PATH,
  MAP_AVATAR_SIZE,
} from "@/lib/constants";
import type { AvatarPosition } from "@lib/types";

type AvatarProps = {
  position: AvatarPosition;
  isBlinking: boolean;
};

export function Avatar({ position, isBlinking }: AvatarProps) {
  const avatarSize = MAP_AVATAR_SIZE * DS_TO_WEB_SCALE;
  return (
    <div
      className={`absolute pointer-events-none ${isBlinking ? "animate-blink" : ""}`}
      style={{
        left: position.x,
        top: position.y,
        width: avatarSize,
        height: avatarSize,
        transform: "translate(-50%, -50%)",
      }}
    >
      <Image
        src={MAP_AVATAR_IMAGE_PATH}
        alt="Avatar"
        width={avatarSize}
        height={avatarSize}
        className="object-contain w-full h-full"
      />
    </div>
  );
}
