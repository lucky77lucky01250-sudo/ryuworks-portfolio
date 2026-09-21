import Image from "next/image";
import Link from "next/link";
import {
  LINE_URL,
  FORMSPREE_ID,
  hasLine,
  hasForm,
  hero,
  capabilities,
  liveWorks,
  caseWorks,
  why,
  steps,
  profile,
  intro,
  featuredIds,
  tools,
  type Work,
} from "./content";
import Reveal from "./components/Reveal";
import DemoVideo from "./components/DemoVideo";
import CountUp from "./components/CountUp";
import WorkDetails from "./components/WorkDetails";
import Scenery from "./components/Scenery";

function ArrowIcon() {
  return (
    <svg
      aria-hidden
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

function BeforeAfter({
  before,
  after,
  assumed,
  size,
}: {
  before: string;
  after: string;
  assumed: boolean;
  size: "lg" | "md";
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1.25fr)] items-stretch gap-2">
      <div className="rounded-md border border-line bg-background px-3 py-2.5">
        <p className="text-xs font-medium text-muted">
          {assumed ? "想定：これまで" : "これまで"}
        </p>
        <p
          className={`font-bold leading-snug text-muted ${
            size === "lg" ? "text-base sm:text-xl" : "text-sm sm:text-base"
          }`}
        >
          {before}
        </p>
      </div>
      <div className="flex items-center text-accent">
        <ArrowIcon />
      </div>
      <div className="rounded-md border border-accent/40 bg-accent-soft px-3 py-2.5">
        <p className="text-xs font-bold text-accent">
          {assumed ? "想定：導入後" : "いま"}
        </p>
        <p
          className={`font-bold leading-snug text-accent ${
            size === "lg" ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
          }`}
        >
          {after}
        </p>
      </div>
    </div>
  );
}

function WorkImages({ work }: { work: Work }) {
  if (!work.images || work.images.length === 0) return null;
  return (
    <div
      className={`grid gap-3 ${
        work.images.every((img) => img.h > img.w)
          ? "grid-cols-2"
          : "grid-cols-1"
      }`}
    >
      {work.images.map((img) => (
        <figure key={img.src}>
          <a href={img.src} target="_blank" rel="noopener noreferrer">
            <Image
              src={img.src}
              alt={img.alt}
              width={img.w}
              height={img.h}
              className="w-full rounded border border-line"
              sizes="(max-width: 640px) 50vw, 280px"
            />
          </a>
          {img.caption && (
            <figcaption className="mt-1.5 text-xs leading-relaxed text-muted">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

function WorkBody({
  work,
  problemLabel,
}: {
  work: Work;
  problemLabel: string;
}) {
  return (
    <div className="space-y-4 rounded-md bg-background p-4 text-[15px] sm:text-base">
      <div>
        <p className="text-sm font-bold text-accent">{problemLabel}</p>
        <p className="mt-1 text-muted">{work.problem}</p>
      </div>
      <div>
        <p className="text-sm font-bold text-accent">作ったもの</p>
        <p className="mt-1">{work.built}</p>
      </div>
      <div>
        <p className="text-sm font-bold text-accent">
          {problemLabel === "想定した困りごと" ? "想定される効果" : "結果"}
        </p>
        <p className="mt-1 font-medium">{work.result}</p>
      </div>
      {work.demo && (
        <p>
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
      <p className="border-t border-line pt-3 text-xs text-muted">
        使った技術：{work.tech}
      </p>
    </div>
  );
}

/** 特に見てほしいもの（大きく出すカード） */
function FeaturedWorkCard({ work, model }: { work: Work; model: boolean }) {
  const hasMedia = !!work.video || !!work.images?.length;
  return (
    <article
      id={work.id}
      className={`scroll-mt-20 space-y-4 rounded-lg border p-5 sm:p-8 ${
        model
          ? "border-dashed border-muted/50 bg-background"
          : work.featured
            ? "border-accent/40 bg-card shadow-sm"
            : "border-line bg-card"
      }`}
    >
      <div
        className={
          hasMedia
            ? "grid gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-start md:gap-10"
            : ""
        }
      >
        <div className="space-y-4">
          <p
            className={`inline-block rounded px-2.5 py-1 text-xs font-bold sm:text-sm ${
              model
                ? "bg-background text-muted ring-1 ring-line"
                : "bg-accent-soft text-accent"
            }`}
          >
            {model
              ? "モデルケース（実際のご依頼ではありません）"
              : (work.kicker ?? "自分の業務で使っています")}
          </p>
          <h3
            className={`font-bold ${
              work.featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
            }`}
          >
            {work.title}
          </h3>
          <BeforeAfter
            before={work.before}
            after={work.after}
            assumed={model}
            size="lg"
          />
          <p className="text-[15px] sm:text-base">{work.summary}</p>
        </div>
        <div className="space-y-3">
          {work.video ? (
            <DemoVideo
              src={work.video.src}
              poster={work.video.poster}
              alt={`${work.title}が動いている様子`}
              caption={work.video.caption}
            />
          ) : null}
          <WorkImages work={work} />
        </div>
      </div>
      {work.flow ? (
        <Link
          href={`/works/${work.id.replace("work-", "")}`}
          className="flex min-h-11 items-center justify-between gap-3 border-t border-line pt-3 text-left text-sm font-bold text-accent"
        >
          この仕組みをくわしく見る（困りごと・解決の流れ・結果）
          <span aria-hidden>→</span>
        </Link>
      ) : (
        <WorkDetails>
          <WorkBody
            work={work}
            problemLabel={model ? "想定した困りごと" : "困っていたこと"}
          />
        </WorkDetails>
      )}
    </article>
  );
}

/** ほかにも作ったもの（小さくまとめるカード） */
function CompactWorkCard({ work, model }: { work: Work; model: boolean }) {
  return (
    <article
      id={work.id}
      className="scroll-mt-20 space-y-3.5 rounded-lg border border-line bg-card p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 className="text-[17px] font-bold sm:text-lg">{work.title}</h3>
        <span className="text-xs font-bold text-muted">
          {model ? "モデルケース" : (work.kicker ?? "自分の業務で使っています")}
        </span>
      </div>
      <BeforeAfter
        before={work.before}
        after={work.after}
        assumed={model}
        size="md"
      />
      <p className="text-sm text-muted sm:text-[15px]">{work.summary}</p>
      <WorkDetails>
        <WorkBody
          work={work}
          problemLabel={model ? "想定した困りごと" : "困っていたこと"}
        />
      </WorkDetails>
    </article>
  );
}

function SectionHeading({ label, note }: { label: string; note?: string }) {
  return (
    <div className="mb-6 sm:mb-8">
      <h2 className="text-[22px] font-bold sm:text-[28px]">
        {label.split("\n").map((part, i) => (
          <span key={part}>
            {i > 0 && <br className="sm:hidden" />}
            {part}
          </span>
        ))}
      </h2>
      {note && <p className="mt-2 text-sm text-muted">{note}</p>}
    </div>
  );
}

/** 章の帯。背景色を交互に変えて、章の切れ目を分かるようにする */
function Band({
  id,
  tone = "base",
  className = "",
  children,
}: {
  id?: string;
  tone?: "base" | "card" | "soft";
  className?: string;
  children: React.ReactNode;
}) {
  const bg =
    tone === "card"
      ? "bg-card"
      : tone === "soft"
        ? "bg-accent-soft"
        : "bg-background";
  return (
    <section
      id={id}
      className={`scroll-mt-16 border-t border-line ${bg} ${className}`}
    >
      <div className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  const primaryCta = hasLine ? LINE_URL : "#contact";
  const allWorks = [...liveWorks, ...caseWorks];
  const isModel = (w: Work) => caseWorks.some((c) => c.id === w.id);
  const featured = featuredIds
    .map((id) => allWorks.find((w) => w.id === id))
    .filter((w): w is Work => !!w);
  const others = allWorks.filter((w) => !featuredIds.includes(w.id));
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-8">
          <p className="text-sm font-bold sm:text-base">
            押田竜太
            <span className="font-normal text-muted"> / {profile.brand}</span>
          </p>
          <nav className="flex items-center gap-7 text-sm">
            <a href="#works" className="hidden text-muted md:inline">
              実績
            </a>
            <a href="#why" className="hidden text-muted md:inline">
              なぜ作るのか
            </a>
            <a href="#steps" className="hidden text-muted md:inline">
              進め方
            </a>
            <a
              href="#contact"
              className="rounded bg-accent px-3.5 py-2 font-bold text-white sm:px-5"
            >
              相談する
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ヒーロー（動かさない。開いた瞬間に全部見えている） */}
        <section className="mx-auto w-full max-w-5xl px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)] md:items-center md:gap-14">
            <div>
              <h1 className="whitespace-pre-line text-[26px] font-bold leading-[1.55] sm:text-[42px]">
                {hero.headline}
              </h1>
              <p className="mt-5 whitespace-pre-line text-[15px] text-muted sm:mt-7 sm:text-[17px]">
                {hero.sub}
              </p>
              <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-4">
                {hero.facts.map((f) => (
                  <div
                    key={f.label}
                    className="rounded-lg border border-line bg-card px-2.5 py-3 sm:px-5 sm:py-4"
                  >
                    <p className="text-[28px] font-bold leading-tight text-accent sm:text-4xl">
                      <CountUp value={f.value} />
                      {f.unit}
                    </p>
                    <p className="mt-0.5 text-xs leading-normal text-muted sm:text-sm">
                      {f.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <a
                  href={primaryCta}
                  {...(hasLine
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="rounded bg-accent px-7 py-3.5 text-center font-bold text-white"
                >
                  {hasLine ? "LINEで相談する" : "相談してみる"}
                </a>
                <a
                  href="#works"
                  className="rounded border border-accent px-7 py-3.5 text-center font-bold text-accent"
                >
                  作ったものを見る
                </a>
              </div>
            </div>
            <figure className="mx-auto w-[220px] md:w-full md:max-w-[290px]">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                width={hero.image.w}
                height={hero.image.h}
                priority
                className="w-full rounded-[18px] border border-line shadow-[0_12px_32px_rgba(28,35,33,0.12)]"
                sizes="(max-width: 768px) 220px, 290px"
              />
              <figcaption className="mt-2.5 text-center text-xs text-muted">
                {hero.image.caption}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 自己紹介（実績より前に、どんな人かを先に伝える） */}
        <Band tone="card">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
            <Image
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              width={480}
              height={480}
              className="h-24 w-24 shrink-0 rounded-full border border-line sm:h-32 sm:w-32"
              sizes="128px"
            />
            <div>
              <p className="text-xl font-bold sm:text-2xl">
                {profile.name}
                <span className="ml-2 text-sm font-normal text-muted">
                  {profile.reading}
                </span>
              </p>
              <p className="mt-1 text-sm text-muted">
                {profile.brand}／{profile.area}
              </p>
              <p className="mt-4 text-[17px] font-bold text-accent sm:text-lg">
                {intro.lead}
              </p>
              <div className="mt-3 space-y-3 text-[15px] leading-[1.95] sm:text-base">
                {intro.body.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
              <a
                href="#why"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-accent"
              >
                {intro.linkLabel}
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </Band>

        {/* できること */}
        <Band>
          <Reveal>
            <SectionHeading
              label="できること"
              note="当てはまりそうなものを押すと、実際に作ったものへ進めます。"
            />
          </Reveal>
          <ul className="grid gap-3 md:grid-cols-2">
            {capabilities.map((c) => (
              <li key={c.title}>
                <Reveal className="h-full">
                  <a
                    href={`#${c.anchor}`}
                    className={`block h-full rounded-lg border px-5 py-4 ${
                      c.lead
                        ? "border-accent/40 bg-accent-soft"
                        : "border-line bg-card"
                    }`}
                  >
                    <h3 className="font-bold">{c.title}</h3>
                    <p className="mt-1.5 text-sm text-muted">{c.body}</p>
                    <p className="mt-2 border-t border-line pt-2 text-sm font-medium text-accent">
                      {c.forWhom}
                    </p>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </Band>

        {/* 特に見てほしいもの */}
        <Band id="works" tone="card">
          <Reveal>
            <SectionHeading
              label="特に見てほしいもの"
              note="動いている様子と、何がどう変わったかを見られます。"
            />
          </Reveal>
          <h3 className="mb-4 text-lg font-bold sm:text-xl">
            実際に使っているもの
          </h3>
          <div className="space-y-5">
            {featured
              .filter((w) => !isModel(w))
              .map((w) => (
                <Reveal key={w.id}>
                  <FeaturedWorkCard work={w} model={false} />
                </Reveal>
              ))}
          </div>
          <div className="mt-12 border-t border-line pt-8">
            <h3 className="text-lg font-bold sm:text-xl">
              モデルケース（対応できる幅を示すもの）
            </h3>
            <p className="mb-4 mt-2 text-sm text-muted">
              実際のご依頼ではなく、よくある困りごとを想定して一から作り、動かして確かめたものです。数字は想定した条件での試算です。
            </p>
          </div>
          <div className="space-y-5">
            {featured
              .filter((w) => isModel(w))
              .map((w) => (
                <Reveal key={w.id}>
                  <FeaturedWorkCard work={w} model />
                </Reveal>
              ))}
          </div>
        </Band>

        {/* ほかにも作ったもの */}
        <Band>
          <Reveal>
            <SectionHeading
              label="ほかにも作ったもの"
              note="「モデルケース」は実際のご依頼ではなく、よくある困りごとを想定して一から作り、動かして確かめたものです。"
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {others.map((w) => (
              <Reveal key={w.id}>
                <CompactWorkCard work={w} model={isModel(w)} />
              </Reveal>
            ))}
          </div>
        </Band>

        {/* なぜ作るのか */}
        <Band id="why" tone="soft">
          <Reveal>
            <div className="max-w-3xl">
              <Scenery className="mb-8 w-full text-accent" />
              <SectionHeading label={why.heading} />
              <p className="whitespace-pre-line text-[19px] font-bold leading-[1.7] text-accent sm:text-[22px]">
                {why.lead}
              </p>
              <div className="mt-5 space-y-4 text-[15px] leading-[1.95] sm:text-base">
                {why.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                {why.values.map((v) => (
                  <li
                    key={v.title}
                    className="rounded-lg border border-line bg-card px-4 py-3.5"
                  >
                    <h3 className="text-[15px] font-bold text-accent">
                      {v.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{v.body}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <Image
                    src={why.likesImage.src}
                    alt={why.likesImage.alt}
                    width={720}
                    height={540}
                    className="mb-3 w-full rounded-lg"
                    sizes="(max-width: 640px) 100vw, 360px"
                  />
                  <h3 className="font-bold">好きなこと</h3>
                  <dl className="mt-2 space-y-2.5 text-[15px]">
                    {why.likes.map((l) => (
                      <div key={l.title}>
                        <dt className="font-medium text-accent">{l.title}</dt>
                        <dd className="text-muted">{l.body}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div>
                  <Image
                    src={why.futureImage.src}
                    alt={why.futureImage.alt}
                    width={720}
                    height={540}
                    className="mb-3 w-full rounded-lg"
                    sizes="(max-width: 640px) 100vw, 360px"
                  />
                  <h3 className="font-bold">これからやっていきたいこと</h3>
                  <div className="mt-2 space-y-2 text-[15px]">
                    {why.future.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-7 border-t border-line pt-5 text-sm text-muted">
                {profile.name}（{profile.brand}／{profile.area}）　
                {profile.availability}
              </p>
            </div>
          </Reveal>
        </Band>

        {/* いま使っている道具につなげられます */}
        <Band tone="card">
          <Reveal>
            <SectionHeading label={tools.heading} note={tools.note} />
          </Reveal>
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {tools.items.map((t) => (
              <li key={t.title}>
                <Reveal className="h-full">
                  <div className="h-full rounded-lg border border-line bg-background px-4 py-3.5">
                    <h3 className="text-[15px] font-bold text-accent">
                      {t.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{t.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted">
            {tools.techLabel}：{tools.tech}
          </p>
        </Band>

        {/* 進め方 */}
        <Band id="steps">
          <Reveal>
            <SectionHeading label={steps.heading} note={steps.note} />
          </Reveal>
          <ol className="grid gap-3 md:grid-cols-4">
            {steps.items.map((s, i) => (
              <li key={s.title}>
                <Reveal className="h-full">
                  <div className="grid h-full grid-cols-[44px_minmax(0,1fr)] gap-x-3 rounded-lg border border-line bg-card px-[18px] py-4 md:flex md:flex-col md:gap-2.5 md:px-5 md:py-5">
                    <p className="text-[22px] font-bold leading-tight text-accent md:text-[28px]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <h3 className="font-bold">{s.title}</h3>
                      <p className="mt-1.5 text-sm text-muted">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Band>

        {/* 相談する */}
        <Band id="contact" tone="card">
          <div className="grid gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-start md:gap-14">
            <SectionHeading
              label="相談する"
              note="まだ形になっていない段階のご相談で構いません。「これは自動化できるのか」を聞くだけでも大丈夫です。"
            />

            <div className="space-y-5">
              {hasLine && (
                <div className="rounded-lg border border-accent/40 bg-accent-soft p-5 sm:p-7">
                  <h3 className="font-bold">LINEで送る（いちばん早いです）</h3>
                  <p className="mt-2 text-[15px] text-muted">
                    友だち追加して、そのままトークにお送りください。
                  </p>
                  <a
                    href={LINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block rounded bg-accent px-6 py-3.5 text-center font-bold text-white"
                  >
                    LINEで相談する
                  </a>
                </div>
              )}

              {hasForm && (
                <form
                  action={`https://formspree.io/f/${FORMSPREE_ID}`}
                  method="POST"
                  className="rounded-lg border border-line bg-card p-5 sm:p-8"
                >
                  <h3 className="font-bold">フォームから送る</h3>
                  <div className="mt-5 space-y-4">
                    <label className="block">
                      <span className="text-sm font-bold">お名前</span>
                      <input
                        type="text"
                        name="name"
                        required
                        className="mt-1.5 w-full rounded border border-line bg-background px-3 py-2.5"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold">メールアドレス</span>
                      <input
                        type="email"
                        name="email"
                        required
                        className="mt-1.5 w-full rounded border border-line bg-background px-3 py-2.5"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold">ご相談の内容</span>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        placeholder="例：毎月◯時間かけている集計作業を減らせないか相談したい"
                        className="mt-1.5 w-full rounded border border-line bg-background px-3 py-2.5"
                      />
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="mt-5 w-full rounded bg-accent px-6 py-3.5 font-bold text-white"
                  >
                    送信する
                  </button>
                  <p className="mt-3 text-xs text-muted">
                    {profile.availability}
                    お返事までお時間をいただくことがあります。
                  </p>
                </form>
              )}
            </div>
          </div>
        </Band>
      </main>

      <footer className="mx-auto max-w-5xl border-t border-line px-5 pb-10 pt-6 text-xs text-muted sm:px-8">
        <p>
          {profile.name}／{profile.brand}（{profile.area}）
        </p>
      </footer>
    </>
  );
}
