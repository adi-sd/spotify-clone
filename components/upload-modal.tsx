"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import uniqid from "uniqid";
import { useRouter } from "next/navigation";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import useUploadModal from "@/hooks/use-upload-modal";

import Modal from "./modal";
import Input from "./input";
import Button from "./button";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const user = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            song: null,
            image: null,
        },
    });

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const songFile = values.song?.[0];
            const imageFile = values.image?.[0];

            if (!user || !songFile || !imageFile) {
                toast.error("Please fill out all fields!");
                return;
            }

            const uniqueID = uniqid();
            const songFileName = `song-${values.title}-${uniqueID}`;
            const imageFileName = `image-${values.title}-${uniqueID}`;

            // Song upload
            const { data: songData, error: songError } = await supabaseClient.storage
                .from("songs")
                .upload(songFileName, songFile, { cacheControl: "3600", upsert: false });

            if (songError || !songData) {
                setIsLoading(false);
                return toast.error("Failed to upload the song!");
            }

            // Image - album art upload
            const { data: imageData, error: imageError } = await supabaseClient.storage
                .from("images")
                .upload(imageFileName, imageFile, { cacheControl: "3600", upsert: false });

            if (imageError || !imageData) {
                setIsLoading(false);
                return toast.error("Failed to upload the image/album art!");
            }

            // Add an entry to the songs table
            const { error: supabaseError } = await supabaseClient.from("songs").insert({
                user_id: user.id,
                title: values.title,
                author: values.author,
                song_path: songData.path,
                image_path: imageData.path,
            });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Song uploaded successfully!");
            reset();
            uploadModal.onClose();
        } catch (error) {
            toast.error("Something went wrong, please try again!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title="Upload Songs"
            description="Upload your MP3 songs to Spotify Clone"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6 flex flex-col gap-y-4">
                    <Input
                        id="title"
                        disabled={isLoading}
                        {...register("title", { required: true })}
                        placeholder="Song Title"
                    ></Input>
                    <Input
                        id="author"
                        disabled={isLoading}
                        {...register("author", { required: true })}
                        placeholder="Song Author"
                    ></Input>
                    <div>
                        <div className="pb-1">Select an mp3 song file</div>
                        <Input
                            id="song"
                            type="file"
                            disabled={isLoading}
                            accept=".mp3"
                            {...register("song", { required: true })}
                        ></Input>
                    </div>
                    <div>
                        <div className="pb-1">Select an album art image</div>
                        <Input
                            id="image"
                            type="file"
                            disabled={isLoading}
                            accept="image/*"
                            {...register("image", { required: true })}
                        ></Input>
                    </div>
                    <div className="pt-6 pb-3">
                        <Button className="w-full" disabled={isLoading} type="submit">
                            Upload
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default UploadModal;
