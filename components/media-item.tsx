"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/use-load-image";
import { Song } from "@/types";
import useMusicPlayer from "@/hooks/use-music-player";

interface MediaItemProps {
    onClick?: (id: string) => void;
    data: Song;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
    const imageUrl = useLoadImage(data);
    const musicPlayer = useMusicPlayer();

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id);
        }
        return musicPlayer.setId(data.id);
    };

    return (
        <div
            onClick={handleClick}
            className="flex items-center gap-x-4 transition cursor-pointer bg-neutral-800 hover:bg-neutral-800/50 w-full p-2 rounded-md"
        >
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image
                    src={imageUrl || "/images/liked-songs.png"}
                    alt={`album-art-for-${data.title}`}
                    height={48}
                    width={48}
                ></Image>
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate text-md font-semibold">{data.title}</p>
                <p className="text-neutral-400 text-sm truncate">by {data.title}</p>
            </div>
        </div>
    );
};

export default MediaItem;
