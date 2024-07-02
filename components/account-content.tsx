"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import useSubscribeModal from "@/hooks/use-subscribe-modal";
import { useUser } from "@/hooks/use-user";
import { postData } from "@/libs/helpers";
import Button from "./button";
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";

const AccountContent = () => {
    const router = useRouter();
    const subscribeModal = useSubscribeModal();
    const { isLoading, subscription, user, userDetails } = useUser();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/");
        }
    }, [isLoading, user, router]);

    const redirectToCustomerPortal = async () => {
        setLoading(true);
        try {
            const { url, error } = await postData({
                url: "/api/create-portal-link",
            });
            window.location.assign(url);
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-7 px-6 h-[50%] flex flex-col items-center justify-center gap-y-10">
            {userDetails?.avatar_url ? (
                <div className="flex flex-col items-center gap-y-4 mt-10">
                    <Image
                        src={userDetails?.avatar_url}
                        alt="Profile Picture"
                        height={150}
                        width={150}
                        className="rounded-full"
                    ></Image>
                    <h1 className="text-3xl font-semibold">{userDetails.full_name}</h1>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-y-4 mt-10">
                    <Button className="p-6">
                        <FaUserAlt size={80}></FaUserAlt>
                    </Button>
                    <h1 className="text-3xl font-semibold">{user?.email}</h1>
                </div>
            )}
            {!subscription && (
                <div className="flex flex-col items-center gap-y-4 mt-10">
                    <p>No Active Plan</p>
                    <Button onClick={subscribeModal.onOpen} className="w-[300px]">
                        Subscribe
                    </Button>
                </div>
            )}
            {subscription && (
                <div className="flex flex-col items-center gap-y-4 mt-10">
                    <p className="text-2xl sm:text-lg">
                        You are currently on the <b>{subscription?.prices?.products?.name}</b> plan
                    </p>
                    <Button disabled={loading || isLoading} className="w-[300px]" onClick={redirectToCustomerPortal}>
                        Open Customer Portal
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AccountContent;
