import Image from "next/image";
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
  type Work,
} from "./content";
import Reveal from "./components/Reveal";
import CountUp from "./components/CountUp";
import WorkDetails from "./components/WorkDetails";

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
          {assumed ? "導入後" : "いま"}
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
        work.images.every((img) => img.h > img.w) ? "grid-cols-2" : "grid-cols-1"
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

function WorkBody({ work, problemLabel }: { work: Work; problemLabel: string }) {
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
        <p className="text-sm font-bold text-accent">結果</p>
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

/** 第1部：実際に動いているもの */
function LiveWorkCard({ work }: { work: Work }) {
  const hasImages = !!work.images?.length;
  return (
    <article
      id={work.id}
      className={`scroll-mt-20 space-y-4 rounded-lg border bg-card p-5 sm:p-8 ${
        work.featured ? "border-accent/40 shadow-sm" : "border-line"
      }`}
    >
      <div
        className={
          hasImages
            ? "grid gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-start md:gap-10"
            : ""
        }
      >
        <div className="space-y-4">
          {work.kicker && (
            <p className="inline-block rounded bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent sm:text-sm">
              {work.kicker}
            </p>
          )}
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
            assumed={false}
            size="lg"
          />
          <p className="text-[15px] sm:text-base">{work.summary}</p>
        </div>
        <WorkImages work={work} />
      </div>
      <WorkDetails>
        <WorkBody work={work} problemLabel="困っていたこと" />
      </WorkDetails>
    </article>
  );
}

/** 第2部：業種別のモデルケース */
function CaseWorkCard({ work }: { work: Work }) {
  return (
    <article
      id={work.id}
      className="scroll-mt-20 space-y-3.5 rounded-lg border border-line bg-card p-5 sm:p-6"
    >
      <h3 className="text-[17px] font-bold sm:text-lg">{work.title}</h3>
      <BeforeAfter
        before={work.before}
        after={work.after}
        assumed
        size="md"
      />
      <p className="text-sm text-muted sm:text-[15px]">{work.summary}</p>
      <WorkDetails>
        <WorkBody work={work} problemLabel="想定した困りごと" />
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

export default function Home() {
  const primaryCta = hasLine ? LINE_URL : "#contact";
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-8">
          <p className="text-sm font-bold sm:text-base">
            押田竜太<span className="font-normal text-muted"> / {profile.brand}</span>
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

      <main className="mx-auto w-full max-w-5xl px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-16">
        {/* ヒーロー（ここは動かさない。開いた瞬間に全部見えている） */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)] md:items-center md:gap-14">
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
        </section>

        {/* できること */}
        <Reveal className="mt-20 sm:mt-28">
          <section>
            <SectionHeading
              label="できること"
              note="当てはまりそうなものを押すと、実際に作ったものへ進めます。"
            />
            <ul className="grid gap-3 md:grid-cols-2">
              {capabilities.map((c) => (
                <li key={c.title}>
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
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* 実績・第1部 */}
        <section id="works" className="mt-20 scroll-mt-20 sm:mt-28">
          <Reveal>
            <SectionHeading
              label={"自分で作って、\n実際に使われているもの"}
              note="自分の業務のために作り、いまも動いているものです。"
            />
          </Reveal>
          <div className="space-y-5">
            {liveWorks.map((w) => (
              <Reveal key={w.id}>
                <LiveWorkCard work={w} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* 実績・第2部 */}
        <section className="mt-16 sm:mt-24">
          <Reveal>
            <SectionHeading
              label="業種別のモデルケース"
              note="実際のご依頼ではなく、よくある困りごとを想定して一から作り、動かして確かめたものです。"
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {caseWorks.map((w) => (
              <Reveal key={w.id}>
                <CaseWorkCard work={w} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* なぜ作るのか */}
        <Reveal className="mt-20 sm:mt-28">
          <section id="why" className="max-w-3xl scroll-mt-20">
            <SectionHeading label={why.heading} />
            <p className="whitespace-pre-line text-[19px] font-bold leading-[1.7] text-accent sm:text-[22px]">
              {why.lead}
            </p>
            <div className="mt-5 space-y-4 text-[15px] leading-[1.95] sm:text-base">
              {why.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-6 border-t border-line pt-4">
              <p className="text-lg font-bold">
                {profile.name}
                <span className="ml-2 text-sm font-normal text-muted">
                  {profile.reading}
                </span>
              </p>
              <p className="mt-0.5 text-sm text-muted">
                {profile.brand}／{profile.area}　{profile.availability}
              </p>
            </div>
          </section>
        </Reveal>

        {/* 進め方 */}
        <section id="steps" className="mt-20 scroll-mt-20 sm:mt-28">
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
        </section>

        {/* 相談する */}
        <section
          id="contact"
          className="mt-20 grid scroll-mt-20 gap-6 sm:mt-28 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-start md:gap-14"
        >
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
                  {profile.availability}お返事までお時間をいただくことがあります。
                </p>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-5xl border-t border-line px-5 pb-10 pt-6 text-xs text-muted sm:px-8">
        <p>
          {profile.name}／{profile.brand}（{profile.area}）
        </p>
      </footer>
    </>
  );
}
