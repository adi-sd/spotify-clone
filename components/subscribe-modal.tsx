"use client";

import { useState } from "react";

import { Price, ProductWithPrice } from "@/types";
import Modal from "./modal";
import Button from "./button";
import { useUser } from "@/hooks/use-user";
import toast from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripe-client";
import useSubscribeModal from "@/hooks/use-subscribe-modal";

interface SubscribeModalProps {
    products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: price.currency,
        minimumFractionDigits: 2,
    }).format((price?.unit_amount || 0) / 100);

    return priceString;
};

const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
    const subscriberModal = useSubscribeModal();
    const { user, isLoading, subscription } = useUser();
    const [priceIdLoading, setPriceIdLoading] = useState<string>();

    const handleCheckout = async (price: Price) => {
        setPriceIdLoading(price.id);

        if (!user) {
            setPriceIdLoading(undefined);
            return toast.error("Must be logged in!");
        }

        if (subscription) {
            setPriceIdLoading(undefined);
            return toast("User already have the subscription!");
        }

        try {
            const { sessionId } = await postData({
                url: "/api/create-checkout-session",
                data: { price },
            });
            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            toast.error((error as Error)?.message);
        } finally {
            setPriceIdLoading(undefined);
        }
    };

    const onChange = (open: boolean) => {
        if (!open) {
            subscriberModal.onClose();
        }
    };

    let content = <div className="text-center">No Products available.</div>;

    if (products.length) {
        content = (
            <div>
                {products.map((product) => {
                    if (!product.prices?.length) {
                        return <div key={product.id}>No prices available</div>;
                    } else {
                        return product.prices.map((price) => (
                            <Button
                                className="w-full"
                                key={price.id}
                                onClick={() => handleCheckout(price)}
                                disabled={isLoading || price.id === priceIdLoading}
                            >{`Subscriber for ${formatPrice(price)} for a ${price.interval}!`}</Button>
                        ));
                    }
                })}
            </div>
        );
    }

    if (subscription) {
        content = <div className="text-center">User already have the subscription!</div>;
    }

    return (
        <Modal
            title="Only for Premium Users"
            description="Listen to music with Spotify Clone Premium"
            isOpen={subscriberModal.isOpen}
            onChange={onChange}
        >
            {content}
        </Modal>
    );
};

export default SubscribeModal;
