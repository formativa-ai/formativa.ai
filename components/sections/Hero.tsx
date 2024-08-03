'use client'

import {useState} from 'react'
import {Dialog, DialogPanel} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {TypeAnimation} from "react-type-animation";
import {useScroll, useTransform} from "framer-motion";
import React from "react";
import {SparklesCore} from "@/components/ui/sparkles";
import { useRouter } from 'next/router';
import {router} from "next/client";
import {PlaceholdersAndVanishInput} from "@/components/ui/placeholders-and-vanish-input";



export default function Hero() {
    const ref = React.useRef(null);
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const placeholders = [
        "Ayudame a aplicar a una beca",
        "¿Qué becas hay en programas de tecnología?",
        "¿Qué oportunidades en Tech ofrecen ayuda financiera?",
        "¿Cómo escribo una declaración personal para una beca?",
        "¿Cuáles cursos hay en línea para aprender programación?",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
    };

    const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
    const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
    const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
    const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
    const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);


    return (
        <div
            className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">

            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div
                    className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                    Estamos creciendo. {' '}
                    <a href="#oportunidades" className="font-semibold text-white">
                        <span aria-hidden="true" className="absolute inset-0"/>
                        Únete al quipo <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </div>
            <h2 className="mt-5 mb-5 text-xl text-center sm:text-6xl dark:text-white text-black">
                ¡Preguntale lo que quieras!
            </h2>
            <p className="mb-20 text-center text-slate-400 relative">
                Maco es tu asistente personal, guía y consejero para encontrar y aplicar a becas, inscribirte en cursos de tecnología, y mucho más.
            </p>
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
            />
            <div className="w-[40rem] h-40 relative">
                {/* Gradients */}
                <div
                    className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm"/>
                <div
                    className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4"/>
                <div
                    className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm"/>
                <div
                    className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4"/>

                {/* Core component */}
                <SparklesCore
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={1200}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />

                {/* Radial Gradient to prevent sharp edges */}
                <div
                    className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]">
                </div>
            </div>
        </div>
    )
}
