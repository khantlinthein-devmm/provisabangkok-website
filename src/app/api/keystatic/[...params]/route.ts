import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";
import { keystaticReady } from "@/lib/keystatic";

// Until the GitHub App is set up (see README), answer 503 instead of failing the whole build.
const notReady = () => new Response("Blog editor is not set up yet", { status: 503 });
const handler = keystaticReady ? makeRouteHandler({ config }) : { GET: notReady, POST: notReady };

export const { GET, POST } = handler;
