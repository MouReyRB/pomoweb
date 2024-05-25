'use client'

import Menus from "@/components/menus";
import {useGlobalColor} from "@/store/background";
import {useEffect, useState} from "react";
import {useAudioPlayer} from "@/store/audio-player";
import MusicPlayer from "@/components/music-player";
import Pomodoro from "@/components/pomodoro";
import {useRecomendations} from "@/store/recomendations";
import {useMusicPlayed} from "@/store/music-played";
import {Icon} from "@iconify/react";

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
        <div>
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

                <Menus
                    focusLength={focusLength}
                    shortBreakLength={shortBreakLength}
                    longBreakLength={longBreakLength}
                    setFocusLength={setFocusLength}
                    setShortBreakLength={setShortBreakLength}
                    setLongBreakLength={setLongBreakLength}
                />

                {
                    audioPlayer && isMusicPlayed && (
                        <MusicPlayer/>
                    )
                }
            </div>
            <div className="text-white text-lg font-bold p-10 w-full grid grid-cols-2 gap-10"
                 style={{backgroundColor: `#${globalColor}`}}>
                <div className="space-y-10">
                    <div className="space-y-2">
                        <h1 className="text-3xl">What is pomodoro?</h1>
                        <p>This time management solution was developed by a college student named Francesco Cirillo in
                            the 1980s. Based on various time intervals set throughout the day, the name of this
                            technique comes from the Italian word for "tomato," referring to a tomato-shaped timer that
                            Cirillo himself used while perfecting his time management method.</p>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl">What is mypomoweb?</h1>
                        <p>Mypomoweb is a Pomodoro website that you can use according to your preferences, as it allows
                            for customization. This website can be used on both desktop and mobile browsers. Its goal is
                            to help you stay more focused on your activities and assist you in managing your time
                            effectively.</p>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl">how to use mypomoweb ?</h1>
                        <p>You can use this website to help you implement the Pomodoro technique. This website also
                            offers several features that can assist you.</p>
                    </div>
                </div>
                <div className="space-y-10 flex flex-col justify-center">
                    <div className="flex gap-5">
                        <div className="p-2 rounded-lg bg-secondary aspect-square w-min h-min">
                            <Icon
                                icon={"material-symbols-light:alarm-rounded"} className="text-2xl"
                                style={{color: `#${globalColor}`}}
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Time</h1>
                            <p>You can set your own Pomodoro time using this feature. This feature also provides
                                instant time recommendations you can use.</p>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="p-2 rounded-lg bg-secondary aspect-square w-min h-min">
                            <Icon
                                icon={"material-symbols-light:alarm-rounded"} className="text-2xl"
                                style={{color: `#${globalColor}`}}
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Music</h1>
                            <p>You can set your own Pomodoro time using this feature. This feature also provides instant
                                time recommendations you can use.</p>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="p-2 rounded-lg bg-secondary aspect-square w-min h-min">
                            <Icon
                                icon={"material-symbols-light:image-rounded"} className="text-2xl"
                                style={{color: `#${globalColor}`}}
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Background</h1>
                            <p>To improve your mood and concentration levels, you can also change the website background
                                color using this feature.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home