import { ChromaClient } from "chromadb";
import { config } from "./config";

export const chroma = new ChromaClient({ path: config.chroma.url });
