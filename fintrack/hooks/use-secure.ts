import { SECURE_MODE_KEY } from "@/lib/utils";
import { useEffect, useState } from "react";

export function useSecureMode() {
    const [isSecure, setIsSecure] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(SECURE_MODE_KEY) === 'true';
        }
        return false;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(SECURE_MODE_KEY, String(isSecure));
        }
    }, [isSecure]);

    const toggle = () => setIsSecure(prev => !prev);

    return { isSecure, setIsSecure, toggle };
}