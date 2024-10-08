"use client"
import React, {useState} from 'react'
import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react'
import {BriefcaseIcon} from '@heroicons/react/24/outline'
import {generateClient} from 'aws-amplify/data';
import {type Schema} from '@/amplify/data/resource';
import Badge from "@/app/_elements/Badges"; // Adjust the import path as needed

// Generate the Amplify Data Client
const client = generateClient<Schema>();

interface CreateCareerModalProps {
    setOpen?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    open?: boolean,
    handleCreateCareer?: () => void
}

export default function CreateCareerModal({setOpen, open, handleCreateCareer}: CreateCareerModalProps) {
    const [careerName, setCareerName] = useState('');
    const [personalityTypesData, setPersonalityTypesData] = useState([]);

    // List of predefined Personality Types (Enums)
    const personalityTypeOptions = [
        'INTJ', 'INTP', 'ENTJ', 'ENTP',
        'INFJ', 'INFP', 'ENFJ', 'ENFP',
        'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
        'ISTP', 'ISFP', 'ESTP', 'ESFP',
    ];

    const handlePersonalityTypeChange = (index, field, value) => {
        const updatedData = [...personalityTypesData];
        updatedData[index] = {
            ...updatedData[index],
            [field]: value,
        };
        setPersonalityTypesData(updatedData);
    };

    const addPersonalityType = (type) => {
        setPersonalityTypesData([
            ...personalityTypesData,
            {personalityType: type, weight: 1},
        ]);
    };

    const removePersonalityType = (index) => {
        const updatedData = personalityTypesData.filter((_, i) => i !== index);
        setPersonalityTypesData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOpen(false);
        try {
            // Create a new Career
            const {data: careerData, errors: careerErrors} = await client.models.CareerPersonalityUniversity.create({
                // @ts-ignore TODO: fix type mismatch issue
                name: careerName,
            });

            if (careerErrors) {
                console.error('Error creating Career:', careerErrors);
                alert('An error occurred while creating the Career.');
                return;
            }

            // Create associated PersonalityTypes
            const createPromises = personalityTypesData.map(async ({personalityType, weight}) => {
                let newPersonality = {
                    acronym: personalityType,
                    weight: weight,
                    careerId: careerData.id,
                }
                // @ts-ignore TODO: fix type mismatch issue
                const {errors: ptErrors} = await client.models.PersonalityType.create(newPersonality);

                if (ptErrors) {
                    console.error('Error creating PersonalityType:', ptErrors);
                }
            });

            await Promise.all(createPromises);

            // Reset form fields
            setCareerName('');
            setPersonalityTypesData([]);
            handleCreateCareer();
        } catch (error) {
            console.error('Error during submission:', error);
            alert('An unexpected error occurred.');
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => {
                setOpen(false);
                setPersonalityTypesData([]);
                setCareerName('');
            }}
            className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div>
                            <div
                                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                <BriefcaseIcon aria-hidden="true" className="h-6 w-6 text-green-600"/>
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                    Agregando Carrera
                                </DialogTitle>
                                Agrega una nueva carrera a la base de datos de Formativa.
                            </div>
                            <Form
                                setCareerName={setCareerName}
                                personalityTypesData={personalityTypesData}
                                setPersonalityTypesData={setPersonalityTypesData}
                                personalityTypeOptions={personalityTypeOptions}
                                removePersonalityType={removePersonalityType}
                                addPersonalityType={addPersonalityType}
                                handleSubmit={handleSubmit}
                                setOpen={setOpen}
                            />
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

interface FormProps {
    personalityTypesData?: any[],
    personalityTypeOptions?: string[],
    removePersonalityType?: (index) => void,
    addPersonalityType?: (type: string) => void,
    setOpen?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    handleSubmit?: (e) => Promise<void>,
    setCareerName?: (value: (((prevState: string) => string) | string)) => void,
    setPersonalityTypesData?: (value: (((prevState: any[]) => any[]) | any[])) => void
}

function Form({
                  personalityTypesData,
                  personalityTypeOptions,
                  removePersonalityType,
                  addPersonalityType,
                  setOpen,
                  handleSubmit,
                  setCareerName,
                  setPersonalityTypesData
              }: FormProps) {
    return (
        <form>
            <div className="space-y-12">
                <div className="pb-8">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                        <div className="col-span-full">
                            <label htmlFor="career-name"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Nombre de la Carrera
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setCareerName(e.target.value)}
                                    id="career-name"
                                    name="career-name"
                                    type="text"
                                    autoComplete="career-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {personalityTypesData.length > 0 &&
                            <div className="sm:col-span-full col-span-full">
                                <label htmlFor="street-address"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Personalidades Seleccionadas:
                                </label>
                                <div className="mt-2">
                                    {personalityTypesData.map((personalityType, index) => {
                                        return (
                                            <Badge
                                                badgeType="personalityType"
                                                key={index}
                                                content={personalityType.personalityType}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        }

                        <div className="sm:col-span-full col-span-full">
                            <legend className="text-base font-semibold leading-6 text-gray-900">Personalidades</legend>
                        </div>
                        <div className="sm:col-span-1">
                            {personalityTypeOptions.slice(0, 4).map((type) => (
                                <div key={type} className="relative flex items-start py-4">
                                    <div className="mr-3 flex h-6 items-center">
                                        <input
                                            id={`personality-${type}`}
                                            name={`personality-${type}`}
                                            type="checkbox"
                                            onChange={(e) => {
                                                const index = personalityTypesData.findIndex(pt => pt.personalityType === type);
                                                e.target.checked ? addPersonalityType(type) : removePersonalityType(index);
                                            }}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1 text-sm leading-6">
                                        <label htmlFor={`personality-${type}`}
                                               className="select-none font-medium text-gray-900">
                                            {type}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="sm:col-span-1">
                            {personalityTypeOptions.slice(4, 8).map((type) => (
                                <div key={type} className="relative flex items-start py-4">
                                    <div className="mr-3 flex h-6 items-center">
                                        <input
                                            id={`personality-${type}`}
                                            name={`personality-${type}`}
                                            type="checkbox"
                                            onChange={(e) => {
                                                const index = personalityTypesData.findIndex(pt => pt.personalityType === type);
                                                e.target.checked ? addPersonalityType(type) : removePersonalityType(index);
                                            }}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1 text-sm leading-6">
                                        <label htmlFor={`personality-${type}`}
                                               className="select-none font-medium text-gray-900">
                                            {type}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="sm:col-span-1">
                            {personalityTypeOptions.slice(8, 12).map((type) => (
                                <div key={type} className="relative flex items-start py-4">
                                    <div className="mr-3 flex h-6 items-center">
                                        <input
                                            id={`personality-${type}`}
                                            name={`personality-${type}`}
                                            type="checkbox"
                                            onChange={(e) => {
                                                const index = personalityTypesData.findIndex(pt => pt.personalityType === type);
                                                e.target.checked ? addPersonalityType(type) : removePersonalityType(index);
                                            }}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1 text-sm leading-6">
                                        <label htmlFor={`personality-${type}`}
                                               className="select-none font-medium text-gray-900">
                                            {type}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="sm:col-span-1">
                            {personalityTypeOptions.slice(12).map((type) => (
                                <div key={type} className="relative flex items-start py-4">
                                    <div className="mr-3 flex h-6 items-center">
                                        <input
                                            id={`personality-${type}`}
                                            name={`personality-${type}`}
                                            type="checkbox"
                                            onChange={(e) => {
                                                const index = personalityTypesData.findIndex(pt => pt.personalityType === type);
                                                e.target.checked ? addPersonalityType(type) : removePersonalityType(index);
                                            }}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1 text-sm leading-6">
                                        <label htmlFor={`personality-${type}`}
                                               className="select-none font-medium text-gray-900">
                                            {type}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                >
                    Agregar Carrera
                </button>
                <button
                    type="button"
                    // data-autofocus="true"
                    onClick={() => {
                        setOpen(false);
                        setPersonalityTypesData([]);
                        setCareerName('');
                    }}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                >
                    Cancelar
                </button>
            </div>
        </form>
    )
}
