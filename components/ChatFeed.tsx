import styles from "@/components/chat.module.css";
import {PlaceholdersAndVanishInput} from "@/components/ui/placeholders-and-vanish-input";
import React from "react";
import Markdown from "react-markdown";
type MessageProps = {
    role: "user" | "assistant" | "code";
    text: string;
};
export default function ChatFeed({messages,messagesEndRef}) {
    return (
            <div className={styles.messages}>
                {messages.map((msg, index) => (
                    <Message key={index} role={msg.role} text={msg.text}/>
                ))}
                <div ref={messagesEndRef}/>
            </div>
    );
}
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
            return <UserMessage text={text} />;
        case "assistant":
            return <AssistantMessage text={text} />;
        case "code":
            return <CodeMessage text={text} />;
        default:
            return null;
    }
};