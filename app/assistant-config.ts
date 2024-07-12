export let assistantId = ""; // set maco ID here, or in environment variable

if (assistantId === "") {
  assistantId = process.env.OPENAI_ASSISTANT_ID;
}
