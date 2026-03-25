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

export type KeyWordType = {
    keyword: string;
    count: number;
    percentage: string;
};
