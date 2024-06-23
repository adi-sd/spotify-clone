import { FaPlay } from "react-icons/fa";

interface PlayButtonProps {
    opacity?: number;
    size?: number;
}

const PlayButton: React.FC<PlayButtonProps> = ({ size }) => {
    return (
        <button className="transition opacity-0 rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
            <FaPlay className="text-black" size={size ? size : 25}></FaPlay>
        </button>
    );
};

export default PlayButton;
