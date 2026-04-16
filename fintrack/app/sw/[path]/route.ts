import { createSerwistRoute } from "@serwist/turbopack";
import path from "node:path";

const revision = "v1";

export const { GET, dynamic, dynamicParams, generateStaticParams, revalidate } = createSerwistRoute({
    swSrc: path.join(process.cwd(), 'app/sw.ts'),
    additionalPrecacheEntries: [{ url: '/offline', revision }]
})