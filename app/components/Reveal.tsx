"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * 画面に入ったときに下から浮かび上がらせる。
 * 中身はサーバーの時点で見えている。隠すのは「まだ画面の下にある要素」だけなので、
 * JSが遅れても・動かなくても、中身が見えない瞬間は作らない。
 */
export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "waiting" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // すでに画面内にあるものは動かさない（見えているものを一度消すと、ちらつく）
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    // 画面の下にあるうちに隠しておく（見えていないので、ちらつかない）
    const frame = requestAnimationFrame(() => {
      setState("waiting");
      observer.observe(el);
    });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const motion =
    state === "static" ? "" : state === "waiting" ? "reveal reveal-waiting" : "reveal";
  return (
    <div ref={ref} className={`${motion} ${className}`}>
      {children}
    </div>
  );
}
