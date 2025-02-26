import Image from "next/image";

import getLikedSongs from "@/actions/get-liked-songs";
import Header from "@/components/header";
import LikedContent from "@/components/liked-content";

export const revalidate = 0;

const Liked = async () => {
    const songs = await getLikedSongs();

    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header>
                <div className="mt-20">
                    <div className="flex flex-col md:flex-row items-center gap-x-5">
                        <div className="relative h-32 w-32 lg:h-44 lg:w-44">
                            <Image height={200} width={200} src="/images/liked-songs.png" alt="Playlist Cover"></Image>
                        </div>
                        <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                            <p className="hidden md:block font-semibold text-sm">Playlist</p>
                            <h1 className="text-white font-bold text-4xl sm:text-5xl lg:text-7xl">Liked Songs</h1>
                        </div>
                    </div>
                </div>
            </Header>
            <LikedContent songs={songs}></LikedContent>
        </div>
    );
};

export default Liked;
