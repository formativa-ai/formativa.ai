export let assistantId = ""; // set _assistant ID here, or in environment variable

if (assistantId === "") {
  assistantId = process.env.OPENAI_ASSISTANT_ID;
}
