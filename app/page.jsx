'use client'

import Menus from "@/components/menus";
import { useGlobalColor } from "@/store/background";
import { useCallback, useEffect, useState } from "react";
import { useAudioPlayer } from "@/store/audio-player";
import MusicPlayer from "@/components/music-player";
import Pomodoro from "@/components/pomodoro";
import { useRecomendations } from "@/store/recomendations";
import { useMusicPlayed } from "@/store/music-played";
import { Icon } from "@iconify/react";

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

    const updateLengths = useCallback(() => {
        setFocusLength({
            label: recomendations[choosedRecomendation].value[0].label,
            value: recomendations[choosedRecomendation].value[0].value
        });

        setShortBreakLength({
            label: recomendations[choosedRecomendation].value[1].label,
            value: recomendations[choosedRecomendation].value[1].value
        });

        setLongBreakLength({
            label: recomendations[choosedRecomendation].value[2].label,
            value: recomendations[choosedRecomendation].value[2].value
        });
    }, [choosedRecomendation, recomendations]);

    useEffect(() => {
        updateLengths();
    }, [choosedRecomendation, updateLengths]);

    // To Do List
    const [tasks, setTasks] = useState([
        "Study HTML"
    ]);
    const [newTask, setNewTask] = useState("");

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    const handleAddTask = (event) => {
        event.preventDefault();
        if (newTask.trim() !== "") {
            addTask(newTask);
            setNewTask("");
        }
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const handleEditTask = (index) => {
        const updatedTasks = [...tasks];
        const newText = prompt("Enter new task", tasks[index]);
        if (newText !== null) {
            updatedTasks[index] = newText.trim();
            setTasks(updatedTasks);
        }
    };

    const handleToggleComplete = (index) => {
        const task = document.getElementById(`task-${index}`);
        if (task.classList.contains('completed')) {
            task.classList.remove('completed');
        } else {
            task.classList.add('completed');
        }
    };

    return (
        <div>
            <div
                className={`flex flex-col gap-5 justify-center items-center relative h-screen w-full text-white`}
                style={{ backgroundColor: `#${globalColor}` }}
            >
                <Pomodoro
                    key={`${focusLength.value}-${shortBreakLength.value}-${longBreakLength.value}`}
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
                        <MusicPlayer />
                    )
                }
            </div>
            <div className="text-white text-lg font-bold p-10 w-full"
                style={{ backgroundColor: `#${globalColor}` }} >
                <div className="md:w-1/3 mx-auto text-gray-500 dark:text-gray-400 text-sm sm:text-lg">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <form onSubmit={handleAddTask}>
                            <div className="flex">
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mr-2  rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    placeholder="Add your To Do List"
                                    required
                                />
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                style={{ backgroundColor: `#${globalColor}` }}>
                                    Add
                                </button>
                            </div>
                        </form>
                        <ul>
                            {tasks.map((task, index) => (
                                <li
                                    key={index}
                                    id={`task-${index}`}
                                    className="border-b border-gray-200 flex items-center justify-between py-4"
                                >
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            onChange={() => handleToggleComplete(index)}
                                        />
                                        <span>{task}</span>
                                    </label>
                                    <div >
                                        <button 
                                            className="text-red-500 hover:text-red-700 mr-2"
                                            onClick={() => handleDeleteTask(index)}
                                            style={{ color: `#${globalColor}` }}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            onClick={() => handleEditTask(index)}
                                            style={{ color: `#${globalColor}` }}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-white text-lg font-bold p-10 w-full grid gap-10 md:grid-cols-2"
                style={{ backgroundColor: `#${globalColor}` }}>
                <div className="space-y-10 text-white text-lg font-bold p-10 bg-white rounded-lg shadow m-4 dark:bg-gray-800 mx-auto ">
                    <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <h1 className="text-3xl">What is pomodoro ?</h1>
                        <p style={{ textAlign: 'justify' }}>This time management solution was developed by a college student named Francesco Cirillo in
                            the 1980s. Based on various time intervals set throughout the day, the name of this
                            technique comes from the Italian word for "tomato," referring to a tomato-shaped timer that
                            Cirillo himself used while perfecting his time management method.</p>
                    </div>
                    <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <h1 className="text-3xl">What is pomoweb ?</h1>
                        <p style={{ textAlign: 'justify' }}>Mypomoweb is a Pomodoro website that you can use according to your preferences, as it allows
                            for customization. This website can be used on both desktop and mobile browsers. Its goal is
                            to help you stay more focused on your activities and assist you in managing your time
                            effectively.</p>
                    </div>
                    <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <h1 className="text-3xl">how to use pomoweb ?</h1>
                        <p style={{ textAlign: 'justify' }}>You can use this website to help you implement the Pomodoro technique. This website also
                            offers several features that can assist you.</p>
                    </div>
                </div>
                <div className="space-y-10 text-sm flex flex-col justify-center text-white text-lg font-bold p-10 w-full">
                    <div className="flex gap-5">
                        <div className="p-2 rounded-lg bg-secondary aspect-square w-min h-min">
                            <Icon
                                icon={"material-symbols-light:alarm-rounded"} className="text-2xl"
                                style={{ color: `#${globalColor}` }}
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Time</h1>
                            <p style={{ textAlign: 'justify' }}>You can set your own Pomodoro time using this feature. This feature also provides
                                instant time recommendations you can use.</p>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="p-2 rounded-lg bg-secondary aspect-square w-min h-min">
                            <Icon
                                icon={"material-symbols-light:alarm-rounded"} className="text-2xl"
                                style={{ color: `#${globalColor}` }}
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Music</h1>
                            <p style={{ textAlign: 'justify' }}>You can set your own Pomodoro time using this feature. This feature also provides instant
                                time recommendations you can use.</p>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="p-2 rounded-lg bg-secondary aspect-square w-min h-min">
                            <Icon
                                icon={"material-symbols-light:image-rounded"} className="text-2xl"
                                style={{ color: `#${globalColor}` }}
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Background</h1>
                            <p style={{ textAlign: 'justify' }}>To improve your mood and concentration levels, you can also change the website background
                                color using this feature.</p>
                        </div>
                    </div>
                </div>
            </div>
            

            <div className="text-white text-lg font-bold p-10 w-full"
                style={{ backgroundColor: `#${globalColor}` }}>
                <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
                    <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-center">
                        <span className="text-sm text-gray-500 text-center dark:text-gray-400">
                            Made by Reyhan | ©pomoweb. All Rights Reserved.
                        </span>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Home
