import { useKeywordAnalytics } from "@/hooks/useKeywordAnalytics";
import DemandVelocityCard from "./DemandVelocityCard";
import KeywordHeader from "./KeywordHeader";
import RelatedExpertiseCard from "./RelatedExpertiseCard";
import SalaryDistributionCard from "./SalaryDistributionCard";
import TopTechnologiesCard from "./TopTechnologiesCard";

export default function Keyword() {
    const { keywordAnalytics, loading } = useKeywordAnalytics();

    return (
        <div className="size-full flex-1 px-4 py-6 sm:px-6">
            <KeywordHeader />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <DemandVelocityCard
                    data={keywordAnalytics?.demandVelocity}
                    loading={loading}
                />

                <TopTechnologiesCard
                    data={keywordAnalytics?.topWords}
                    loading={loading}
                />

                <SalaryDistributionCard
                    data={keywordAnalytics?.salaryDistribution}
                    loading={loading}
                />

                <RelatedExpertiseCard
                    data={keywordAnalytics?.topWords}
                    loading={loading}
                />
            </div>
        </div>
    );
}
