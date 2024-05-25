import {create} from 'zustand'

export const useMusicPlayed = create((set) => ({
    musicPlayed: {
        title: null,
        url: null,
    },
    isMusicPlayed: false,
    setMusicPlayed: (musicPlayed) => set({musicPlayed: musicPlayed}),
    setIsMusicPlayed: (isMusicPlayed) => set({isMusicPlayed: isMusicPlayed})
}))