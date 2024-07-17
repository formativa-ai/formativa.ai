import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import Mission from "@/app/components/Mission";
import Footer from "@/app/components/Footer";
import JoinOurTeam from "@/app/components/JoinOurTeam";
import ListaOportunidades from "@/app/components/ListaOportunidades";
import Hero from "@/app/components/Hero";
import HeroGenerateText from "@/app/components/HeroGenerateText";
import JobApplicationForm from "@/app/components/JobApplicationForm";
import Header from "@/app/components/Navigation/Header";

Amplify.configure(outputs);

export default function Home() {
  return (
    <main>
        <Header/>
        <HeroGenerateText/>
        {/*<Mission />*/}
        {/*<JoinOurTeam />*/}
        <ListaOportunidades/>
        <JobApplicationForm/>
        <Footer/>
    </main>
  );
}
