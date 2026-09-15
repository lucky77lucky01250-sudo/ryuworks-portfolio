/**
 * 数字を0から数え上げる。CSSだけで動くので、JSの読み込みを待たずに最初の表示から動き出す
 * （JSで数えると「18 → 0 → 18」と一瞬ちらつく）。読み上げ・検索用の数字は別に置く。
 */
export default function CountUp({ value }: { value: number }) {
  return (
    <>
      <span
        aria-hidden
        className="count-up tabular-nums"
        style={{ "--to": value } as React.CSSProperties}
      />
      <span className="sr-only">{value}</span>
    </>
  );
}
