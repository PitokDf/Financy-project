import { useState, useEffect } from "react";
import axiosClient from "@/lib/api/client";
import { urlBase64ToUint8Array } from "@/lib/push-utils";
import { toast } from "sonner";

export function usePushNotifications() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
            navigator.serviceWorker.ready.then((reg) => {
                console.log(reg)
                setRegistration(reg);
                reg.pushManager.getSubscription().then((sub) => {
                    setIsSubscribed(!!sub);
                });
            });
        }
    }, []);

    const subscribeUser = async () => {
        let currentRegistration = registration;

        // If registration state is not ready, try to get it directly
        if (!currentRegistration && typeof window !== "undefined" && "serviceWorker" in navigator) {
            currentRegistration = await navigator.serviceWorker.getRegistration() || null;
        }

        if (!currentRegistration) {
            toast.error("Service Worker belum siap. Mohon tunggu sebentar atau refresh halaman.");
            return false;
        }

        try {
            const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
            if (!vapidPublicKey) {
                console.error("VAPID public key is missing");
                return false;
            }

            const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
            const subscription = await currentRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey,
            });

            await axiosClient.post("/push/subscribe", subscription);
            setIsSubscribed(true);
            toast.success("Notifikasi push diaktifkan!");
            return true;
        } catch (error: any) {
            console.error("Failed to subscribe:", error);
            if (Notification.permission === "denied") {
                toast.error("Izin notifikasi ditolak. Harap izinkan di pengaturan browser.");
            } else {
                toast.error("Gagal mengaktifkan notifikasi: " + error.message);
            }
            return false;
        }
    };

    const unsubscribeUser = async () => {
        if (!registration) return false;

        try {
            const subscription = await registration.pushManager.getSubscription();
            if (subscription) {
                await axiosClient.post("/push/unsubscribe", {
                    endpoint: subscription.endpoint
                });

                await subscription.unsubscribe();
                setIsSubscribed(false);
                toast.success("Notifikasi push dinonaktifkan");
                return true;
            }
            return true;
        } catch (error) {
            console.error("Failed to unsubscribe:", error);
            toast.error("Gagal menonaktifkan notifikasi");
            return false;
        }
    };

    return {
        isSubscribed,
        subscribeUser,
        unsubscribeUser,
    };
}
