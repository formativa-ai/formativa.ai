import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import Hero from "@/components/sections/Hero";
import Header from "@/components/navigation/Header";

Amplify.configure(outputs);

export default function Home() {
  return (
    <main>
        <Header/>
        <Hero/>
    </main>
  );
}
