"use client";
"use client";

import React from "react";
import styles from "./page.module.css"; // use simple styles for demonstration purposes
import Chat from "@/components/chat";
import Header from "@/components/navigation/Header";
import HeaderDark from "@/components/navigation/HeaderDark";
import {PlaceholdersAndVanishInput} from "@/components/ui/placeholders-and-vanish-input";
// import TopNavBar from "@/app/components/TopNavBar";

const Maco = () => {
    const placeholders = [
        "¿Cuáles son las mejores universidades para estudiar informática?",
        "¿Cómo puedo solicitar una beca en un programa de tecnología?",
        "¿Qué bootcamps de programación ofrecen ayuda financiera?",
        "¿Cómo escribo una declaración personal para una beca tecnológica?",
        "¿Cuáles son los mejores cursos en línea para aprender programación?",
    ];

  return (
      <main className={styles.main}>
          <div className={styles.container}>
              <HeaderDark/>
              <Chat/>
          </div>
      </main>
)
    ;
};

export default Maco;
