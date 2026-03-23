import { create } from "zustand";

export type Experience =
    | "noExperience"
    | "between1And3"
    | "between3And6"
    | "moreThan6";

export type WorkFormat = "HYBRID" | "ON_SITE" | "REMOTE";

export type Salary = [number, number];

export interface IFilterStore {
    experience: Set<Experience>;
    workFormat: Set<WorkFormat>;
    salary: Salary;
    setExperience: (experience: Set<Experience>) => void;
    setWorkFormat: (workFormat: Set<WorkFormat>) => void;
    setSalary: (salary: Salary) => void;
}

export const useFilterStore = create<IFilterStore>((set) => ({
    experience: new Set([]),
    workFormat: new Set([]),
    salary: [0, 5000000],
    setExperience: (experience) => set({ experience }),
    setWorkFormat: (workFormat) => set({ workFormat }),
    setSalary: (salary) => set({ salary }),
}));
