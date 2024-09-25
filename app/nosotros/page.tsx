import '@aws-amplify/ui-react/styles.css';
import Mission from "@/components/sections/Mission";
import Footer from "@/components/sections/Footer";
import ListaOportunidades from "@/components/nosotros/ListaOportunidades";
import GetInTouch from "@/components/sections/GetInTouch";
import HeaderDark from "@/components/navigation/HeaderDark";


export default function Nosotros() {
  return (
    <main>
        <HeaderDark/>
        <Mission />
        <ListaOportunidades/>
        <GetInTouch/>
        <Footer background={"bg-white"}/>
    </main>
  );
}
