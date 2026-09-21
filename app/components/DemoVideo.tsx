"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * 動いている様子の動画。
 * 最初は静止画と再生ボタンだけを出し、押されたときに初めて動画を読み込む
 * （スマホで最初から動画を読み込むと、開くのが遅くなるため）。
 *
 * 横長の動画はスマホの縦画面だと文字が小さくて読めないので、
 * スマホでは押したら全画面（できれば横向き）で再生する。
 * iPhoneは playsInline を外すと自動で全画面になる。
 */
export default function DemoVideo({
  src,
  poster,
  alt,
  headline,
  caption,
  vertical,
}: {
  src: string;
  poster: string;
  alt: string;
  headline?: string;
  caption?: string;
  vertical?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const fullscreenOnPhone = !vertical && narrow;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement) {
        try {
          screen.orientation?.unlock?.();
        } catch {}
      }
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // 押した直後（同じ操作の流れの中）に再生と全画面まで済ませる
  // （時間を置くと、ブラウザに「利用者の操作ではない」と判断されて全画面が拒否される）
  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!playing || !video || !fullscreenOnPhone) return;
    // iPhoneは playsInline が無いと自動再生しないので、押した流れの中で再生を命令する
    // （これで全画面になる）。PCと縦長動画は autoPlay に任せる
    video.play().catch(() => {});
    if (!video.requestFullscreen) return;
    video
      .requestFullscreen()
      .then(() => {
        const orientation = screen.orientation as ScreenOrientation & {
          lock?: (o: string) => Promise<void>;
        };
        return orientation?.lock?.("landscape");
      })
      .catch(() => {});
  }, [playing, fullscreenOnPhone]);

  return (
    <figure>
      <div className="relative overflow-hidden rounded-lg border border-line bg-background">
        {playing && (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            controls
            autoPlay
            muted
            playsInline={!fullscreenOnPhone}
            className="block w-full"
          />
        )}
        {!playing && (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${alt}を再生する`}
            className="group relative block w-full cursor-pointer text-left"
          >
            <Image
              src={poster}
              alt={alt}
              width={1280}
              height={720}
              className="block w-full"
              sizes="(max-width: 768px) 100vw, 480px"
            />
            {headline && (
              <span className="absolute inset-x-0 top-0 bg-foreground/85 px-3 py-2 text-sm font-bold leading-snug text-white sm:text-base">
                {headline}
              </span>
            )}
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
      {fullscreenOnPhone && !playing && (
        <p className="mt-2 text-xs font-bold text-accent">
          押すと全画面で再生します。横向きにすると文字が大きくなります
        </p>
      )}
      {caption && (
        <figcaption className="mt-2 text-xs leading-relaxed text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
