import {create} from 'zustand'

export const useGlobalColor = create((set) => ({
    globalColor: "FE5760",
    setGlobalColor: (color) => set({globalColor: color})
}))