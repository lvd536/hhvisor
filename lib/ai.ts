import GigaChat from "gigachat";
import { Agent } from "node:https";

const httpsAgent = new Agent({
    rejectUnauthorized: false,
});

export const aiClient = new GigaChat({
    timeout: 600,
    model: "GigaChat",
    credentials: process.env.AI_API_KEY,
    httpsAgent: httpsAgent,
});