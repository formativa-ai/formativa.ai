import {TiPlus} from "react-icons/ti";

const jobOpenings = [
    {
        id: 1,
        role: 'Analista Jr. Crecimiento y Mercadeo',
        href: '#',
        description1: 'Este rol implica una variedad de responsabilidades, desde el manejo de redes sociales y la planificación ' +
            'y creación de contenido, hasta el apoyo en el crecimiento del negocio mediante la recopilación de datos,  preparación ' +
            'de propuestas de negocio y soporte administrativo general.',

        salary: '$1.500.000-$2.300.000 / mes (con prestaciones)',
        location: 'Zona El Cable, Manizales (Lunes a Viernes - presencial)',
    }
]

export default function ListaOportunidades() {
    return (
        <div id="oportunidades" className="bg-white py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Buscamos Talento Como el Tuyo
                    </h2>
                    <p className="mt-6 text-xl leading-8 text-gray-600">
                        ¿Eres una persona creativa, organizada y disciplinada? ¿Visualizas un futuro lleno de oportunidades para el talento joven Colombiano?
                        <br/><br/>
                        ¡Únete a nuestro equipo, y ayúdanos a crear un futuro más brillante!
                    </p>
                </div>
                <div className="mx-auto flex max-w-2xl flex-col justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
                    <div className="w-full lg:max-w-lg lg:flex-auto">
                        <img
                            alt=""
                            src="/oficina-formativa-ai.webp"
                            className="mt-16 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
                        />
                    </div>
                    <div className="mt-16 w-full lg:max-w-xl lg:flex-auto">
                        <h3 className="sr-only">Job openings</h3>
                        <ul className="-my-8 divide-y divide-gray-100">
                            { jobOpenings.map((opening) => (
                                <li key={opening.id} className="py-8">
                                    <dl className="relative flex flex-wrap gap-x-3">
                                        <dt className="sr-only">Role</dt>
                                        <dd className="w-full flex-none text-lg font-semibold tracking-tight text-gray-900">
                                            <a href={opening.href}>
                                                {opening.role}
                                                <span aria-hidden="true" className="absolute inset-0" />
                                            </a>
                                        </dd>
                                        <dt className="sr-only">Description</dt>
                                                <dd className="mt-1 w-full flex-none text-base leading-7 text-gray-600">
                                                    <div className="inline-flex items-center">
                                                        {opening.description1}
                                                    </div>
                                                </dd>
                                        <dt className="sr-only">Salary</dt>
                                        {/*<dd className="mt-4 text-base font-semibold leading-7 text-gray-900">{opening.salary}</dd>*/}
                                        <dt className="sr-only">Location</dt>
                                        <dd className="mt-4 flex items-center gap-x-3 text-base leading-7 text-gray-500">
                                            <svg viewBox="0 0 2 2" aria-hidden="true" className="h-0.5 w-0.5 flex-none fill-gray-300">
                                                <circle r={1} cx={1} cy={1} />
                                            </svg>
                                            {opening.location}
                                        </dd>
                                    </dl>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 flex border-t border-gray-100 pt-8">
                            <a href="/Analista%20Jr.%20Crecimiento%20y%20Mercadeo.pdf" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Ver descripcion completa <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
