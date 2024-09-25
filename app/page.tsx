import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import Hero from "@/components/sections/Hero";
import Header from "@/components/navigation/Header";
import Footer from "@/components/sections/Footer";

Amplify.configure(outputs);

export default function Home() {
  return (
      <main className="flex flex-col min-h-screen text-white">
          <Header/>
          <Hero/>
          <Footer background={"bg-black"}/>
      </main>
  );
}
