import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question) return NextResponse.json({ answer: "No question provided." });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });

    const answer = response.choices[0]?.message?.content || "I have no answer.";

    return NextResponse.json({ answer });
  } catch (err: any) {
    return NextResponse.json({ answer: "Error: " + err.message });
  }
}
