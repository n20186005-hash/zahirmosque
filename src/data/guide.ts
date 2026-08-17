import { en } from "./en";
import { ms } from "./ms";
import { zhCN } from "./zh-CN";
import type { Locale } from "./types";

export const locales: Locale[] = ["ms", "zh-CN", "en"];
export { type Locale, type GuideContent } from "./types";
export const guide = { ms, "zh-CN": zhCN, en };
export function pathForLocale(locale: Locale) { return locale === "ms" ? "/" : `/${locale}/`; }

