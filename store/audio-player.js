import {create} from 'zustand'

export const useAudioPlayer = create((set) => ({
    audioPlayer: null,
    setAudioPlayer: (audioPlayer) => set({audioPlayer: audioPlayer})
}))