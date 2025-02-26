"use client";

import { Song } from "@/types";
import SongItem from "./song-item";
import useOnPlay from "@/hooks/use-on-play";

interface PageContentProps {
    songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
    const onPlay = useOnPlay(songs);

    if (songs.length === 0) {
        return <div className="mt-4 text-neutral-400 ">No Songs Available!</div>;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 mt-4">
            {songs.map((item) => (
                <SongItem key={item.id} onClick={(id: string) => onPlay(id)} data={item}></SongItem>
            ))}
        </div>
    );
};

export default PageContent;
