import { createSerwistRoute } from "@serwist/turbopack";
import { NextRequest } from "next/server";
import path from "node:path";

const revision = "v1";

const serwistRoute = createSerwistRoute({
    swSrc: path.join(process.cwd(), "app/sw.ts"),
    additionalPrecacheEntries: [{ url: "/offline", revision }],
});

export const GET = async (req: NextRequest, { params }: { params: Promise<{ path: string }> }) => {
    try {
        const { path: segment } = await params;

        if (segment !== "sw.js" && !segment.endsWith(".map")) {
            return new Response("Not Found", { status: 404 });
        }

        const response = await serwistRoute.GET(req, { params: Promise.resolve({ path: segment }) });

        const newHeaders = new Headers(response.headers);
        newHeaders.set("Service-Worker-Allowed", "/");

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
        });
    } catch (error: any) {
        console.error("SERWIST ROUTE ERROR:", error);
        return new Response(error.message || "Internal Server Error", { status: 500 });
    }
};

export const dynamic = "force-dynamic";
export const revalidate = 0;
