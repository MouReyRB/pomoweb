'use client'

import Menus from "@/components/menus";
import {useGlobalColor} from "@/store/background";
import {useEffect, useState} from "react";
import {useAudioPlayer} from "@/store/audio-player";
import MusicPlayer from "@/components/music-player";
import Pomodoro from "@/components/pomodoro";
import {useRecomendations} from "@/store/recomendations";
import {useMusicPlayed} from "@/store/music-played";

const Home = () => {
    const globalColor = useGlobalColor((state) => state.globalColor)
    const recomendations = useRecomendations((state) => state.recomendations)
    const choosedRecomendation = useRecomendations((state) => state.choosedRecomendation)
    const isMusicPlayed = useMusicPlayed((state) => state.isMusicPlayed)

    const [focusLength, setFocusLength] = useState({
        label: recomendations[choosedRecomendation].value[0].label,
        value: recomendations[choosedRecomendation].value[0].value
    })
    const [shortBreakLength, setShortBreakLength] = useState({
        label: recomendations[choosedRecomendation].value[1].label,
        value: recomendations[choosedRecomendation].value[1].value
    })
    const [longBreakLength, setLongBreakLength] = useState({
        label: recomendations[choosedRecomendation].value[2].label,
        value: recomendations[choosedRecomendation].value[2].value
    })
    const [isCounting, setIsCounting] = useState(false);
    const audioPlayer = useAudioPlayer((state) => state.audioPlayer)

    useEffect(() => {
        setFocusLength({
            label: recomendations[choosedRecomendation].value[0].label,
            value: recomendations[choosedRecomendation].value[0].value
        })

        setShortBreakLength({
            label: recomendations[choosedRecomendation].value[1].label,
            value: recomendations[choosedRecomendation].value[1].value
        })

        setLongBreakLength({
            label: recomendations[choosedRecomendation].value[2].label,
            value: recomendations[choosedRecomendation].value[2].value
        })
    }, [choosedRecomendation])

    return (
        <div
            className={`flex flex-col gap-5 justify-center items-center relative h-screen w-full text-white`}
            style={{backgroundColor: `#${globalColor}`}}
        >
            <Pomodoro
                focusLength={focusLength}
                shortBreakLength={shortBreakLength}
                longBreakLength={longBreakLength}
                isCounting={isCounting}
                setIsCounting={setIsCounting}
            />

            <Menus/>

            {
                audioPlayer && isMusicPlayed && (
                    <MusicPlayer/>
                )
            }
        </div>
    )
}

export default Home