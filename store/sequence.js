import {create} from 'zustand'

export const useSequence = create((set) => ({
    sequence: false,
    setSequence: (sequence) => set({sequence: sequence})
}))