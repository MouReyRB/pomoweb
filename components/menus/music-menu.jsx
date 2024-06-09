import { useGlobalColor } from "@/store/background";
import { useAudioPlayer } from "@/store/audio-player";
import { useMusicPlayed } from "@/store/music-played";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const MusicMenu = ({ setModal }) => {
    const globalColor = useGlobalColor((state) => state.globalColor);
    const audioPlayer = useAudioPlayer((state) => state.audioPlayer);
    const setAudioPlayer = useAudioPlayer((state) => state.setAudioPlayer);
    const musicPlayed = useMusicPlayed((state) => state.musicPlayed);
    const setMusicPlayed = useMusicPlayed((state) => state.setMusicPlayed);
    const setIsMusicPlayed = useMusicPlayed((state) => state.setIsMusicPlayed);
    const isMusicPlayed = useMusicPlayed((state) => state.isMusicPlayed);
    const [musicList, setMusicList] = useState([]);

    useEffect(() => {
        const fetchMusicList = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_AZURE_MUSIC_FUNCTION_KEY}==`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMusicList(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchMusicList();
    }, []);

    const playMusic = (item) => {
        if (audioPlayer && musicPlayed === item) {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            setAudioPlayer(null);
            setIsMusicPlayed(false);
        } else {
            if (audioPlayer && musicPlayed !== item) {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            }

            const newAudioPlayer = new Audio(item.url);
            newAudioPlayer.play();
            setAudioPlayer(newAudioPlayer);
            setMusicPlayed(item);
            setIsMusicPlayed(true);
        }
    };

    return (
        <>
            <div className="transition-all h-3/4 w-full md:h-1/2 fixed flex-col top-10 right-0 md:w-1/3 bg-secondary rounded-l-lg p-5 space-y-5 text-slate-700">
                <div className="flex justify-between items-center">
                    <Icon icon="material-symbols-light:music-note-rounded" className="text-2xl" />
                    <p>Music</p>
                    <Button variant="ghost" onClick={() => setModal(null)}>
                        <Icon icon="material-symbols-light:close-rounded" className="text-2xl" />
                    </Button>
                </div>
                <ScrollArea className="h-3/4 w-full border rounded-lg border-slate-300">
                    <div className="p-4">
                        {musicList.map((item, index) => (
                            <>
                                <div
                                    key={index}
                                    onClick={() => playMusic(item)}
                                    className="text-sm flex justify-between cursor-pointer hover:bg-slate-200 items-center p-2 rounded-lg"
                                >
                                    {item.title}
                                    <Icon
                                        icon={`material-symbols-light:${isMusicPlayed && musicPlayed.url === item.url ? 'stop-rounded' : 'play-arrow-rounded'}`}
                                        className="text-xl"
                                    />
                                </div>
                                <Separator className="my-2" />
                            </>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </>
    );
};

export default MusicMenu;
