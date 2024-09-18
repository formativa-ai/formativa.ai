import OpenAI from "openai";
import {secret} from "@aws-amplify/backend";

export const openai = new OpenAI({ apiKey: secret('OPENAI_API_KEY') });
