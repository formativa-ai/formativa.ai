import { openai } from "@/app/openai";

export const runtime = "nodejs";

// Create a new thread
export async function POST() {
  const id = await openai.beta.threads.create().then((res) => res.id);
  console.log("Created thread with id", id);
  return Response.json({ threadId: id });
}
