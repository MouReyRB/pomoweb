import {Icon} from '@iconify/react';
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Button} from "@/components/ui/button";
import {useRecomendations} from "@/store/recomendations";
import {useGlobalColor} from "@/store/background";
import {useEffect, useState} from "react";
import {Switch} from "@/components/ui/switch";
import {useSequence} from "@/store/sequence";

const recomendationItems = [
    {
        label: "Sport",
        value: "sport"
    },
    {
        label: "Short Cooking",
        value: "short-cooking"
    },
    {
        label: "Long Cooking",
        value: "long-cooking"
    },
    {
        label: "Excercise",
        value: "excercise"
    }
]

const TimeMenu = ({
                      focusLength,
                      shortBreakLength,
                      longBreakLength,
                      setFocusLength,
                      setShortBreakLength,
                      setLongBreakLength,
                      setModal
                  }) => {
    const globalColor = useGlobalColor((state) => state.globalColor)
    const recomendations = useRecomendations((state) => state.recomendations)
    const choosedRecomendation = useRecomendations((state) => state.choosedRecomendation)
    const setChoosedRecomendation = useRecomendations((state) => state.setChoosedRecomendation)
    const sequence = useSequence((state) => state.sequence)
    const setSequence = useSequence((state) => state.setSequence)
    const [sequenceModal, setSequenceModal] = useState(false)

    const initialFocusLength = focusLength.value;
    const initialShortBreakLength = shortBreakLength.value;
    const initialLongBreakLength = longBreakLength.value;

    const [localFocusLength, setLocalFocusLength] = useState(initialFocusLength)
    const [localShortBreakLength, setLocalShortBreakLength] = useState(initialShortBreakLength)
    const [localLongBreakLength, setLocalLongBreakLength] = useState(initialLongBreakLength)

    useEffect(() => {
        setLocalFocusLength(initialFocusLength)
        setLocalShortBreakLength(initialShortBreakLength)
        setLocalLongBreakLength(initialLongBreakLength)
    }, [focusLength, shortBreakLength, longBreakLength])

    const timeMenuItems = [
        {
            label: "Focus Length",
            value: localFocusLength,
            set: setLocalFocusLength
        },
        {
            label: "Short Break Length",
            value: localShortBreakLength,
            set: setLocalShortBreakLength
        },
        {
            label: "Long Break Length",
            value: localLongBreakLength,
            set: setLocalLongBreakLength
        }
    ]

    const submit = () => {
        setFocusLength({
            label: recomendations[choosedRecomendation].value[0].label,
            value: [localFocusLength[0], localFocusLength[1]]
        })

        setShortBreakLength({
            label: recomendations[choosedRecomendation].value[1].label,
            value: [localShortBreakLength[0], localShortBreakLength[1]]
        })

        setLongBreakLength({
            label: recomendations[choosedRecomendation].value[2].label,
            value: [localLongBreakLength[0], localLongBreakLength[1]]
        })
    }

    return (
        <div
            className="transition-all fixed flex-col top-10 right-0 w-full md:w-1/3 bg-secondary rounded-l-lg p-5 text-slate-700">
            <div className="space-y-5 relative w-full">
                <div className="flex justify-between items-center">
                    <Icon icon="material-symbols-light:alarm-rounded" className="text-2xl"/>
                    <p>Time</p>
                    <Button variant="ghost" onClick={() => setModal(null)}>
                        <Icon icon="material-symbols-light:close-rounded" className="text-2xl"/>
                    </Button>
                </div>
                <div className="flex flex-col gap-3">
                    {timeMenuItems.map((item, index) => (
                        <div key={index}
                             className=" grid grid-cols-2 flex-col gap-1 md:flex-row md:items-center justify-between font-semibold">
                            <p>{item.label}</p>
                            <div className="grid grid-cols-1 gap-3">
                                <div>
                                    <p className="text-xs">Minute</p>
                                    <Input type="number" max="12" className="w-full border border-foreground"
                                           placeholder={item.value[0]}
                                           value={item.value[0]} onInput={(e) => item.set(
                                        [
                                            e.target.value,
                                            item.value[1]
                                        ]
                                    )}/>
                                </div>
                                {/*<div>*/}
                                {/*    <p className="text-xs">Second</p>*/}
                                {/*    <Input type="number" max="60" className="w-full md:w-24 border border-foreground"*/}
                                {/*           placeholder={item.value[1]}*/}
                                {/*           value={item.value[1]} onInput={(e) => item.set(*/}
                                {/*        [*/}
                                {/*            item.value[0],*/}
                                {/*            e.target.value,*/}
                                {/*        ]*/}
                                {/*    )}/>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    ))}
                    <div className="grid grid-cols-2 items-center justify-between font-semibold">
                        <p>Recomendation</p>
                        <Select onValueChange={(e) => setChoosedRecomendation(e)}>
                            <SelectTrigger className="w-full border border-foreground">
                                <SelectValue placeholder={recomendations[choosedRecomendation].label}/>
                            </SelectTrigger>
                            <SelectContent>
                                {recomendations.map((item, index) => (
                                    <SelectItem key={index} value={index}>{item.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 items-center justify-between font-semibold">
                        <div className="flex gap-2 items-center">
                            <p>Pomodoro Sequence</p>
                            <Button variant="icon" onClick={() => setSequenceModal(!sequenceModal)}
                                    className="rounded-full bg-gray-500 text-white aspect-square font-extrabold text-xl">?</Button>
                        </div>
                        <Switch
                            checked={sequence}
                            onCheckedChange={() => setSequence(!sequence)}
                            style={sequence ? {backgroundColor: `#${globalColor}`} : {backgroundColor: `#808080`}}
                            className="data-[state=checked]:bg-red-600"
                        />
                    </div>


                    <Button
                        style={{backgroundColor: `#${globalColor}`}}
                        onClick={() => submit()}
                    >Submit</Button>
                </div>

                {
                    sequenceModal && (
                        <div className="absolute flex items-center justify-center inset-0"
                             onClick={() => setSequenceModal(!sequenceModal)}>
                            <div className="w-3/4 rounded-lg bg-gray-300 font-semibold text-black p-5">
                                <p>{`If you enable this, the Pomodoro sequence feature will be activated. The sequence is, (focus
                            -> short break) x 4 -> long break.`}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default TimeMenu