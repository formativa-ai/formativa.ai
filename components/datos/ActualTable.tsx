import Badge from "@/app/_elements/Badges";

import {XMarkIcon} from '@heroicons/react/24/outline'

const people = [
    {name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member'},
    // More people...
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

interface ActualTableProps {
    careersData?: any[],
    personalityTypesData?: any[],
    setCreateCareerModalOpen?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setDeleteCareerModalOpen?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setSelectedCareer?: (value: unknown) => void
}

export default function ActualTable({
                                        careersData,
                                        personalityTypesData,
                                        setCreateCareerModalOpen,
                                        setDeleteCareerModalOpen,
                                        setSelectedCareer
                                    }: ActualTableProps) {
    return (
        <div className="bg-gray-900">
            <div className="mx-auto max-w-7xl">
                <div className="bg-gray-900 py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-base font-semibold leading-6 text-white">Carreras</h1>
                                <p className="mt-2 text-sm text-gray-300">
                                    Una lista de todas las carreras en la base de datos de Formativa.
                                </p>
                            </div>
                            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                <button
                                    onClick={() => setCreateCareerModalOpen(true)}
                                    type="button"
                                    className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    Agrergar Carrera
                                </button>
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-700">
                                        <thead>
                                        <tr>
                                            <th scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                                                Nombre de Carrera
                                            </th>
                                            <th scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                Personalidades
                                            </th>
                                            <th scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                Universidades
                                            </th>
                                            {/*<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">*/}
                                            {/*    Role*/}
                                            {/*</th>*/}
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                <span className="sr-only">Borrar</span>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-800">
                                        {careersData.map((career) => (
                                            <tr key={career.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                                    {career.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                                    {personalityTypesData
                                                        .filter((personalityType) => personalityType.careerId === career.id)
                                                        .map((personalityType) => {
                                                            return (
                                                                <Badge
                                                                    badgeType="personalityType"
                                                                    key={personalityType.id}
                                                                    content={personalityType.acronym}
                                                                />
                                                            )
                                                        })}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">**Aqui
                                                    van las universidades**
                                                </td>
                                                {/*<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{person.role}</td>*/}
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedCareer(career)
                                                            setDeleteCareerModalOpen(true)
                                                        }}
                                                        type="button"
                                                        className="mr-2 inline-flex rounded-md p-1.5 text-indigo-400 hover:bg-gray-800 focus:outline-none focus:ring-2"
                                                    >
                                                        <span className="sr-only">Dismiss</span>
                                                        <XMarkIcon aria-hidden="true" className="h-4 w-4"/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
