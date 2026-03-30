type TopWord = {
    keyword: string;
    percentage: string | number;
};

type Props = {
    topWords?: TopWord[];
};

export default function OverviewTopTechnologies({ topWords }: Props) {
    return (
        <div className="rounded-[8px] p-8 bg-card border border-secondary w-full md:w-[380px]">
            <p className="font-bold text-[14px] text-[#64748b] tracking-widest uppercase mb-6">
                Top Required Technologies
            </p>

            <div className="flex flex-col gap-5">
                {topWords?.length
                    ? topWords.map((word, index) => {
                          const percent = Number(word.percentage);

                          return (
                              <div key={`${word.keyword}-${index}`}>
                                  <div className="flex items-center justify-between">
                                      <p className="font-bold text-[12px] leading-[133%]">
                                          {word.keyword}
                                      </p>
                                      <p className="text-[10px] text-[#60a5fa] leading-normal">
                                          {percent}%
                                      </p>
                                  </div>
                                  <div className="relative w-full h-1 bg-secondary rounded-full mt-2">
                                      <div
                                          className="bg-ring rounded-full h-full"
                                          style={{ width: `${percent}%` }}
                                      />
                                  </div>
                              </div>
                          );
                      })
                    : "Loading..."}
            </div>
        </div>
    );
}
