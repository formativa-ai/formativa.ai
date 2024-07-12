'use client'

import {useState} from 'react'
import {Dialog, DialogPanel} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {TypeAnimation} from "react-type-animation";
import {useScroll, useTransform} from "framer-motion";
import React from "react";
import {GoogleGeminiEffect} from "./ui/google-gemini-effect";
import {SparklesCore} from "@/app/components/ui/sparkles";
import { useRouter } from 'next/router';
import {router} from "next/client";



export default function Hero() {
    const ref = React.useRef(null);
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });



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

            <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
                <TypeAnimation
                    sequence={[
                        'Acceso a la Educación',
                        1000,
                        'Educación para todos',
                        2000,
                        'Educación Formativa',
                        2000,
                        'Formativa AI',
                        2000,
                    ]}
                    wrapper="span"
                    speed={10}
                    deletionSpeed={60}
                    cursor={true}
                    // style={{fontSize: '1em', display: 'block', whiteSpace: 'nowrap'}}
                    repeat={0}
                />
            </h1>
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
            <a
                href='/maco'
                className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span
                    className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"/>
                <span
                    className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    &gt; Consejero
                </span>
            </a>
        </div>
    )
}
