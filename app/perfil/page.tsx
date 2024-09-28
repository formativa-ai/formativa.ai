"use client"
import {Authenticator} from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import Header from "@/components/navigation/Header";
import UserProfile from "@/components/perfil/UserProfile";
import Footer from "@/components/sections/Footer";
Amplify.configure(outputs);


export default function Page() {
    return (
        <main className="flex flex-col min-h-screen bg-gray-100">
            {/*<Header/>*/}
            <Authenticator variation="modal">
                <UserProfile/>
            </Authenticator>
            <Footer background={"bg-gray-100"}/>
        </main>
    )
}