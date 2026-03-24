import { IArea } from "@/types/api.types";
import { create } from "zustand";

interface IAreaStore {
    areas: IArea[];
    currentArea: number | null;
    setCurrentArea: (areaId: number | null) => void;
    initAreas: () => Promise<void>;
}

export const useAreaStore = create<IAreaStore>()((set) => ({
    areas: [],
    currentArea: null,
    setCurrentArea: (currentArea) => set({ currentArea }),
    initAreas: async () => {
        const resp = await fetch("/api/hh/areas");
        const areas = (await resp.json()) as IArea[];
        set({ areas });
    },
}));
