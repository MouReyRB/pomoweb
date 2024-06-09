import {Icon} from "@iconify/react";
import {useGlobalColor} from "@/store/background";
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from 'framer-motion';
import {useSequence} from "@/store/sequence";

const ringMusic = {
    "url": "/music/ring/ring.wav"
}

const Pomodoro = ({
                      focusLength,
                      shortBreakLength,
                      longBreakLength,
                      isCounting,
                      setIsCounting,
                  }) => {
    const globalColor = useGlobalColor((state) => state.globalColor)
    const [lengthChoosed, setLengthChoosed] = useState(0)
    const sequence = useSequence((state) => state.sequence)

    useEffect(() => {
        console.log("sequence: ", sequence)
    }, [sequence])

    const pomodoroCustomSequence = [
        focusLength, shortBreakLength,
        focusLength, shortBreakLength,
        focusLength, shortBreakLength,
        focusLength, shortBreakLength,
        longBreakLength
    ]
    const [initTime, setInitTime] = useState(pomodoroCustomSequence[lengthChoosed].value)
    const [time, setTime] = useState(initTime);

    useEffect(() => {
        setInitTime(pomodoroCustomSequence[lengthChoosed].value)
        setTime(pomodoroCustomSequence[lengthChoosed].value)
    }, [lengthChoosed])

    const pomodoroSequence = [
        focusLength, shortBreakLength, longBreakLength
    ]

    const callNextSequence = async (lengthChoosed, pomodoroCustomSequence) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_AZURE_NXT_SEQUENCE_FUNCTION_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lengthChoosed,
                pomodoroCustomSequence
            })
        });
        const data = await response.json();
        return data.nextIndex;
    };

    const callPreviousSequence = async (lengthChoosed, pomodoroSequence) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_AZURE_PREV_SEQUENCE_FUNCTION_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lengthChoosed,
                pomodoroSequence
            })
        });
        const data = await response.json();
        return data.previousIndex;
    };

    const nextSequence = async (paused = true) => {
        if (paused) {
            setIsCounting(false);
        }

        const nextIndex = await callNextSequence(lengthChoosed, pomodoroCustomSequence);
        setLengthChoosed(nextIndex);
    };

    const previousSequence = async (paused = true) => {
        if (paused) {
            setIsCounting(false);
        }

        const previousIndex = await callPreviousSequence(lengthChoosed, pomodoroSequence);
        setLengthChoosed(previousIndex);
    };

    useEffect(() => {
        let timer;

        if (isCounting) {
            timer = setInterval(() => {
                setTime((prevTime) => {
                    let newTime = [...prevTime];
                    if (prevTime[0] > 0 || prevTime[1] > 0) {
                        if (prevTime[1] === 0) {
                            newTime[0] -= 1;
                            newTime[1] = 59;
                        } else {
                            newTime[1] -= 1;
                        }
                    }

                    if (newTime[0] === 0 && newTime[1] === 0) {
                        setTimeout(() => {
                            const audio = new Audio(ringMusic.url);
                            audio.play();

                            if (sequence) {
                                nextSequence(false)
                            } else {
                                setIsCounting(false);
                            }

                            setTime(initTime);
                        }, 1000);
                    }

                    return newTime;
                });
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [isCounting, lengthChoosed, time]);

    const formatTime = (value) => String(value).padStart(2, '0');

    return (
        <>
            <p className="text-xl md:text-2xl font-semibold text-center">
                {
                    sequence ? (
                        pomodoroCustomSequence[lengthChoosed].label
                    ) : (
                        pomodoroSequence[lengthChoosed].label
                    )
                }
            </p>
            <AnimatePresence mode="wait">
                <motion.div
                    key={lengthChoosed}
                    className="text-7xl md:text-9xl font-semibold text-center relative"
                    initial={{opacity: 0, x: '35%'}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: '-35%'}}
                    transition={{duration: 0.5}}
                >
                    <h1>{formatTime(time[0])}</h1>
                    <h1>{formatTime(time[1])}</h1>
                </motion.div>
            </AnimatePresence>

            <div
                className="w-full md:w-min h-fit absolute left-0 bottom-0 md:bottom-1/3  md:px-20 z-10">
                <div className="relative flex md:flex-col justify-between items-center gap-5 md:gap-10 px-5 my-5">
                    {
                        sequence ? (
                            <div
                                className={`md:w-40 w-28 h-10 rounded-3xl bg-white absolute -z-10 transition-all ${pomodoroCustomSequence[lengthChoosed].label === "Focus Length" && 'top-0 left-5'} ${pomodoroCustomSequence[lengthChoosed].label === "Short Break Length" && 'md:top-20 md:left-5 centered-element'} ${pomodoroCustomSequence[lengthChoosed].label === "Long Break Length" && 'md:top-40 md:left-5 top-0 right-5'}`}>
                            </div>
                        ) : (
                            <div
                                className={`md:w-40 w-28 h-10 rounded-3xl bg-white absolute -z-10 transition-all ${pomodoroSequence[lengthChoosed].label === "Focus Length" && 'top-0 left-5'} ${pomodoroSequence[lengthChoosed].label === "Short Break Length" && 'md:top-20 md:left-5 centered-element'} ${pomodoroSequence[lengthChoosed].label === "Long Break Length" && 'md:top-40 md:left-5 top-0 right-5'}`}>
                            </div>
                        )}

                    {
                        sequence ? (
                            <>
                                <button onClick={() => setLengthChoosed(0)}
                                        className={`md:w-40 w-28 py-2 rounded-3xl font-semibold ${pomodoroCustomSequence[lengthChoosed].label === "Focus Length" ? 'bg-transparent text-black' : 'text-white'}`}>Focus
                                </button>
                                <button onClick={() => setLengthChoosed(1)}
                                        className={`md:w-40 w-28 py-2 rounded-3xl font-semibold ${pomodoroCustomSequence[lengthChoosed].label === "Short Break Length" ? 'bg-transparent text-black' : 'text-white'}`}>Short
                                </button>
                                <button onClick={() => setLengthChoosed(2)}
                                        className={`md:w-40 w-28 py-2 rounded-3xl font-semibold ${pomodoroCustomSequence[lengthChoosed].label === "Long Break Length" ? 'bg-transparent text-black' : 'text-white'}`}>Long
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setLengthChoosed(0)}
                                        className={`md:w-40 w-28 py-2 rounded-3xl font-semibold ${pomodoroSequence[lengthChoosed].label === "Focus Length" ? 'bg-transparent text-black' : 'text-white'}`}>Focus
                                </button>
                                <button onClick={() => setLengthChoosed(1)}
                                        className={`md:w-40 w-28 py-2 rounded-3xl font-semibold ${pomodoroSequence[lengthChoosed].label === "Short Break Length" ? 'bg-transparent text-black' : 'text-white'}`}>Short
                                </button>
                                <button onClick={() => setLengthChoosed(2)}
                                        className={`md:w-40 w-28 py-2 rounded-3xl font-semibold ${pomodoroSequence[lengthChoosed].label === "Long Break Length" ? 'bg-transparent text-black' : 'text-white'}`}>Long
                                </button>
                            </>
                        )
                    }
                </div>
            </div>

            <div className="flex gap-5 items-center justify-between">
                <div
                    onClick={() => setIsCounting(!isCounting)}
                    className={`py-2 rounded-xl w-40 flex justify-center bg-white hover:bg-slate-300 cursor-pointer`}>
                    <Icon icon={`material-symbols-light:${isCounting ? 'pause' : 'play-arrow-rounded'}`}
                          className={`text-5xl transition`}
                          style={{color: `#${globalColor}`}}
                    />
                </div>
            </div>
        </>
    )
}

export default Pomodoro
