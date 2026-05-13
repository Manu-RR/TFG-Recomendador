function Navbar({ openLogin }) {

    const rol = localStorage.getItem("rol");

    const usuario = localStorage.getItem("usuario");

    const scrollToSection = (id) => {

        document
            .getElementById(id)
            ?.scrollIntoView({
                behavior: "smooth"
            });

    };

    return (

        <nav className="
            fixed
            top-0
            left-0
            w-full
            z-50

            overflow-y-hidden

            backdrop-blur-xl
            bg-[#0B1120]/80
            border-b
            border-white/10
            shadow-2xl
        ">

            <div className="
                w-full

                px-4
                md:px-6
                xl:px-8

                py-4

                flex
                items-center
                justify-between

                gap-4
            ">

                {/* LOGO */}

                <h1
                    className="
                        flex-shrink-0

                        text-2xl
                        md:text-3xl
                        xl:text-4xl

                        font-black
                        tracking-tight
                        cursor-pointer

                        hover:scale-105
                        transition-all
                        duration-300
                    "
                    onClick={() =>
                        scrollToSection("inicio")
                    }
                >

                    <span className="
                        bg-gradient-to-r
                        from-purple-500
                        via-fuchsia-500
                        to-pink-500
                        text-transparent
                        bg-clip-text
                    ">
                        NEXUS
                    </span>

                    <span className="
                        bg-gradient-to-r
                        from-cyan-400
                        to-blue-500
                        text-transparent
                        bg-clip-text
                    ">
                        PLAY
                    </span>

                </h1>

                {/* MENU */}

                <div className="
                    flex
                    items-center

                    gap-3
                    lg:gap-5
                    xl:gap-7

                    overflow-x-auto
                    overflow-y-hidden

                    scrollbar-hide

                    max-w-full
                ">

                    {/* INICIO */}

                    <button
                        onClick={() =>
                            scrollToSection("inicio")
                        }
                        className="
                            relative
                            text-gray-300
                            hover:text-cyan-400
                            transition-all
                            duration-300
                            font-semibold
                            text-xs
                            lg:text-sm
                            xl:text-base
                            group
                        "
                    >

                        Inicio

                        <span className="
                            absolute
                            left-0
                            -bottom-2
                            w-0
                            h-[2px]
                            bg-cyan-400
                            transition-all
                            duration-300
                            group-hover:w-full
                        "></span>

                    </button>

                    {/* JUEGOS */}

                    <button
                        onClick={() =>
                            scrollToSection("juegos")
                        }
                        className="
                            relative
                            text-gray-300
                            hover:text-purple-400
                            transition-all
                            duration-300
                            font-semibold
                            text-xs
                            lg:text-sm
                            xl:text-base
                            group
                        "
                    >

                        Juegos

                        <span className="
                            absolute
                            left-0
                            -bottom-2
                            w-0
                            h-[2px]
                            bg-purple-400
                            transition-all
                            duration-300
                            group-hover:w-full
                        "></span>

                    </button>

                    {/* GENEROS */}

                    <button
                        onClick={() =>
                            scrollToSection("generos")
                        }
                        className="
                            relative
                            text-gray-300
                            hover:text-pink-400
                            transition-all
                            duration-300
                            font-semibold
                            text-xs
                            lg:text-sm
                            xl:text-base
                            group
                        "
                    >

                        Géneros

                        <span className="
                            absolute
                            left-0
                            -bottom-2
                            w-0
                            h-[2px]
                            bg-pink-400
                            transition-all
                            duration-300
                            group-hover:w-full
                        "></span>

                    </button>

                    {/* FAVORITOS */}

                    <button
                        onClick={() =>
                            scrollToSection("favoritos")
                        }
                        className="
                            relative
                            text-gray-300
                            hover:text-yellow-400
                            transition-all
                            duration-300
                            font-semibold
                            text-xs
                            lg:text-sm
                            xl:text-base
                            group
                        "
                    >

                        Favoritos

                        <span className="
                            absolute
                            left-0
                            -bottom-2
                            w-0
                            h-[2px]
                            bg-yellow-400
                            transition-all
                            duration-300
                            group-hover:w-full
                        "></span>

                    </button>

                    {/* DESCUBRIR */}

                    <button
                        onClick={() =>
                            scrollToSection("recomendados")
                        }
                        className="
                            relative
                            text-gray-300
                            hover:text-cyan-400
                            transition-all
                            duration-300
                            font-semibold
                            text-xs
                            lg:text-sm
                            xl:text-base
                            group
                        "
                    >

                        Descubrir

                        <span className="
                            absolute
                            left-0
                            -bottom-2
                            w-0
                            h-[2px]
                            bg-cyan-400
                            transition-all
                            duration-300
                            group-hover:w-full
                        "></span>

                    </button>

                    {/* ADMIN */}

                    {
                        rol === "ADMIN"
                        &&
                        usuario
                        &&
                        (

                            <button
                                onClick={() =>
                                    scrollToSection("admin")
                                }
                                className="
                                    relative
                                    text-red-400
                                    hover:text-red-300
                                    transition-all
                                    duration-300
                                    font-bold
                                    text-xs
                                    lg:text-sm
                                    xl:text-base
                                    group
                                "
                            >

                                Admin

                                <span className="
                                    absolute
                                    left-0
                                    -bottom-2
                                    w-0
                                    h-[2px]
                                    bg-red-400
                                    transition-all
                                    duration-300
                                    group-hover:w-full
                                "></span>

                            </button>

                        )
                    }

                </div>

                {/* USER AREA */}

                {
                    usuario

                    ? (

                        <div className="
                            flex
                            items-center

                            gap-2

                            shrink-0
                        ">

                            {/* USER */}

                            <div className="
                                flex
                                items-center

                                gap-3
                                lg:gap-5
                                xl:gap-7

                                overflow-x-auto
                                overflow-y-hidden

                                scrollbar-hide

                                max-w-full
                            ">

                                <div className="
                                    w-2.5
                                    h-2.5
                                    rounded-full
                                    bg-green-400
                                    shadow-[0_0_10px_rgba(74,222,128,0.8)]
                                "></div>

                                <span className="
                                    text-white
                                    font-semibold
                                    text-sm
                                    xl:text-base
                                ">
                                    Hola {usuario}
                                </span>

                            </div>

                            {/* PERFIL */}

                            <button
                                onClick={() => {

                                    document
                                        .getElementById("perfil")
                                        ?.scrollIntoView({
                                            behavior: "smooth"
                                        });

                                }}
                                className="
                                    px-3
                                    sm:px-5

                                    py-2

                                    rounded-xl

                                    bg-gradient-to-r
                                    from-cyan-500
                                    to-blue-600

                                    hover:scale-105

                                    transition-all

                                    font-bold

                                    text-xs
                                    lg:text-sm
                                    xl:text-base
                                "
                            >
                                Perfil
                            </button>

                            {/* LOGOUT */}

                            <button
                                onClick={() => {

                                    localStorage.removeItem("token");

                                    localStorage.removeItem("usuario");

                                    localStorage.removeItem("rol");

                                    localStorage.removeItem("usuarioId");

                                    window.location.reload();

                                }}
                                className="
                                    bg-gradient-to-r
                                    from-red-600
                                    to-red-500

                                    hover:scale-105
                                    hover:shadow-[0_0_20px_rgba(239,68,68,0.45)]

                                    px-4
                                    sm:px-6

                                    py-2
                                    sm:py-3

                                    rounded-2xl

                                    font-bold

                                    text-xs
                                    lg:text-sm
                                    xl:text-base

                                    transition-all
                                    duration-300
                                "
                            >
                                <span className="hidden sm:inline">
                                    Cerrar sesión
                                </span>

                                <span className="sm:hidden">
                                    Salir
                                </span>
                            </button>

                        </div>

                    )

                    : (

                        <button
                            onClick={openLogin}
                            className="
                                bg-gradient-to-r
                                from-purple-600
                                to-pink-500

                                hover:scale-105
                                hover:shadow-[0_0_25px_rgba(168,85,247,0.45)]

                                px-4
                                sm:px-7

                                py-2
                                sm:py-3

                                rounded-2xl

                                font-bold

                                text-xs
                                lg:text-sm
                                xl:text-base

                                transition-all
                                duration-300
                            "
                        >
                            Iniciar sesión
                        </button>

                    )
                }

            </div>

        </nav>

    );

}

export default Navbar;