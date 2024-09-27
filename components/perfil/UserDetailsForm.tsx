import React, {useEffect, useState} from "react";
import {FetchUserAttributesOutput} from "aws-amplify/auth";
import {downloadData, getUrl, uploadData, UploadDataWithPathOutput} from "aws-amplify/storage";
import {NotificationType} from "@/lib/types/NotificationType";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import Image from "next/image";

interface UserDetailsFormProps {
    userAttributes?: FetchUserAttributesOutput,
    setUserAttributes?: (value: (((prevState: FetchUserAttributesOutput) => FetchUserAttributesOutput) | FetchUserAttributesOutput)) => void,
    handleUpdateUserAttributes?: () => Promise<void>,
    setEditingProfile?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setNotificationList?: (value: (((prevState: NotificationType[]) => NotificationType[]) | NotificationType[])) => void,
    notificationList?: NotificationType[],
    profilePictureUrl?: string
}

export default function UserDetailsform({
                                            userAttributes,
                                            setUserAttributes,
                                            handleUpdateUserAttributes,
                                            setEditingProfile,
                                            setNotificationList,
                                            notificationList,
                                            profilePictureUrl
                                        }: UserDetailsFormProps) {
    const userTypes = ["Estudiante", "Egresado", "Profesor", "Docente", "Consejero", "Representate de Empresa/Empleador", "Representante de Universidad"];
    const entityTypes = ["Colegio", "Universidad", "Empresa", "Organización"];
    // Country codes array
    const countryCodes = [
        {code: "+57", label: "🇨🇴 +57"},
        {code: "+1", label: "🇺🇸 +1"},
        // Add more country codes as needed
    ];

    const [phoneCountryCode, setPhoneCountryCode] = useState("+57");
    const [phoneLocalNumber, setPhoneLocalNumber] = useState("");


    useEffect(() => {
        setUserAttributes({
            ...userAttributes,
            phone_number: phoneCountryCode+phoneLocalNumber
        });
    }, [phoneCountryCode, phoneLocalNumber]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (file) {
            try {
                console.log("path in user attributes BEFORE", userAttributes.picture);
                const result = await uploadData({
                    path: `images/profile-picture/${file.name}+${new Date().getTime()}`,
                    data: file,
                    options: {
                        contentType: "image/png", // contentType is optional
                    },
                }).result
                console.log("Image upload result: ", result);
                setUserAttributes({
                    ...userAttributes,
                    picture: result.path
                })
                console.log("path in user attributes AFTER", userAttributes.picture);
            } catch (error) {
                setNotificationList([...notificationList, {
                    message: `Hubo un error subiendo la imagen.`,
                    category: 'error'
                }]);
            }
        }
    }


    return (
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
                <h2 className="text-base font-semibold leading-7 text-white">Información Personal</h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                    Aca puedes actualizar tu información personal.
                </p>
            </div>

            <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full flex items-center gap-x-8">
                        <Image
                            alt={userAttributes.given_name+" "+userAttributes.family_name + " profile picture"}
                            src={profilePictureUrl ? profilePictureUrl : '/blank-profile.webp'}
                            className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                            width={96}
                            height={96}
                        />
                        <div>
                            <button
                                type="button"
                                className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                                onClick={() => document.getElementById('profile-picture-upload').click()} // on click, trigger the file input below
                            >
                                Cambiar Imagen
                            </button>
                            <input
                                type="file"
                                id="profile-picture-upload"
                                style={{display: 'none'}} //hide the button for this input
                                onChange={handleImageUpload} // when a file is selected, trigger the handleImageUpload function
                            />
                            <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-white">
                            Nombre
                        </label>
                        <div className="mt-2">
                            <input
                                id="first-name"
                                defaultValue={userAttributes.given_name}
                                onChange={(e) => setUserAttributes({
                                    ...userAttributes,
                                    given_name: e.target.value
                                })}
                                type="text"
                                autoComplete="first-name"
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="primer-apellido" className="block text-sm font-medium leading-6 text-white">
                            Primer Apellido
                        </label>
                        <div className="mt-2">
                            <input
                                id="primer-apellido"
                                defaultValue={userAttributes.family_name}
                                onChange={(e) => setUserAttributes({
                                    ...userAttributes,
                                    family_name: e.target.value
                                })}
                                type="text"
                                autoComplete="primer-apellido"
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="segundo-apellido" className="block text-sm font-medium leading-6 text-white">
                            Segundo Apellido
                        </label>
                        <div className="mt-2">
                            <input
                                id="segundo-apellido"
                                defaultValue={userAttributes.middle_name}
                                onChange={(e) => setUserAttributes({
                                    ...userAttributes,
                                    middle_name: e.target.value
                                })}
                                type="text"
                                autoComplete="segundo-apellido"
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="col-span-3">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                            Correo Electronico
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                defaultValue={userAttributes.email}
                                onChange={(e) => setUserAttributes({
                                    ...userAttributes,
                                    email: e.target.value
                                })}
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="col-span-3">
                        <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-white">
                            Numero de Telefono
                        </label>
                        <div className="mt-2">
                            <div className="mt-2 flex">
                                <select
                                    id="country-code"
                                    value={phoneCountryCode}
                                    onChange={(e) => {
                                        setPhoneCountryCode(e.target.value)
                                    }}
                                    className="block w-20 rounded-l-md border-0 bg-white/5 py-1.5 pl-2 pr-2 text-white text-center shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                >
                                    {countryCodes.map((country) => (
                                        <option key={country.code} value={country.code}>
                                            {country.label}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    id="phone-number"
                                    value={phoneLocalNumber}
                                    onChange={(e) => {
                                        setPhoneLocalNumber(e.target.value)
                                    }}
                                    autoComplete="phone-number"
                                    className="block w-full rounded-r-md border-0 bg-white/5 py-1.5 pl-2 pr-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    placeholder="Número de teléfono"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                            Nombre de Usuario
                        </label>
                        <div className="mt-2">
                            <div
                                className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                      <span className="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
                        @
                      </span>
                                <input
                                    id="username"
                                    defaultValue={userAttributes.preferred_username}
                                    onChange={(e) => setUserAttributes({
                                        ...userAttributes,
                                        preferred_username: e.target.value
                                    })}
                                    type="text"
                                    autoComplete="username"
                                    className="flex-1 border-0 bg-transparent py-1.5 pl-0.5 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="userType" className="block text-sm font-medium leading-6 text-white">
                            Tipo de Usuario
                        </label>
                        <div className="mt-2">
                            <select
                                id="personalityType"
                                defaultValue={userAttributes["custom:userType"]}
                                onChange={(e) => setUserAttributes({
                                    ...userAttributes,
                                    ["custom:userType"]: e.target.value
                                })}
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                            >
                                {userTypes.map((userType) => (
                                    <option key={userType} value={userType}>
                                        {userType}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-span-4">
                        <label htmlFor="entitiyName" className="block text-sm font-medium leading-6 text-white">
                            Nombre de Entidad
                        </label>
                        <div className="mt-2">
                            <div
                                className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                <span className="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
                                    {userAttributes.entityType}
                                </span>
                                <input
                                    id="entitiyName"
                                    defaultValue={userAttributes["custom:entityName"]}
                                    onChange={(e) => setUserAttributes({
                                        ...userAttributes,
                                        ["custom:entityName"]: e.target.value
                                    })}
                                    type="text"
                                    autoComplete="entitiyName"
                                    className="flex-1 border-0 bg-transparent py-1.5 pl-0.5 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="entityType" className="block text-sm font-medium leading-6 text-white">
                            Tipo de Entidad
                        </label>
                        <div className="mt-2">
                            <select
                                id="entityType"
                                defaultValue={userAttributes["custom:entityType"]}
                                onChange={(e) => setUserAttributes({
                                    ...userAttributes,
                                    ["custom:entityType"]: e.target.value
                                })}
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                            >
                                {entityTypes.map((userType) => (
                                    <option key={userType} value={userType}>
                                        {userType}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>

                <div className="mt-8 flex">
                    <button
                        type="submit"
                        onClick={handleUpdateUserAttributes}
                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        Guardar
                    </button>
                    <button
                        type="submit"
                        onClick={() => setEditingProfile(false)}
                        className="rounded-md mx-4 border border-gray-100 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-slate-800"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}