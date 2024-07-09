export let assistantId = ""; // set (assistant) ID here, or in environment variable

if (assistantId === "") {
  assistantId = process.env.OPENAI_ASSISTANT_ID;
}
