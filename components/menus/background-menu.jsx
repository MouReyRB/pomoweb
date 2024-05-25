import {Icon} from '@iconify/react';
import {Button} from "@/components/ui/button";
import {useGlobalColor} from "@/store/background";

const themes = [
    {
        color: [
            'FE5760',
            'FC6971',
            'CF464D',
            'A7383D',
            '692A2D',
        ]
    },
    {
        color: [
            'FFAB58',
            'FFB46B',
            'D38C47',
            'AA7139',
            '6B4A2B',
        ]
    },
    {
        color: [
            'FFE858',
            'FFEA6B',
            'D3BF47',
            'AA9A39',
            '6B622B',
        ]
    },
    {
        color: [
            'A4FB56',
            'A4ED63',
            '7ABD3F',
            '629833',
            '415F26',
        ]
    },
    {
        color: [
            '61A1F3',
            '5B89C4',
            '365B8A',
            '2B4970',
            '1F3046',
        ]
    },
    {
        color: [
            'A261F4',
            '8C5DC7',
            '5E388F',
            '4C2D73',
            '322048',
        ]
    },
    {
        color: [
            'F855B4',
            'DC5CA7',
            'A8387A',
            '872D62',
            '552240',
        ]
    }
]

const BackgroundMenu = ({setModal}) => {
    const setGlobalColor = useGlobalColor(state => state.setGlobalColor)

    return (
        <div
            className="transition-all fixed flex-col top-10 right-0 w-full md:w-1/3 bg-secondary rounded-l-lg p-5 space-y-5 text-slate-700">
            <div className="flex justify-between items-center">
                <Icon icon="material-symbols-light:image-rounded" className="text-2xl"/>
                <p>Background</p>
                <Button variant="ghost" onClick={() => setModal(null)}>
                    <Icon icon="material-symbols-light:close-rounded" className="text-2xl"/>
                </Button>
            </div>
            {themes.map((theme, index) => {
                return (
                    <div key={index} className="grid grid-cols-5 gap-3 w-full">
                        {theme.color.map((color, index) => {
                            return (
                                <Button
                                    key={index}
                                    variant="ghost"
                                    className="w-full h-10 rounded-full"
                                    onClick={() => setGlobalColor(color)}
                                    style={{backgroundColor: `#${color}`}}
                                >
                                </Button>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default BackgroundMenu