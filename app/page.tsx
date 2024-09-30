import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import Maco from "@/components/app/Maco";
import Header from "@/components/navigation/Header";
import Footer from "@/components/sections/Footer";

Amplify.configure(outputs);

export default function Home() {
  return (
      <main className="flex flex-col min-h-screen">
          <Header/>
          <Maco />
      </main>
  );
}
