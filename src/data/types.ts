/** Shared contract for a complete, self-contained locale. */
export type Locale = "ms" | "zh-CN" | "en";
export type GuideContent = {
  htmlLang: string; ogLocale: string; mapLocale: string; languageName: string; languageShort: string;
  title: string; description: string; skip: string;
  nav: { history: string; visit: string; directions: string; nearby: string; map: string };
  hero: { location: string; lead: string; emphasis: string; tail: string; body: string; plan: string; history: string; photoAlt: string; caption: string; note: string };
  facts: { label: string; value: string; description: string }[];
  history: { side: string; eyebrow: string; title: string; p1: string; p2: string; photoAlt: string; timeline: string };
  visit: { eyebrow: string; lead: string; emphasis: string; tail: string; body: string; cards: { title: string; body: string }[] };
  directions: { side: string; eyebrow: string; title: string; body: string; items: { icon: string; title: string; body: string }[] };
  map: { eyebrow: string; title: string; body: string; iframeTitle: string };
  nearby: { eyebrow: string; title: string; body: string; cards: { label: string; title: string; body: string }[] };
  faq: { eyebrow: string; title: string; body: string; items: { question: string; answer: string }[] };
  citations: { title: string; links: { name: string; url: string }[] };
  footer: { disclaimer: string; sources: string; photoCredit: string };
};

/** Contract for a single long-tail topic page (clustered under the main guide). */
export type TopicContent = {
  /** Locale-neutral slug, e.g. "history-and-architecture". */
  slug: string;
  /** Small label above the H1, e.g. "ALOR SETAR · KEDAH". */
  eyebrow: string;
  /** H1 for the topic page. */
  title: string;
  /** Title tag, under 60 characters. */
  metaTitle: string;
  /** Meta description, under 155 characters. */
  metaDescription: string;
  /** Opening paragraph / lede. */
  intro: string;
  /** Logistics-first snapshot box (facts shown near the top). */
  snapshot: { label: string; value: string }[];
  /** Deep-dive body sections. */
  sections: { heading: string; body: string }[];
  /** Structured FAQ items. */
  faq: { question: string; answer: string }[];
  /** Slugs of related topics for internal linking (filtered by availability). */
  related: string[];
};
