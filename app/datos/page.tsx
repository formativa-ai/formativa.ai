"use client" //todo: remove this line when auth nto needed
import {Amplify} from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import {Authenticator} from "@aws-amplify/ui-react";
import CurrentCareersTable from "@/components/datos/CurrentCareersTable";

Amplify.configure(outputs);

export default function page() {
    return (
        <main className="text-white">
            <Authenticator variation="modal">
                <CurrentCareersTable/>
            </Authenticator>
        </main>
    )
}