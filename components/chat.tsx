"use client";

import React, {useState, useEffect, useRef} from "react";
import styles from "./chat.module.css";
import Markdown from "react-markdown";
import {RequiredActionFunctionToolCall} from "openai/resources/beta/threads/runs/runs";

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

type ChatProps = {
    functionCallHandler?: (
        toolCall: RequiredActionFunctionToolCall
    ) => Promise<string>,
    messages?: any[],
    setMessages?: (value: (((prevState: any[]) => any[]) | any[])) => void,
    messagesEndRef?: React.MutableRefObject<HTMLDivElement | null>,
    handleSubmit?: any,
    userInput?: string,
    inputDisabled?: boolean,
    setUserInput?: (value: (((prevState: string) => string) | string)) => void
};

const Chat = ({
                  messages,
                  setMessages,
                  messagesEndRef,
                  handleSubmit,
                  userInput,
                  inputDisabled,
                  setUserInput
              }: ChatProps) => {

    return (
        <div className={styles.chatContainer}>
            <div className={styles.messages}>
                {messages.map((msg, index) => (
                    <Message key={index} role={msg.role} text={msg.text}/>
                ))}
                <div ref={messagesEndRef}/>
            </div>
            <form
                onSubmit={handleSubmit}
                className={`${styles.inputForm} ${styles.clearfix}`}
            >
                <input
                    type="text"
                    className={styles.input}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter your question"
                />
                <button
                    type="submit"
                    className={styles.button}
                    disabled={inputDisabled}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;