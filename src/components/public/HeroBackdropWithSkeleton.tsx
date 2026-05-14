"use client";

import Image from "next/image";
import {useCallback, useState} from "react";

import {SkeletonBlock} from "@/components/skeletons/SkeletonPrimitives";

type HeroBackdropWithSkeletonProps = {
  alt: string;
  src: string;
};

export function HeroBackdropWithSkeleton({alt, src}: HeroBackdropWithSkeletonProps) {
  const [imageReady, setImageReady] = useState(false);

  const markReady = useCallback(() => {
    setImageReady(true);
  }, []);

  return (
    <div className="absolute inset-0">
      <SkeletonBlock
        aria-hidden
        className={`absolute inset-0 min-h-full bg-alfs-royal-blue/35 transition-opacity duration-500 ease-out motion-reduce:transition-none ${
          imageReady ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className={`object-cover object-center transition-opacity duration-500 ease-out motion-reduce:transition-none ${
          imageReady ? "opacity-48" : "opacity-0"
        }`}
        onLoadingComplete={markReady}
        onError={markReady}
      />
      <div className="absolute inset-0 bg-[rgba(13,31,92,0.78)]" />
    </div>
  );
}
