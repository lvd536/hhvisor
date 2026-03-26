export type OverviewAnalyticsType = {
    salaryTrends: Array<{
        name: string;
        salary: number;
    }> | null;
    jobsCount: number;
    topWord: KeyWordType;
    topWords: KeyWordType[];
    avgSalary: number;
};

export type KeywordAnalyticsType = {
    salaryDistribution: Array<{
        name: string;
        jobsCount: number;
    }> | null;
    demandVelocity: Array<{
        name: string;
        vacanciesCount: number;
    }> | null;
    topWords: KeyWordType[];
};

export type KeyWordType = {
    keyword: string;
    count: number;
    percentage: string;
};
