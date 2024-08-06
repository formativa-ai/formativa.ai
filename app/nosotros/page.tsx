import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import Mission from "@/components/sections/Mission";
import Footer from "@/components/sections/Footer";
import JoinOurTeam from "@/components/JoinOurTeam";
import ListaOportunidades from "@/components/ListaOportunidades";
import Hero from "@/components/sections/Hero";
import HeroGenerateText from "@/components/sections/HeroGenerateText";
import JobApplicationForm from "@/components/sections/JobApplicationForm";
import Header from "@/components/navigation/Header";
import GetInTouch from "@/components/sections/GetInTouch";


export default function Nosotros() {
  return (
    <main>
        <Header/>
        {/*<Hero/>*/}
        <Mission />
        {/*<JoinOurTeam />*/}
        <ListaOportunidades/>
        <GetInTouch/>
        <Footer/>
    </main>
  );
}
