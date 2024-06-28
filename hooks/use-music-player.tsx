import { Song } from "@/types";
import { create } from "zustand";

interface MusicPlayerStore {
    ids: string[];
    activeId?: string;
    songs?: Song[];
    setId: (id: string) => void;
    setIds: (ids: string[]) => void;
    setSongs: (songs: Song[]) => void;
    reset: () => void;
}

const useMusicPlayer = create<MusicPlayerStore>((set) => ({
    ids: [],
    activeId: undefined,
    setId: (id: string) => set({ activeId: id }),
    setIds: (ids: string[]) => set({ ids }),
    setSongs: (songs: Song[]) => set({ songs }),
    reset: () => set({ ids: [], activeId: undefined }),
}));

export default useMusicPlayer;
