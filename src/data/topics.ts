import { guide, locales, pathForLocale, type Locale } from "./guide";
import type { TopicContent } from "./types";
import { enTopics } from "./topics/en";
import { msTopics } from "./topics/ms";
import { zhTopics } from "./topics/zh-CN";

/** Locale-keyed topic content. Each slug is authored independently per locale. */
const byLocale: Record<Locale, Record<string, TopicContent>> = {
  ms: msTopics,
  "zh-CN": zhTopics,
  en: enTopics,
};

/**
 * Full planned long-tail cluster (32 slugs across 5 categories). Pages are only
 * generated for a locale once that slug has content in that locale, so the build
 * stays clean while the cluster is rolled out incrementally.
 *
 * 1. Understanding (6): history-and-architecture, five-domes-symbolism, photography-guide,
 *    visiting-hours-etiquette, accessibility-guide, best-time-to-visit
 * 2. Dining near (8): restaurants-near-zahir-mosque, cafes-near-zahir-mosque,
 *    breakfast-near-zahir-mosque, dinner-supper-near-zahir-mosque, aman-central-dining-guide,
 *    halal-food-alor-setar, traditional-kedah-cuisine, nasi-kandar-alor-setar
 * 3. Heritage & nearby (8): alor-setar-heritage-trail-walk, balai-nobat, balai-besar,
 *    istana-pelamin, menara-alor-setar, pekan-rabu, kedah-royal-museum, paddy-museum-kedah
 * 4. Itineraries & stay (5): half-day-itinerary, one-day-alor-setar-itinerary,
 *    where-to-stay-alor-setar, family-visit-guide, how-to-get-to-zahir-mosque
 * 5. Practical/seasonal (5): nearby-mosques-alor-setar, getting-around-alor-setar,
 *    weather-alor-setar, events-at-masjid-zahir, map-location
 */
export const plannedTopicSlugs = [
  "history-and-architecture", "five-domes-symbolism", "photography-guide", "visiting-hours-etiquette", "accessibility-guide", "best-time-to-visit",
  "restaurants-near-zahir-mosque", "cafes-near-zahir-mosque", "breakfast-near-zahir-mosque", "dinner-supper-near-zahir-mosque", "aman-central-dining-guide", "halal-food-alor-setar", "traditional-kedah-cuisine", "nasi-kandar-alor-setar",
  "alor-setar-heritage-trail-walk", "balai-nobat", "balai-besar", "istana-pelamin", "menara-alor-setar", "pekan-rabu", "kedah-royal-museum", "paddy-museum-kedah",
  "half-day-itinerary", "one-day-alor-setar-itinerary", "where-to-stay-alor-setar", "family-visit-guide", "how-to-get-to-zahir-mosque",
  "nearby-mosques-alor-setar", "getting-around-alor-setar", "weather-alor-setar", "events-at-masjid-zahir", "map-location",
];

export function getTopic(locale: Locale, slug: string): TopicContent | undefined {
  return byLocale[locale][slug];
}

/** Slugs that actually have content in the given locale (drives route generation). */
export function topicSlugsForLocale(locale: Locale): string[] {
  return plannedTopicSlugs.filter((slug) => Boolean(byLocale[locale][slug]));
}

/** URL path for a topic in a locale: ms at root, en/zh-CN prefixed. */
export function topicPathForLocale(locale: Locale, slug: string): string {
  return locale === "ms" ? `/${slug}/` : `/${locale}/${slug}/`;
}

/** hreflang alternates for a topic (only locales that have the topic). */
export function topicAlternates(slug: string): { lang: string; href: string }[] {
  return locales
    .filter((locale) => Boolean(byLocale[locale][slug]))
    .map((locale) => ({ lang: guide[locale].htmlLang, href: topicPathForLocale(locale, slug) }));
}
