import { OpenAI } from "openai";

export async function getOpenai() {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    
    return openai;
}       

