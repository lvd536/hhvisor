import {
    CacheEntry,
    KeywordAnalyticsType,
    OverviewAnalyticsType,
} from "@/types/stores.types";

export const analyticsCache = new Map<
    string,
    CacheEntry<OverviewAnalyticsType | KeywordAnalyticsType>
>();

export const WORK_FORMAT_MAP: Record<string, string> = {
    HYBRID: "hybrid",
    REMOTE: "remote",
    ON_SITE: "on_site",
} as const;

export const ANALYTICS_CACHE_TTL = 5 * 60 * 1000;

export const DEFAULT_KEYWORDS = [
    "React",
    "Vue",
    "Angular",
    "TypeScript",
    "Node.js",
    "Next.js",
    "Tailwind",
    "Redux",
    "Zustand",
    "Docker",
    "PostgreSQL",
    "GraphQL",
] as const;
