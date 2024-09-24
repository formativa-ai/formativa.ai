

export default function Footer({background}) {
    return (
        <footer className={"mt-auto pb-8 "+background}>
            <div className="">
                <p className="text-center font-bold text-s text-gray-500">
                    Hecho con orgullo en Manizales, Colombia <span className="mx-1">🇨🇴</span>
                </p>
                <p className="mt-6 text-center text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} Formativa AI. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    )
}
