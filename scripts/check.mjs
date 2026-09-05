// 公開前チェック。問い合わせ手段がゼロのまま公開するのを止める。
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../app/content.ts", import.meta.url), "utf8");
const line = /export const LINE_URL = "(.*?)"/.exec(src)?.[1] ?? "";
const form = /export const FORMSPREE_ID = "(.*?)"/.exec(src)?.[1] ?? "";

const hasLine = !line.includes("PLACEHOLDER");
const hasForm = !form.includes("PLACEHOLDER");

console.log(`LINE     : ${hasLine ? "✅ " + line : "❌ 未設定（サイトに表示されません）"}`);
console.log(`フォーム : ${hasForm ? "✅ " + form : "❌ 未設定（サイトに表示されません）"}`);

if (!hasLine && !hasForm) {
  console.error(
    "\n公開できません。問い合わせ手段がひとつもありません。\n" +
      "app/content.ts の LINE_URL か FORMSPREE_ID のどちらかを埋めてください。\n" +
      "手順: ~/Projects/案件応募/2026-08-30_LINE公式アカウント開設手順.md",
  );
  process.exit(1);
}
console.log("\n公開できます。");
