import {create} from 'zustand'

export const useRecomendations = create((set) => ({
    recomendations: [
        {
            label: "Belajar Pemrograman",
            value: [
                {
                    label: "Focus Length",
                    value: [45, 0]
                },
                {
                    label: "Short Break Length",
                    value: [10, 0]
                },
                {
                    label: "Long Break Length",
                    value: [15, 0]
                }
            ]
        },
        {
            label: "membaca Buku",
            value: [
                {
                    label: "Focus Length",
                    value: [30, 0]
                },
                {
                    label: "Short Break Length",
                    value: [5, 0]
                },
                {
                    label: "Long Break Length",
                    value: [15, 0]
                }
            ]
        },
        {
            label: "Belajar Bahasa",
            value: [
                {
                    label: "Focus Length",
                    value: [45, 0]
                },
                {
                    label: "Short Break Length",
                    value: [10, 0]
                },
                {
                    label: "Long Break Length",
                    value: [15, 0]
                }
            ]
        },
        {
            label: "Menonton Video Tutorial",
            value: [
                {
                    label: "Focus Length",
                    value: [50, 0]
                },
                {
                    label: "Short Break Length",
                    value: [5, 0]
                },
                {
                    label: "Long Break Length",
                    value: [15, 0]
                }
            ]
        }
    ],
    choosedRecomendation: 0,
    setChoosedRecomendation: (choosedRecomendation) => set({choosedRecomendation: choosedRecomendation}),
}))