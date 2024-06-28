import { Song } from "@/types";

import useMusicPlayer from "./use-music-player";
import useAuthModal from "./use-auth-modal";
import { useUser } from "./use-user";
import useSubscribeModal from "./use-subscribe-modal";

const useOnPlay = (songs: Song[]) => {
    const player = useMusicPlayer();
    const authModal = useAuthModal();
    const subscribeModal = useSubscribeModal();
    const { user, subscription } = useUser();

    const onPlay = (id: string) => {
        if (!user) {
            return authModal.onOpen(false);
        }

        if (!subscription) {
            return subscribeModal.onOpen();
        }

        player.setId(id);
        player.setIds(songs.map((song) => song.id));
        player.setSongs(songs);
    };

    return onPlay;
};

export default useOnPlay;
