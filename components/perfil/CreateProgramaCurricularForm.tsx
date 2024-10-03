"use client"
import {useAuthenticator} from "@aws-amplify/ui-react";
import React, {useEffect, useState} from "react";
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '@/amplify/data/resource';
import {Amplify} from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import {fetchUserAttributes, FetchUserAttributesOutput} from "aws-amplify/auth";

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function CreateProgramaCurricularForm() {
    const emptyProgramaCurricular = {
        nombreDePrograma: "",
        personalityType: undefined,
    }

    const { signOut, user, username, authStatus } = useAuthenticator((context) => [context.user]);
    const [programaCurricular, setProgramaCurricular] = useState(emptyProgramaCurricular)
    const [programasCurriculares, setProgramasCurriculares] = useState([])
    const [notificationList, setNotificationList] = useState([]);
    const [userAttributes , setUserAttributes] = useState<FetchUserAttributesOutput>({});
    const personalityTypes = [
        'INFJ',
        'INFP',
        'INTJ',
        'INTP',
        'ISTP',
        'ISFP',
        'ISTJ',
        'ISFJ',
        'ENTJ',
        'ENTP',
        'ENFJ',
        'ENFP',
        'ESTJ',
        'ESFJ',
        'ESTP',
        'ESFP'
    ]

    useEffect(() => {
        const fetchUserPoolAttributes = async () => {
            try {
                setUserAttributes(await fetchUserAttributes());
            } catch (error) {
                setNotificationList([...notificationList, {message: `Hubo un error actualizando tus atributos personales.`, category: 'error'}]);
            }
        };

        fetchUserPoolAttributes();
    }, []);

    useEffect(() => {
        const getProgramasCurriculares = async () => {
            const { data: programas } = await client.models.ProgramaParticular.list();
            setProgramasCurriculares(programas);
        }
        getProgramasCurriculares();
    }, [userAttributes]);

    const handleSubmit = async () => {
        if (!user) return;

        const { errors, data: programaCreado } = await client.models.ProgramaParticular.create({
            nombreDePrograma: programaCurricular.nombreDePrograma,
        })
        if (errors) {
            console.error(errors)
        } else{
            setProgramasCurriculares([...programasCurriculares, programaCreado])
        }
        setProgramaCurricular(emptyProgramaCurricular)
    }
    return(
        <div>
            <h1>Crear Programa Curricular</h1>
            <input
                id="programa-curricular"
                defaultValue={programaCurricular.nombreDePrograma}
                onChange={(e) => setProgramaCurricular({...programaCurricular, nombreDePrograma: e.target.value})}
                type="text"
                placeholder={"Nombre del Programa Curricular"}
                autoComplete="programa-curricular"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
            <select
                id="personalityType"
                defaultValue={programaCurricular.personalityType}
                aria-placeholder={"Tipo de Personalidad"}
                onChange={(e) => setProgramaCurricular({...programaCurricular, personalityType: e.target.value})}
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
            >
                {personalityTypes.map((personalityType) => (
                    <option key={personalityType} value={personalityType}>
                        {personalityType}
                    </option>
                ))}
            </select>
            <button
                type="submit"
                onClick={handleSubmit}
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                Guardar
            </button>

            {userAttributes && programasCurriculares
                .filter((programaCurricular) => programaCurricular.personalityType === "ENFJ")
                .map((programaCurricular) => {
                    console.log("personality",userAttributes.personalityType)
                 return (
                     <div key={programaCurricular.id}>
                         <p>{programaCurricular.nombreDePrograma}</p>
                         <p>{programaCurricular.personalityType}</p>
                     </div>
                 )
             })}
        </div>
    )
}