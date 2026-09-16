"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * 画面に入ったときに下から浮かび上がらせる。
 * 中身はサーバーの時点で見えている。隠すのは「まだ画面の下にある要素」だけなので、
 * JSが遅れても・動かなくても、中身が見えない瞬間は作らない。
 *
 * 判定はスクロールのたびに位置を測る方式。IntersectionObserver では、
 * ページ内リンクで一気に飛び越えた要素が「一度も画面に入らなかった」扱いになり、
 * 消えたまま残ることがあったため（2026-09-15 に実機で再現）。
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
    // すでに画面内・画面より上にあるものは動かさない（見えているものを一度消すとちらつく）
    const reached = () => el.getBoundingClientRect().top < window.innerHeight * 0.92;
    if (reached()) return;

    let frame = 0;
    let done = false;
    const stop = () => {
      done = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
    const check = () => {
      frame = 0;
      if (done) return;
      if (reached()) {
        setState("shown");
        stop();
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    // 画面の下にあるうちに隠しておく（見えていないので、ちらつかない）
    setState("waiting");
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return stop;
  }, []);

  const motion =
    state === "static" ? "" : state === "waiting" ? "reveal reveal-waiting" : "reveal";
  return (
    <div ref={ref} className={`${motion} ${className}`}>
      {children}
    </div>
  );
}
