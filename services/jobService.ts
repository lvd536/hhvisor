import {
    ANALYTICS_CACHE_TTL,
    analyticsCache,
    WORK_FORMAT_MAP,
} from "@/consts/jobStore";
import { IFilterStore } from "@/stores/useFilterStore";
import {
    DictionariesResponse,
    IVacancy,
    IVacancyResponse,
} from "@/types/api.types";
import {
    CurrenciesMap,
    KeywordAnalyticsType,
    OverviewAnalyticsType,
} from "@/types/stores.types";

interface CacheEntry<T> {
    data: T;
    ts: number;
}

export async function getCurrencies() {
    const response = await fetch("/api/hh/dictionaries");
    const dictionaries = (await response.json()) as DictionariesResponse;

    if (!dictionaries) {
        throw new Error("Failed to get dictionaries. Try again later");
    }

    const currencies = dictionaries.currency.reduce(
        (acc, currency) => {
            acc[currency.code] = {
                rate: currency.rate,
                abbr: currency.abbr,
                name: currency.name,
            };

            return acc;
        },
        {} as Record<
            string,
            {
                rate: number;
                abbr: string;
                name: string;
            }
        >,
    );

    return currencies;
}

export function normalizeSalary(
    salary: IVacancy["salary"],
    currencies: CurrenciesMap,
    targetCurrency = "RUR",
) {
    const normalize = (value: number, currency: string) => {
        const fromCurrency = currencies[currency];
        const toCurrency = currencies[targetCurrency];

        if (!fromCurrency || !toCurrency) {
            throw new Error(`Unknown currency: ${currency}`);
        }

        const valueInRub = value / fromCurrency.rate;
        return Math.round(valueInRub * toCurrency.rate);
    };

    return {
        from:
            salary?.from != null
                ? normalize(salary.from, salary.currency)
                : null,
        to: salary?.to != null ? normalize(salary.to, salary.currency) : null,
        currency: targetCurrency,
    };
}

export function getSalaryValue(
    salary: IVacancy["salary"],
    currencies: CurrenciesMap,
): number | null {
    if (!salary) return null;

    const { from, to } = normalizeSalary(salary, currencies);

    if (from && to) return (from + to) / 2;
    if (from) return from;
    if (to) return to;

    return null;
}

export function getAverageSalary(
    items: IVacancyResponse["items"],
    currencies: CurrenciesMap,
): number {
    const values = items
        .map((i) => getSalaryValue(i.salary, currencies))
        .filter((v): v is number => v !== null);

    return values.length
        ? values.reduce((a, b) => a + b, 0) / values.length
        : 0;
}

export function getSalaryDistribution(
    items: IVacancy[],
    currencies: CurrenciesMap,
) {
    const result: KeywordAnalyticsType["salaryDistribution"] = [];

    const targetValues = [0, 30000, 80000, 120000, 160000, 200000, 400000];

    const itemsSalaries = items.map((item) => {
        const value = getSalaryValue(item.salary, currencies);
        return value ?? 0;
    });

    targetValues.forEach((value, index, arr) => {
        let jobsCount = 0;

        if (index === 0) {
            jobsCount = itemsSalaries.reduce((acc, salary) => {
                return salary < arr[index + 1] ? acc + 1 : acc;
            }, 0);
        } else if (index === arr.length - 1) {
            jobsCount = itemsSalaries.filter((s) => s > arr[index - 1]).length;
        } else {
            jobsCount = itemsSalaries.reduce((acc, salary) => {
                return salary > arr[index - 1] && salary <= value
                    ? acc + 1
                    : acc;
            }, 0);
        }

        result.push({
            name: `RUR${value}`,
            jobsCount,
        });
    });

    return result;
}

export async function fetchAllVacancies(
    query: string,
    area: number | null,
    ranges: {
        from: string;
        to: string;
        daysInMonth: number;
    },
    filters?: IFilterStore,
): Promise<{ allItems: IVacancy[]; firstData: IVacancyResponse }> {
    const params = new URLSearchParams();

    if (query) {
        params.append("text", query);
    }

    if (area) {
        params.append("area", area.toString());
    }

    filters?.experience.forEach((exp) => {
        params.append("experience", exp);
    });

    filters?.workFormat.forEach((format) => {
        params.append("work_format", WORK_FORMAT_MAP[format].toUpperCase());
    });

    params.append("per_page", "100");
    params.append("date_from", ranges.from);
    params.append("date_to", ranges.to);
    params.append("only_with_salary", "true");

    const firstRes = await fetch(`/api/hh/vacancies?${params}`);
    const firstData = (await firstRes.json()) as IVacancyResponse;
    const allItems = [...(firstData.items ?? [])];
    const totalPages = firstData.pages ?? 1;

    const rest = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, i) => {
            const p = new URLSearchParams(params);
            p.set("page", (i + 1).toString());
            return fetch(`/api/hh/vacancies?${p}`).then(
                (r) => r.json() as Promise<IVacancyResponse>,
            );
        }),
    );

    rest.forEach((page) => allItems.push(...(page.items ?? [])));
    return { allItems, firstData };
}

export function makeCacheKey(
    type: "overview" | "keyword",
    query: string,
    area: number | null,
    filters?: IFilterStore,
): string {
    return JSON.stringify({ type, query, area, filters });
}

export function getFromCache<T>(key: string): T | null {
    const entry = analyticsCache.get(key) as CacheEntry<T> | undefined;
    if (!entry) return null;
    if (Date.now() - entry.ts > ANALYTICS_CACHE_TTL) {
        analyticsCache.delete(key);
        return null;
    }
    return entry.data;
}

export function setToCache<
    T extends OverviewAnalyticsType | KeywordAnalyticsType,
>(key: string, data: T): void {
    analyticsCache.set(key, { data, ts: Date.now() });
}

export function buildKeywordStats(
    items: IVacancy[],
    keywords: string[],
): Array<{ keyword: string; count: number; percentage: string }> {
    return keywords.map((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "i");
        let count = 0;

        items.forEach((job) => {
            const text = `${job.name} ${job.snippet?.requirement ?? ""} ${job.snippet?.responsibility ?? ""}`;
            if (regex.test(text)) count++;
        });

        return {
            keyword,
            count,
            percentage: items.length
                ? ((count / items.length) * 100).toFixed(1)
                : "0.0",
        };
    });
}
