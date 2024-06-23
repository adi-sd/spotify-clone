"use client";

import { Song } from "@/types";

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
    if (songs.length === 0) {
        return <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">No Songs Found!</div>;
    }

    return (
        <div className="flex flex-col gap-y-3 w-full px-6 text-neutral-400">
            {songs.map((song) => (
                <div
                    key={song.id}
                    className="flex flex-row items-center justify-between w-full px-6 py-4 bg-neutral-800 rounded-md"
                >
                    <div className="flex items-center justify-center gap-x-2">
                        <div className="text-white text-lg font-bold">{song.title}</div>
                        <div className="text-neutral-400 text-sm align-text-bottom">by {song.author}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchContent;
