"use client";

import Image from "next/image";
import {useCallback, useState} from "react";

type HeroImageProps = {
  src: string;
  alt: string;
  /** CSS object-position, used to keep the subject (and not baked-in artwork) in frame. */
  position?: string;
  /** Extra zoom, used to crop logos or captions baked into the source image. */
  zoom?: number;
  /** transform-origin for the zoom. */
  origin?: string;
  sizes?: string;
  priority?: boolean;
};

/** Full-bleed photograph that fades in over the navy base once loaded. */
export function HeroImage({
  src,
  alt,
  position = "center",
  zoom = 1,
  origin = "center",
  sizes = "100vw",
  priority = false,
}: HeroImageProps) {
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      onLoad={markReady}
      onError={markReady}
      ref={(node) => {
        if (node?.complete) {
          markReady();
        }
      }}
      style={{objectPosition: position, transform: zoom === 1 ? undefined : `scale(${zoom})`, transformOrigin: origin}}
      className={`object-cover transition-opacity duration-700 ease-out ${ready ? "opacity-100" : "opacity-0"}`}
    />
  );
}
