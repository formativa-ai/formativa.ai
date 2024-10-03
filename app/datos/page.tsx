"use client" //todo: remove this line when auth nto needed
import CreateProgramaCurricularForm from "@/components/perfil/CreateProgramaCurricularForm";
import {Amplify} from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import {Authenticator} from "@aws-amplify/ui-react";

Amplify.configure(outputs);

export default function page() {
    return (
        <main className="text-white">
            <Authenticator variation="modal">
                <CreateProgramaCurricularForm/>
            </Authenticator>
        </main>
    )
}