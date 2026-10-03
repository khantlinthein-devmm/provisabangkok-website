import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Cinzel,
  Cormorant_Garamond,
  Jost,
  Noto_Sans_Thai,
  Noto_Serif_KR,
  Noto_Serif_SC,
  Noto_Serif_Thai,
} from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatButtons from "@/components/ChatButtons";
import { site } from "@/lib/site";
import { getDictionary, isLocale, localeInfo, locales, type Locale } from "@/i18n";
import { alternates } from "@/lib/seo";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
const body = Jost({ variable: "--font-body", subsets: ["latin", "cyrillic"] });
// Cinzel echoes the flared capitals of the logo; used for the wordmark only.
const brand = Cinzel({ variable: "--font-brand", subsets: ["latin"] });

// Fonts for scripts the Latin fonts don't cover. Only the current language's font is applied.
const thaiDisplay = Noto_Serif_Thai({ variable: "--font-display-alt", subsets: ["thai"], weight: ["400", "500", "600"] });
const thaiBody = Noto_Sans_Thai({ variable: "--font-body-alt", subsets: ["thai"], weight: ["400", "500", "600"] });
const zhDisplay = Noto_Serif_SC({ variable: "--font-display-alt", subsets: ["latin"], weight: ["500"], preload: false });
const koDisplay = Noto_Serif_KR({ variable: "--font-display-alt", subsets: ["latin"], weight: ["500"], preload: false });

const scriptFonts: Partial<Record<Locale, string>> = {
  th: `${thaiDisplay.variable} ${thaiBody.variable}`,
  zh: zhDisplay.variable,
  ko: koDisplay.variable,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(props: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s | ${site.name}` },
    description: dict.meta.description,
    openGraph: {
      siteName: site.name,
      type: "website",
      locale: isLocale(lang) ? localeInfo[lang].ogLocale : "en_US",
    },
    alternates: alternates(isLocale(lang) ? lang : "en", "/"),
  };
}

export default async function RootLayout(props: LayoutProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html
      lang={localeInfo[lang].htmlLang}
      className={`${display.variable} ${body.variable} ${brand.variable} ${scriptFonts[lang] ?? ""} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Header lang={lang} nav={dict.nav} />
        <main className="flex-1">{props.children}</main>
        <Footer lang={lang} dict={dict} />
        <ChatButtons />
      </body>
    </html>
  );
}
