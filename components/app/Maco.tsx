"use client";
import Header from "@/components/navigation/Header";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/sections/Footer";
import React, {Suspense, useEffect, useRef, useState} from "react";
import styles from "@/components/app/page.module.css";
import HeaderDark from "@/components/navigation/HeaderDark";
import Chat from "@/components/chat";
import {AssistantStream} from "openai/lib/AssistantStream";
import Markdown from "react-markdown";
// @ts-expect-error - no types for this yet
import {AssistantStreamEvent} from "openai/resources/beta/assistants/assistants";
import {RequiredActionFunctionToolCall} from "openai/resources/beta/threads/runs/runs";
import {Authenticator} from "@aws-amplify/ui-react";
import {Amplify} from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '@/amplify/data/resource';

Amplify.configure(outputs);
const client = generateClient<Schema>();

type MessageProps = {
    role: "user" | "assistant" | "code";
    text: string;
};

const UserMessage = ({text}: { text: string }) => {
    return <div className={styles.userMessage}>{text}</div>;
};

const AssistantMessage = ({text}: { text: string }) => {
    return (
        <div className={styles.assistantMessage}>
            <Markdown>{text}</Markdown>
        </div>
    );
};

const CodeMessage = ({text}: { text: string }) => {
    return (
        <div className={styles.codeMessage}>
            {text.split("\n").map((line, index) => (
                <div key={index}>
                    <span>{`${index + 1}. `}</span>
                    {line}
                </div>
            ))}
        </div>
    );
};

const Message = ({role, text}: MessageProps) => {
    switch (role) {
        case "user":
            return <UserMessage text={text}/>;
        case "assistant":
            return <AssistantMessage text={text}/>;
        case "code":
            return <CodeMessage text={text}/>;
        default:
            return null;
    }
};

export default function Maco() {
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [threadId, setThreadId] = useState("");

    // automatically scroll to bottom of chat
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };



    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // create a new threadID when chat component created
    useEffect(() => {
        const createThread = async () => {
            const res = await fetch(`/api/assistants/threads`, {
                method: "POST",
            });
            const data = await res.json();
            setThreadId(data.threadId);
        };

        createThread();
    }, []);


    const sendMessage = async (text) => {
        const response = await fetch(
            `/api/assistants/threads/${threadId}/messages`,
            {
                method: "POST",
                body: JSON.stringify({
                    content: text,
                }),
            }
        );
        const stream = AssistantStream.fromReadableStream(response.body);
        handleReadableStream(stream);
    };

    const functionCallHandler = async (
        toolCall: RequiredActionFunctionToolCall
    ) => {
        return functionCallHandler(toolCall);
    };
    const submitActionResult = async (runId, toolCallOutputs) => {
        const response = await fetch(
            `/api/assistants/threads/${threadId}/actions`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    runId: runId,
                    toolCallOutputs: toolCallOutputs,
                }),
            }
        );
        const stream = AssistantStream.fromReadableStream(response.body);
        handleReadableStream(stream);
    };


    /* Stream Event Handlers */

    // textCreated - create new assistant message
    const handleTextCreated = () => {
        appendMessage("assistant", "");
    };

    // textDelta - append text to last assistant message
    const handleTextDelta = (delta) => {
        if (delta.value != null) {
            appendToLastMessage(delta.value);
        }
        ;
        if (delta.annotations != null) {
            annotateLastMessage(delta.annotations);
        }
    };

    // imageFileDone - show image in chat
    const handleImageFileDone = (image) => {
        appendToLastMessage(`\n![${image.file_id}](/api/files/${image.file_id})\n`);
    }

    // toolCallCreated - log new tool call
    const toolCallCreated = (toolCall) => {
        if (toolCall.type != "code_interpreter") return;
        appendMessage("code", "");
    };

    // toolCallDelta - log delta and snapshot for the tool call
    const toolCallDelta = (delta, snapshot) => {
        if (delta.type != "code_interpreter") return;
        if (!delta.code_interpreter.input) return;
        appendToLastMessage(delta.code_interpreter.input);
    };

    // handleRequiresAction - handle function call
    const handleRequiresAction = async (
        event: AssistantStreamEvent.ThreadRunRequiresAction
    ) => {
        const runId = event.data.id;
        const toolCalls = event.data.required_action.submit_tool_outputs.tool_calls;
        // loop over tool calls and call function handler
        const toolCallOutputs = await Promise.all(
            toolCalls.map(async (toolCall) => {
                const result = await functionCallHandler(toolCall);
                return {output: result, tool_call_id: toolCall.id};
            })
        );
        setInputDisabled(true);
        submitActionResult(runId, toolCallOutputs);
    };

    // handleRunCompleted - re-enable the input form
    const handleRunCompleted = () => {
        setInputDisabled(false);
    };

    const handleReadableStream = (stream: AssistantStream) => {
        // messages
        stream.on("textCreated", handleTextCreated);
        stream.on("textDelta", handleTextDelta);

        // image
        stream.on("imageFileDone", handleImageFileDone);

        // code interpreter
        stream.on("toolCallCreated", toolCallCreated);
        stream.on("toolCallDelta", toolCallDelta);

        // events without helpers yet (e.g. requires_action and run.done)
        stream.on("event", (event) => {
            if (event.event === "thread.run.requires_action")
                handleRequiresAction(event);
            if (event.event === "thread.run.completed") handleRunCompleted();
        });
    };

    /*
      =======================
      === Utility Helpers ===
      =======================
    */

    const appendToLastMessage = (text) => {
        setMessages((prevMessages) => {
            const lastMessage = prevMessages[prevMessages.length - 1];
            const updatedLastMessage = {
                ...lastMessage,
                text: lastMessage.text + text,
            };
            return [...prevMessages.slice(0, -1), updatedLastMessage];
        });
    };

    const appendMessage = (role, text) => {
        setMessages((prevMessages) => [...prevMessages, {role, text}]);
    };

    const annotateLastMessage = (annotations) => {
        setMessages((prevMessages) => {
            const lastMessage = prevMessages[prevMessages.length - 1];
            const updatedLastMessage = {
                ...lastMessage,
            };
            annotations.forEach((annotation) => {
                if (annotation.type === 'file_path') {
                    updatedLastMessage.text = updatedLastMessage.text.replaceAll(
                        annotation.text,
                        `/api/files/${annotation.file_path.file_id}`
                    );
                }
            })
            return [...prevMessages.slice(0, -1), updatedLastMessage];
        });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;
        sendMessage(userInput);
        let newMessage = {role: "user", text: userInput};
        setMessages((prevMessages) => [
            ...prevMessages,
            newMessage,
        ]);
        setUserInput("");
        setInputDisabled(true);
        scrollToBottom();
    };


    return (
            messages.length === 0 ?
                <Hero
                    handleSubmit={handleSubmit}
                    setUserInput={setUserInput}
                    userInput={userInput}
                /> :
                <MacoChat
                    setUserInput={setUserInput}
                    inputDisabled={inputDisabled}
                    userInput={userInput}
                    messages={messages}
                    setMessages={setMessages}
                    messagesEndRef={messagesEndRef}
                    handleSubmit={handleSubmit}
                />
    )
}

interface MacoChatProps {
    messages?: any[],
    setMessages?: (value: (((prevState: any[]) => any[]) | any[])) => void,
    messagesEndRef?: React.MutableRefObject<HTMLDivElement | null>,
    handleSubmit?: (e) => void,
    userInput?: string,
    inputDisabled?: boolean,
    setUserInput?: (value: (((prevState: string) => string) | string)) => void
}

function MacoChat({
                      messages,
                      setMessages,
                      messagesEndRef,
                      handleSubmit,
                      userInput,
                      inputDisabled,
                      setUserInput
                  }: MacoChatProps) {

    const [requireAuth, setRequireAuth] = useState(false);
    Amplify.configure(outputs);

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <HeaderDark/>
                <Chat
                    requireAuth={requireAuth}
                    setUserInput={setUserInput}
                    inputDisabled={inputDisabled}
                    userInput={userInput}
                    handleSubmit={handleSubmit}
                    messagesEndRef={messagesEndRef}
                    messages={messages}
                    setMessages={setMessages}
                />
            </div>
        </main>
    )
}