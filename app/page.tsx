import {
  LINE_URL,
  FORMSPREE_ID,
  hasLine,
  hasForm,
  hero,
  capabilities,
  liveWorks,
  caseWorks,
  profile,
  type Work,
} from "./content";

function WorkCard({
  work,
  problemLabel = "想定した困りごと",
}: {
  work: Work;
  problemLabel?: string;
}) {
  return (
    <article
      id={work.id}
      className={`scroll-mt-6 rounded-lg border bg-card p-5 sm:p-7 ${
        work.featured ? "border-accent/40 shadow-sm" : "border-line"
      }`}
    >
      {work.kicker && (
        <p className="mb-3 inline-block rounded bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent sm:text-sm">
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

      <dl className="mt-5 space-y-4 text-[15px] sm:text-base">
        <div>
          <dt className="text-sm font-bold text-accent">{problemLabel}</dt>
          <dd className="mt-1 text-muted">{work.problem}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-accent">作ったもの</dt>
          <dd className="mt-1">{work.built}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-accent">結果</dt>
          <dd className="mt-1 font-medium">{work.result}</dd>
        </div>
      </dl>

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

      <p className="mt-5 border-t border-line pt-3 text-xs text-muted">
        使った技術：{work.tech}
      </p>
    </article>
  );
}

function SectionHeading({
  label,
  note,
}: {
  label: string;
  note?: string;
}) {
  return (
    <div className="mb-7">
      <h2 className="text-xl font-bold sm:text-2xl">{label}</h2>
      {note && <p className="mt-2 text-sm text-muted">{note}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      {/* ヒーロー */}
      <section>
        <h1 className="whitespace-pre-line text-[25px] font-bold leading-[1.55] sm:text-4xl">
          {hero.headline}
        </h1>
        <p className="mt-6 whitespace-pre-line text-[15px] text-muted sm:text-base">
          {hero.sub}
        </p>
        <p className="mt-7 border-l-4 border-accent bg-accent-soft py-3 pl-4 pr-3 text-[15px] font-bold text-accent sm:text-base">
          {hero.badge}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {hasLine && (
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-accent px-6 py-3.5 text-center font-bold text-white"
            >
              LINEで相談する
            </a>
          )}
          <a
            href="#contact"
            className={`rounded px-6 py-3.5 text-center font-bold ${
              hasLine
                ? "border border-accent text-accent"
                : "bg-accent text-white"
            }`}
          >
            相談してみる
          </a>
        </div>
      </section>

      {/* できること */}
      <section className="mt-20">
        <SectionHeading
          label="できること"
          note="ご相談の入口です。当てはまりそうなものを押すと、実際に作ったものが見られます。"
        />
        <ul className="space-y-4">
          {capabilities.map((c) => (
            <li key={c.title}>
              <a
                href={`#${c.anchor}`}
                className={`block rounded-lg border p-5 ${
                  c.lead
                    ? "border-accent/40 bg-accent-soft"
                    : "border-line bg-card"
                }`}
              >
                <h3 className="font-bold">{c.title}</h3>
                <p className="mt-2 text-[15px] text-muted">{c.body}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* 実績・第1部 */}
      <section className="mt-20">
        <SectionHeading
          label="自分で作って、実際に使われているもの"
          note="自分の業務のために作り、いまも動いているものです。"
        />
        <div className="space-y-5">
          {liveWorks.map((w) => (
            <WorkCard key={w.id} work={w} problemLabel="困っていたこと" />
          ))}
        </div>
      </section>

      {/* 実績・第2部 */}
      <section className="mt-16">
        <SectionHeading
          label="講座の課題として制作したもの"
          note="実際の依頼ではなく、想定した困りごとをもとに一から実装したものです。仕組みはすべて動く状態で作っています。"
        />
        <div className="space-y-5">
          {caseWorks.map((w) => (
            <WorkCard key={w.id} work={w} />
          ))}
        </div>
      </section>

      {/* プロフィール */}
      <section className="mt-20">
        <SectionHeading label="プロフィール" />
        <div className="rounded-lg border border-line bg-card p-5 sm:p-7">
          <p className="text-lg font-bold sm:text-xl">
            {profile.name}
            <span className="ml-2 text-sm font-normal text-muted">
              {profile.reading}
            </span>
          </p>
          <p className="mt-1 text-sm text-muted">
            {profile.brand}／{profile.area}
          </p>
          <div className="mt-5 space-y-4 text-[15px] sm:text-base">
            {profile.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-6 space-y-3 border-t border-line pt-5 text-[15px] font-medium sm:text-base">
            {profile.closing.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted">{profile.availability}</p>
        </div>
      </section>

      {/* 相談する */}
      <section id="contact" className="mt-20 scroll-mt-6">
        <SectionHeading
          label="相談する"
          note="まだ形になっていない段階のご相談で構いません。「これは自動化できるのか」を聞くだけでも大丈夫です。"
        />

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
          className={`rounded-lg border border-line bg-card p-5 sm:p-7 ${hasLine ? "mt-5" : ""}`}
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
      </section>

      <footer className="mt-20 border-t border-line pt-6 text-xs text-muted">
        <p>
          {profile.name}／{profile.brand}（{profile.area}）
        </p>
      </footer>
    </main>
  );
}
