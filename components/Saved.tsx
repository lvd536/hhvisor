"use client";
import { useSavedStore } from "@/stores/useSavedStore";
import JobCard from "./JobCard/JobCard";

export default function Saved() {
    const { savedVacancies } = useSavedStore();
    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full flex flex-col">
                <h1
                    className="font-bold text-5xl mb-0 my-8"
                    style={{ letterSpacing: "-0.05em" }}
                >
                    Saved
                </h1>
                <h2
                    className="font-medium text-md text-muted-foreground"
                    style={{ lineHeight: "156%" }}
                >
                    {
                        "Track, edit, and save the vacancies you're interested in."
                    }
                </h2>
            </div>
            <div className="flex flex-col items-start gap-2 mt-10 w-full">
                {savedVacancies && savedVacancies.length > 0 ? (
                    savedVacancies.map((vacancy) => (
                        <JobCard vacancy={vacancy} key={vacancy.id} />
                    ))
                ) : (
                    <p className="w-full text-medium text-secondary text-center">
                        You have no saved data.
                    </p>
                )}
            </div>
        </div>
    );
}
