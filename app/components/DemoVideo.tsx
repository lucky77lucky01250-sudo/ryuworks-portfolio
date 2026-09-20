"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * 動いている様子の動画。
 * 最初は静止画と再生ボタンだけを出し、押されたときに初めて動画を読み込む
 * （スマホで最初から動画を読み込むと、開くのが遅くなるため）。
 */
export default function DemoVideo({
  src,
  poster,
  alt,
  caption,
}: {
  src: string;
  poster: string;
  alt: string;
  caption?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure>
      <div className="relative overflow-hidden rounded-lg border border-line bg-background">
        {playing ? (
          <video
            src={src}
            poster={poster}
            controls
            autoPlay
            playsInline
            className="block w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${alt}を再生する`}
            className="group block w-full cursor-pointer"
          >
            <Image
              src={poster}
              alt={alt}
              width={1280}
              height={720}
              className="block w-full"
              sizes="(max-width: 768px) 100vw, 480px"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-foreground/10">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent shadow-lg">
                <svg
                  aria-hidden
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="#ffffff"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs leading-relaxed text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
