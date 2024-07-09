"use client";
import React from "react";
import TopNavBar from "@/app/components/TopNavBar";
import Footer from "@/app/components/Footer";
import JobCard from "@/app/components/JobCard";
import OportunidadesHero from "@/app/components/OportunidadesHero";

export default function Oportunidades() {

    return (<main>
        <TopNavBar/>
        <OportunidadesHero/>
        <JobCard/>
        <Footer/>
    </main>);
}