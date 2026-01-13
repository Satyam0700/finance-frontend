import { createAuthClient } from "better-auth/react";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export const authClient = createAuthClient({
    baseURL: baseURL,
    fetchOptions: {
        onError: (context) => {
            console.log("Auth Error Context:", context);
        },
    }
});