import OpenAI from "openai";
import {secret} from "@aws-amplify/backend";

export const openai = new OpenAI();
