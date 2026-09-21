import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  liveWorks,
  caseWorks,
  profile,
  featuredIds,
  type Work,
} from "../../content";
import DemoVideo from "../../components/DemoVideo";

const allWorks = [...liveWorks, ...caseWorks];
const isModel = (w: Work) => caseWorks.some((c) => c.id === w.id);

/** 詳細ページを作るのは「特に見てほしいもの」だけ（flow を書いたもの） */
function findWork(slug: string) {
  const id = `work-${slug}`;
  const work = allWorks.find((w) => w.id === id && featuredIds.includes(w.id));
  return work?.flow ? work : undefined;
}

export function generateStaticParams() {
  return featuredIds
    .map((id) => allWorks.find((w) => w.id === id))
    .filter((w): w is Work => !!w?.flow)
    .map((w) => ({ slug: w.id.replace("work-", "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = findWork(slug);
  if (!work) return {};
  return {
    title: `${work.title}｜押田竜太 / RyuWorks`,
    description: work.summary,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = findWork(slug);
  if (!work) notFound();

  const model = isModel(work);

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3 sm:px-8">
          <Link href="/" className="text-sm font-bold sm:text-base">
            押田竜太
            <span className="font-normal text-muted"> / {profile.brand}</span>
          </Link>
          <Link
            href="/#contact"
            className="rounded bg-accent px-3.5 py-2 text-sm font-bold text-white sm:px-5"
          >
            相談する
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-5 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-12">
        <Link href="/#works" className="block text-sm font-bold text-accent">
          ← 作ったもの一覧へ
        </Link>

        <p
          className={`mt-6 inline-block rounded px-2.5 py-1 text-xs font-bold sm:text-sm ${
            model
              ? "bg-card text-muted ring-1 ring-line"
              : "bg-accent-soft text-accent"
          }`}
        >
          {model
            ? "モデルケース（実際のご依頼ではありません）"
            : (work.kicker ?? "自分の業務で使っています")}
        </p>

        <h1 className="mt-3 text-[26px] font-bold leading-[1.5] sm:text-[36px]">
          {work.title}
        </h1>
        <p className="mt-4 text-[16px] leading-[1.95] sm:text-[17px]">
          {work.summary}
        </p>

        {/* 何がどう変わるか */}
        <div className="mt-8 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="rounded-lg border border-line bg-card px-5 py-4">
            <p className="text-sm font-medium text-muted">
              {model ? "想定：これまで" : "これまで"}
            </p>
            <p className="mt-1 text-xl font-bold leading-snug text-muted">
              {work.before}
            </p>
          </div>
          <div className="rounded-lg border border-accent/40 bg-accent-soft px-5 py-4">
            <p className="text-sm font-bold text-accent">
              {model ? "想定：導入後" : "いま"}
            </p>
            <p className="mt-1 text-2xl font-bold leading-snug text-accent">
              {work.after}
            </p>
          </div>
        </div>

        {/* 動いている様子 */}
        {work.video && (
          <section className="mt-12">
            <h2 className="text-xl font-bold sm:text-2xl">動いている様子</h2>
            <div
              className={`mt-4 ${work.video.vertical ? "md:mx-auto md:max-w-[340px]" : ""}`}
            >
              <DemoVideo
                src={work.video.src}
                poster={work.video.poster}
                alt={`${work.title}が動いている様子`}
                caption={work.video.caption}
              />
            </div>
          </section>
        )}

        {/* どんな困りごとを解決するか */}
        <section className="mt-12">
          <h2 className="text-xl font-bold sm:text-2xl">
            どんな困りごとを解決するか
          </h2>
          <p className="mt-4 text-[15px] leading-[1.95] text-muted sm:text-base">
            {work.problem}
          </p>
        </section>

        {/* どうやって解決するか */}
        {work.flow && (
          <section className="mt-12">
            <h2 className="text-xl font-bold sm:text-2xl">
              どうやって解決するか
            </h2>
            <ol className="mt-5 space-y-3">
              {work.flow.map((f, i) => (
                <li
                  key={f.title}
                  className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-3 rounded-lg border border-line bg-card px-5 py-4"
                >
                  <p className="text-[22px] font-bold leading-tight text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="font-bold">{f.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-[1.9] text-muted">
                      {f.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* 画面 */}
        {work.images && work.images.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold sm:text-2xl">画面</h2>
            <div
              className={`mt-4 grid gap-4 ${
                work.images.every((img) => img.h > img.w)
                  ? "grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {work.images.map((img) => (
                <figure key={img.src}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.w}
                    height={img.h}
                    className="w-full rounded border border-line"
                    sizes="(max-width: 640px) 50vw, 340px"
                  />
                  {img.caption && (
                    <figcaption className="mt-1.5 text-xs leading-relaxed text-muted">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* 結果 */}
        <section className="mt-12">
          <h2 className="text-xl font-bold sm:text-2xl">
            {model ? "想定される効果" : "結果"}
          </h2>
          <p className="mt-4 text-[15px] font-medium leading-[1.95] sm:text-base">
            {work.result}
          </p>
          {work.demo && (
            <p className="mt-5">
              <a
                href={work.demo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-accent px-4 py-2 text-sm font-bold text-accent"
              >
                {work.demo.label}
                <span aria-hidden>→</span>
              </a>
            </p>
          )}
          <p className="mt-6 border-t border-line pt-4 text-xs text-muted">
            使った技術：{work.tech}
          </p>
        </section>

        {/* 相談へ */}
        <section className="mt-12 rounded-lg border border-accent/40 bg-accent-soft p-6 sm:p-8">
          <h2 className="text-lg font-bold sm:text-xl">
            似たような作業で困っていませんか
          </h2>
          <p className="mt-2 text-[15px] leading-[1.9] text-muted">
            初回のご相談は無料です。まだ形になっていない段階で構いません。費用は必ず事前にお見積りをお出しします。
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#contact"
              className="rounded bg-accent px-6 py-3.5 text-center font-bold text-white"
            >
              相談してみる
            </Link>
            <Link
              href="/#works"
              className="rounded border border-accent px-6 py-3.5 text-center font-bold text-accent"
            >
              ほかの作ったものを見る
            </Link>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-3xl border-t border-line px-5 pb-10 pt-6 text-xs text-muted sm:px-8">
        <p>
          {profile.name}／{profile.brand}（{profile.area}）
        </p>
      </footer>
    </>
  );
}
