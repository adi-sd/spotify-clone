import { Song } from "@/types";
import { create } from "zustand";

interface PlayListModalStore {
    isOpen: boolean;
    songs: Song[];
    onOpen: () => void;
    onClose: () => void;
    setSongs: (songs: Song[]) => void;
}

export const usePlayListModal = create<PlayListModalStore>((set) => ({
    isOpen: false,
    songs: [],
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setSongs: (songs: Song[]) => set({ songs }),
}));

export default usePlayListModal;
