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
import HeaderDark from "@/components/navigation/HeaderDark";


export default function Nosotros() {
  return (
    <main>
        <HeaderDark/>
        {/*<Hero/>*/}
        <Mission />
        {/*<JoinOurTeam />*/}
        <ListaOportunidades/>
        <GetInTouch/>
        <Footer/>
    </main>
  );
}
