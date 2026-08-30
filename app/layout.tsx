import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "押田竜太 / RyuWorks｜毎日くり返している手作業を、やらなくていい形にします",
  description:
    "宮崎県で畜産の現場に18年。現場を知ったうえで、LINE・Slack・Googleと業務をつなぐ仕組みを自分で作ります。自作の繁殖管理アプリは県内の畜産農家2戸で稼働中。",
  openGraph: {
    title: "押田竜太 / RyuWorks",
    description:
      "毎日くり返している手作業を、やらなくていい形にします。宮崎県／畜産の現場に18年。",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
