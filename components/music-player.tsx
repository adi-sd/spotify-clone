"use client";

import useGetSongsById from "@/hooks/use-get-songs-by-id";
import useLoadImage from "@/hooks/use-load-image";
import useMusicPlayer from "@/hooks/use-music-player";

const MusicPlayer = () => {
    const player = useMusicPlayer();
    const { song } = useGetSongsById(player.activeId);
    const songUrl = useLoadImage(song!);

    // if(!song || !songUrl || !player.activeId) {
    //     return null;
    // }

    return <div className="fixed bottom-0 bg-black w-full py-2 h-[100px] px-4">Music Player</div>;
};

export default MusicPlayer;
