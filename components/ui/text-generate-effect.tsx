"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/app/utils/cn";

export const TextGenerateEffect = ({
                                       words,
                                       className,

                                   }: {
    words: string;
    className?: string;
}) => {
    const [scope, animate] = useAnimate();
    let wordsArray = words.split(" ");
    useEffect(() => {
        animate(
            "span",
            {
                opacity: 1,
            },
            {
                duration: 2,
                delay: stagger(0.2, { startDelay: 3.3 }), // Add a 3-second delay before the stagger starts
            }
        );
    }, [scope.current]);

    const renderWords = () => {
        return (
            <motion.div ref={scope} className="mx-20">
                {wordsArray.map((word, idx) => {
                    return (
                        <motion.span
                            key={word + idx}
                            className="dark:text-white text-black opacity-0"
                        >
                            {word}{" "}
                        </motion.span>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <div className={cn("font-bold", className)}>
            <div className="mt-4">
                <span className="dark:text-white text-black text-2xl leading-snug tracking-wide opacity-50 text-center font-mono relative z-20">
                    {renderWords()}
                </span>
            </div>
        </div>
    );
};
