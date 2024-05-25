import {Icon} from '@iconify/react';
import TimeMenu from "@/components/menus/time-menu";
import {useState} from "react";
import MusicMenu from "@/components/menus/music-menu";
import BackgroundMenu from "@/components/menus/background-menu";
import {useGlobalColor} from "@/store/background";

const Menus = ({
                   focusLength,
                   shortBreakLength,
                   longBreakLength,
                   setFocusLength,
                   setShortBreakLength,
                   setLongBreakLength,
               }) => {
    const [modal, setModal] = useState(null)
    const globalColor = useGlobalColor((state) => state.globalColor)

    const menuItems = [
        {
            icon: "material-symbols-light:alarm-rounded",
            label: "Time",
            modal: <TimeMenu
                focusLength={focusLength}
                shortBreakLength={shortBreakLength}
                longBreakLength={longBreakLength}
                setFocusLength={setFocusLength}
                setShortBreakLength={setShortBreakLength}
                setLongBreakLength={setLongBreakLength}
                setModal={setModal}
            />
        },
        {
            icon: "material-symbols-light:music-note-rounded",
            label: "Music",
            modal: <MusicMenu setModal={setModal}/>
        },
        {
            icon: "material-symbols-light:image-rounded",
            label: "Background",
            modal: <BackgroundMenu setModal={setModal}/>
        }
    ]

    return (
        <div
            className="fixed top-10 right-0 w-full justify-center md:w-fit md:justify-end md:right-10 grid grid-cols-3 md:gap-3">
            {menuItems.map((item, index) => (
                <>
                    <div
                        key={index}
                        onClick={() => setModal(item.label)}
                        className="flex flex-col items-center font-semibold gap-1 hover:text-slate-700 cursor-pointer"
                    >
                        <div className="p-2 rounded-lg bg-secondary">
                            <Icon
                                icon={item.icon} className="text-2xl"
                                style={{color: `#${globalColor}`}}
                            />
                        </div>
                        <p>{item.label}</p>
                    </div>
                    {modal === item.label && item.modal}
                </>
            ))}
        </div>
    )
}

export default Menus