"use client"
import {Authenticator, useAuthenticator} from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import React, {useEffect, useState} from "react";
import {
    AuthUser,
    confirmUserAttribute, ConfirmUserAttributeInput,
    fetchUserAttributes,
    FetchUserAttributesOutput,
    updateUserAttributes, UpdateUserAttributesOutput,
    signOut,
    deleteUser
} from 'aws-amplify/auth';
import {GuestUser} from "@/lib/types/UserData";
import Header from "@/components/navigation/Header";
import {PersonalityType} from "@/lib/types/PersonalityType";
import ConfirmationCodeModal from "@/components/ui/CodeConfirmationModal";
import NotificationBanners from "@/components/ui/NotificationList";
import {NotificationType} from "@/lib/types/NotificationType";

Amplify.configure(outputs);

function UserProfile() {
    const [userAttributes , setUserAttributes] = useState<FetchUserAttributesOutput>({});
    const [notificationList, setNotificationList] = useState<NotificationType[]>([]);
    const [showConfirmationCodeModal, setShowConfirmationCodeModal] = useState(false);
    const [codeDeliveryDetails, setCodeDeliveryDetails] = useState({});


    const personalityTypes = ['INTJ' , 'INTP' , 'ENTJ' , 'ENTP' , 'INFJ' , 'INFP' , 'ENFJ' , 'ENFP' , 'ISTJ' , 'ISFJ' , 'ESTJ' , 'ESFJ' , 'ISTP' , 'ISFP' , 'ESTP' , 'ESFP']
    const personality: PersonalityType = { acronym: 'ENTJ', description: 'The Architect' };

    useEffect(() => {
        const fetchAttributes = async () => {
            try {
                setUserAttributes(await fetchUserAttributes());
            } catch (error) {
                setUserAttributes(GuestUser);
            }
        };
        fetchAttributes();
    }, []);

    const handleSuccessfulProfileUpdate = () => {
        setNotificationList([...notificationList, {message: `Tu perfil fue actualizado exitosamente.`, category: 'success'}]);
    }


    async function handleUpdateUserAttributes() {
        try {
            await updateUserAttributes({
                userAttributes: {
                    given_name: userAttributes.given_name,
                    family_name: userAttributes.family_name,
                    email: userAttributes.email,
                    preferred_username: userAttributes.preferred_username,
                    // 'custom:personality_type': userAttributes['custom:personality_type']
                },
            }).then(output => handleUpdateUserAttributeNextSteps(output));
        } catch (error) {
            setNotificationList([...notificationList, {message: "Failed to update attribute. Please try again.", category: 'alert'}]);
        }
    }

    function handleUpdateUserAttributeNextSteps(output: UpdateUserAttributesOutput) {
        const {
            given_name,
            family_name,
            email,
            preferred_username
        } = output;

        if(!email.isUpdated){
            let nextStep = email.nextStep;
            console.log(nextStep)
            switch (nextStep.updateAttributeStep) {
                case 'CONFIRM_ATTRIBUTE_WITH_CODE':
                    setCodeDeliveryDetails(nextStep.codeDeliveryDetails);
                    setShowConfirmationCodeModal(true);
                    break;
                case 'DONE':
                    handleSuccessfulProfileUpdate();
                    break;
            }
        } else {
            handleSuccessfulProfileUpdate();
        }
    }

    async function handleConfirmUserAttribute({
                                                  userAttributeKey,
                                                  confirmationCode,
                                              }: ConfirmUserAttributeInput) {
        try {
            await confirmUserAttribute({ userAttributeKey, confirmationCode });
            // Update the user attributes state to reflect the confirmed email
            const updatedAttributes = await fetchUserAttributes();
            setUserAttributes(updatedAttributes);
            // Close the modal
            setShowConfirmationCodeModal(false);
            handleSuccessfulProfileUpdate();
        } catch (error) {
            setShowConfirmationCodeModal(false);
            setNotificationList([...notificationList, {message: "Failed to confirm attribute. Please try again.", category: 'alert'}]);
        }
    }



    if (userAttributes) {
        return (
            <div className="mt-8 divide-y divide-white/5">
                {/* Personal Information */}
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-white">Informacion Personal</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-400">
                            Aqui estan todos los detalles de tu perfil.
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">

                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-white">
                                    Primer Nombre
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="first-name"
                                        // name="first-name"
                                        defaultValue={userAttributes.given_name}
                                        type="text"
                                        onChange={(e) => setUserAttributes({
                                            ...userAttributes,
                                            given_name: e.target.value
                                        })}
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-white">
                                    Primer Apellido
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="last-name"
                                        // name="last-name"
                                        defaultValue={userAttributes.family_name}
                                        onChange={(e) => setUserAttributes({
                                            ...userAttributes,
                                            family_name: e.target.value
                                        })}
                                        type="text"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    Dirección de Correo
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        // name="email"
                                        type="email"
                                        defaultValue={userAttributes.email}
                                        onChange={(e) => setUserAttributes({...userAttributes, email: e.target.value})}
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="timezone" className="block text-sm font-medium leading-6 text-white">
                                    Tipo de Personalidad
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="personality-type"
                                        // name="personality-type"
                                        defaultValue={userAttributes['custom:personality_type']}
                                        onChange={(e) => setUserAttributes({...userAttributes, 'custom:personality_type': e.target.value})}
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                                    >
                                        {personalityTypes.map((personalityType,index) => (
                                            <option key={index}>{personalityType}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                                    Usuario
                                </label>
                                <div className="mt-2">
                                    <div
                                        className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                              <span className="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
                                @
                              </span>
                                        <input
                                            id="username"
                                            // name="username"
                                            type="text"
                                            placeholder="username"
                                            autoComplete="username"
                                            defaultValue={userAttributes.preferred_username}
                                            onChange={(e) => setUserAttributes({
                                                ...userAttributes,
                                                preferred_username: e.target.value
                                            })}
                                            className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex">
                            <button
                                type="submit"
                                onClick={handleUpdateUserAttributes}
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>


                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-white">Salir de la sesion</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-400">

                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                            {/*<div className="col-span-full">*/}
                            {/*    <label htmlFor="logout-password"*/}
                            {/*           className="block text-sm font-medium leading-6 text-white">*/}
                            {/*        Your password*/}
                            {/*    </label>*/}
                            {/*    <div className="mt-2">*/}
                            {/*        <input*/}
                            {/*            id="logout-password"*/}
                            {/*            type="password"*/}
                            {/*            autoComplete="current-password"*/}
                            {/*            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>

                        <div className="mt-8 flex">
                            <button
                                type="submit"
                                onClick={() => signOut({global: false})}
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Salir de esta sesión
                            </button>
                            <button
                                type="submit"
                                onClick={() => signOut({global: true})}
                                className="ml-8 border-slate-400 border-2 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:border-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Salir de todas las sesiones
                            </button>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <hr/>

                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-white">Borrar Cuenta</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-400">
                        Toda la información relacionada con esta cuenta se eliminará permanentemente.
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                            {/*<div className="col-span-full">*/}
                            {/*    <label htmlFor="logout-password"*/}
                            {/*           className="block text-sm font-medium leading-6 text-white">*/}
                            {/*        Your password*/}
                            {/*    </label>*/}
                            {/*    <div className="mt-2">*/}
                            {/*        <input*/}
                            {/*            id="logout-password"*/}
                            {/*            type="password"*/}
                            {/*            autoComplete="current-password"*/}
                            {/*            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>

                        <div className="mt-8 flex">
                            <button
                                type="submit"
                                onClick={() => deleteUser()}
                                className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                            >
                                Si, quiero borrar mi cuenta
                            </button>
                        </div>
                    </div>
                </div>

                <ConfirmationCodeModal
                    isOpen={showConfirmationCodeModal}
                    onClose={() => setShowConfirmationCodeModal(false)}
                    onConfirm={handleConfirmUserAttribute}
                    codeDeliveryDetails={codeDeliveryDetails}
                />
                <NotificationBanners notificationList={notificationList} setNotificationList={setNotificationList}/>
            </div>
        );
    }
}


export default function Page() {

    return (
        <div className="text-white">
            <Header/>
            <Authenticator variation="modal">
                <UserProfile/>
            </Authenticator>
        </div>
    );
}