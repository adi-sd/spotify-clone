"use client";

import { Song } from "@/types";
import MediaItem from "./media-item";
import LikeButton from "./like-button";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { use, useEffect } from "react";
import toast from "react-hot-toast";
import useOnPlay from "@/hooks/use-on-play";

interface LikedContentProps {
    songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
    const router = useRouter();
    const { isLoading, user } = useUser();

    const onPlay = useOnPlay(songs);

    useEffect(() => {
        if (!isLoading && !user) {
            toast.error("You need to be logged in to see the liked songs!");
            router.replace("/");
        }
    }, [isLoading, user, router]);

    if (songs.length === 0) {
        return <div className="flex flex-col gap-y-3 w-full px-6 text-neutral-400 text-lg">No Songs Added Yet!</div>;
    }

    return (
        <div className="flex flex-col gap-y-3 w-full px-6 text-neutral-400">
            {songs.map((song) => (
                <div
                    key={song.id}
                    className="flex flex-row items-center justify-between w-full px-4 py-2 rounded-md bg-neutral-800"
                >
                    <MediaItem
                        onClick={(id: string) => {
                            onPlay(id);
                        }}
                        data={song}
                    ></MediaItem>
                    <LikeButton songId={song.id} size={35}></LikeButton>
                </div>
            ))}
        </div>
    );
};

export default LikedContent;
