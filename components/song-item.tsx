"use client";

import Image from "next/image";

import { Song } from "@/types";
import useLoadImage from "@/hooks/use-load-image";
import PlayButton from "./play-button";
import LikeButton from "./like-button";

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
    const imagePath = useLoadImage(data);

    return (
        <div
            onClick={() => onClick(data.id)}
            className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 hover:scale-105 transition p-3"
        >
            <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <Image
                    className="object-cover"
                    src={imagePath || "public/images/liked-songs.png"}
                    alt={`Album Art for ${data.title} by ${data.author}`}
                    height={200}
                    width={200}
                ></Image>
            </div>
            <div className="w-full p-2 pt-4 flex justify-center items-center">
                <div className="flex flex-col items-start w-full gap-y-1">
                    <p className="font-semibold text-lg truncate w-full">{data.title}</p>
                    <p className="text-neutral-400 text-sm w-full truncate">By {data.author}</p>
                </div>
                <div className="flex justify-center items-center pr-2">
                    <LikeButton songId={data.id} size={35}></LikeButton>
                </div>
            </div>
            <div className="absolute bottom-21 right-5">
                <PlayButton size={20}></PlayButton>
            </div>
        </div>
    );
};

export default SongItem;
