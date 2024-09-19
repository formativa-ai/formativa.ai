import { openai } from "@/app/openai";
import {secret} from "@aws-amplify/backend";

export const runtime = "nodejs";

// Create a new thread
export async function POST() {
  const id = await openai.beta.threads.create().then((res) => res.id);
  return Response.json({ threadId: id });
}
