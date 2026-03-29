import { IVacancy } from "@/types/api.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ISavedStore {
    savedVacancies: IVacancy[];
    setSavedVacancies: (vacancies: IVacancy[]) => void;
}

export const useSavedStore = create<ISavedStore>()(
    persist(
        (set) => ({
            savedVacancies: [],
            setSavedVacancies: (vacancies) =>
                set({ savedVacancies: vacancies }),
        }),
        {
            name: "savedStore",
        },
    ),
);
