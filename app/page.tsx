"use client";
import Image from "next/image";
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import TopNavBar from "@/app/components/TopNavBar";
import Mission from "@/app/components/Mission";
import GetInTouch from "@/app/components/GetInTouch";
import Footer from "@/app/components/Footer";

Amplify.configure(outputs);

export default function Home() {
  return (
    <main>
      <TopNavBar />
      <Mission />
      <GetInTouch />
        <Footer/>
    </main>
  );
}
