"use client";

import { Song } from "@/types";
import MediaItem from "./media-item";
import LikeButton from "./like-button";
import useOnPlay from "@/hooks/use-on-play";

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
    const onPlay = useOnPlay(songs);

    if (songs.length === 0) {
        return <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">No Songs Found!</div>;
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
                    <LikeButton songId={song.id}></LikeButton>
                </div>
            ))}
        </div>
    );
};

export default SearchContent;
