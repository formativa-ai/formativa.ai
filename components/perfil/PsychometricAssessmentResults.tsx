import React from "react";
import {FetchUserAttributesOutput} from "aws-amplify/auth";

interface PsychometricAssessmentResultsProps {
    userAttributes?: FetchUserAttributesOutput,
    setUserAttributes?: (value: (((prevState: FetchUserAttributesOutput) => FetchUserAttributesOutput) | FetchUserAttributesOutput)) => void,
    handleUpdateUserAttributes?: () => Promise<void>,
    setEditingProfile?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export function PsychometricAssessmentResults({
                                                  userAttributes,
                                                  setUserAttributes,
                                                  handleUpdateUserAttributes,
                                                  setEditingProfile
                                              }: PsychometricAssessmentResultsProps) {
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
    return (
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
                <h2 className="text-base font-semibold leading-7 text-white">Perfil Psicometrico</h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                    Use a permanent address where you can receive mail.
                </p>
            </div>

            <div className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">

                    <div className="col-span-full">
                        <label htmlFor="timezone" className="block text-sm font-medium leading-6 text-white">
                            Tipo de Personalidad
                        </label>
                        <div className="mt-2">
                            <select
                                id="personalityType"
                                defaultValue={userAttributes["custom:personalityType"]}
                                onChange={(e) => setUserAttributes({
                                    ...userAttributes,
                                    ["custom:personalityType"]: e.target.value
                                })}
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                            >
                                {personalityTypes.map((personalityType) => (
                                    <option key={personalityType} value={personalityType}>
                                        {personalityType}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="realistic" className="block text-sm font-medium leading-6 text-white">
                            Realista
                        </label>
                        <div className="mt-2">
                            <input
                                id="realistic"
                                defaultValue={userAttributes["custom:realistic"]}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    let numberValue = parseInt(value, 10);

                                    // Adjust the number to be within the range 0-10
                                    if (numberValue > 10) numberValue = 10;
                                    if (numberValue < 0) numberValue = 0;

                                    setUserAttributes({
                                        ...userAttributes,
                                        ["custom:realistic"]: numberValue.toString(),
                                    });
                                }}
                                type="number" min="0" max="10" step="1"
                                autoComplete="realistic"
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="investigative" className="block text-sm font-medium leading-6 text-white">
                            Investigativo
                        </label>
                        <div className="mt-2">
                            <input
                                id="investigative"
                                defaultValue={userAttributes["custom:investigative"]}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    let numberValue = parseInt(value, 10);

                                    // Adjust the number to be within the range 0-10
                                    if (numberValue > 10) numberValue = 10;
                                    if (numberValue < 0) numberValue = 0;

                                    setUserAttributes({
                                        ...userAttributes,
                                        ["custom:investigative"]: numberValue.toString(),
                                    });
                                }}
                                type="number" min="0" max="10" step="1"
                                autoComplete="investigative"
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="artistic" className="block text-sm font-medium leading-6 text-white">
                            Artistico
                        </label>
                        <div className="mt-2">
                            <input
                                id="artistic"
                                defaultValue={userAttributes["custom:artistic"]}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    let numberValue = parseInt(value, 10);

                                    // Adjust the number to be within the range 0-10
                                    if (numberValue > 10) numberValue = 10;
                                    if (numberValue < 0) numberValue = 0;

                                    setUserAttributes({
                                        ...userAttributes,
                                        ["custom:artistic"]: numberValue.toString(),
                                    });
                                }}
                                type="number" min="0" max="10" step="1"
                                autoComplete="artistic"
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>


                    <div className="sm:col-span-2">
                        <label htmlFor="social" className="block text-sm font-medium leading-6 text-white">
                            Social
                        </label>
                        <div className="mt-2">
                            <input
                                id="social"
                                defaultValue={userAttributes["custom:social"]}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    let numberValue = parseInt(value, 10);

                                    // Adjust the number to be within the range 0-10
                                    if (numberValue > 10) numberValue = 10;
                                    if (numberValue < 0) numberValue = 0;

                                    setUserAttributes({
                                        ...userAttributes,
                                        ["custom:social"]: numberValue.toString(),
                                    });
                                }}
                                type="number" min="0" max="10" step="1"
                                autoComplete="social"
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="enterprising" className="block text-sm font-medium leading-6 text-white">
                            Emprendedor
                        </label>
                        <div className="mt-2">
                            <input
                                id="enterprising"
                                defaultValue={userAttributes["custom:enterprising"]}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    let numberValue = parseInt(value, 10);

                                    // Adjust the number to be within the range 0-10
                                    if (numberValue > 10) numberValue = 10;
                                    if (numberValue < 0) numberValue = 0;

                                    setUserAttributes({
                                        ...userAttributes,
                                        ["custom:enterprising"]: numberValue.toString(),
                                    });
                                }}
                                type="number" min="0" max="10" step="1"
                                autoComplete="enterprising"
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="conventional" className="block text-sm font-medium leading-6 text-white">
                            Convencional
                        </label>
                        <div className="mt-2">
                            <input
                                id="conventional"
                                defaultValue={userAttributes["custom:conventional"]}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    let numberValue = parseInt(value, 10);

                                    // Adjust the number to be within the range 0-10
                                    if (numberValue > 10) numberValue = 10;
                                    if (numberValue < 0) numberValue = 0;

                                    setUserAttributes({
                                        ...userAttributes,
                                        ["custom:conventional"]: numberValue.toString(),
                                    });
                                }}
                                type="number" min="0" max="10" step="1"
                                autoComplete="conventional"
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
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