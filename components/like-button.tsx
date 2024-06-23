import { useEffect, useState } from "react";
import useAuthModal from "@/hooks/use-auth-modal";
import { useUser } from "@/hooks/use-user";
import toast from "react-hot-toast";

import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
    songId: string;
    size?: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId, size }) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const authModal = useAuthModal();
    const { user } = useUser();

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!user?.id) {
            return;
        }

        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from("liked_songs")
                .select("*")
                .eq("user_id", user.id)
                .eq("song_id", songId)
                .single();

            if (!error && data) {
                setIsLiked(true);
            }
        };

        fetchData();
    }, [songId, supabaseClient, user?.id]);

    const handleLike = async () => {
        if (!user) {
            return authModal.onOpen(false);
        }

        if (isLiked) {
            const { error } = await supabaseClient
                .from("liked_songs")
                .delete()
                .eq("user_id", user.id)
                .eq("song_id", songId)
                .single();

            if (error) {
                toast.error("Something went wrong!");
            } else {
                setIsLiked(false);
                toast.success("Un-liked!");
            }
        } else {
            const { error } = await supabaseClient.from("liked_songs").insert([{ user_id: user.id, song_id: songId }]);

            if (error) {
                toast.error("Something went wrong!");
            } else {
                setIsLiked(true);
                toast.success("Liked!");
            }
        }

        router.refresh();
    };

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    return (
        <button className="hover:opacity-50 hover:scale-105 transition" onClick={handleLike}>
            <Icon color={isLiked ? "#22c55e" : "white"} size={size ? size : 25}></Icon>
        </button>
    );
};

export default LikeButton;
