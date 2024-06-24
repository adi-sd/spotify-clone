"use client";

import useGetSongsById from "@/hooks/use-get-songs-by-id";
import useMusicPlayer from "@/hooks/use-music-player";
import PlayerContent from "./player-content";
import useLoadSong from "@/hooks/use-load-song";

const MusicPlayer = () => {
    const player = useMusicPlayer();
    const { song } = useGetSongsById(player.activeId);
    const songUrl = useLoadSong(song!);

    if (!song || !songUrl || !player.activeId) {
        return null;
    }

    return (
        <div className="fixed bottom-0 bg-black w-full py-2 h-[100px] px-4">
            <PlayerContent key={songUrl} song={song} songUrl={songUrl}></PlayerContent>
        </div>
    );
};

export default MusicPlayer;
