import { useEffect, useState } from "react";
import {
    useParams,
    useNavigate
} from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../config";

import Resenas from "../components/Resenas";

function GamePage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [game, setGame] =
        useState(null);

    const [screenshots, setScreenshots] =
        useState([]);

    const [trailers, setTrailers] =
        useState([]);

    const usuarioId =
        localStorage.getItem("usuarioId");

    useEffect(() => {

        cargarJuego();

    }, [id]);

    const cargarJuego = async () => {

        try {

            // JUEGO

            const juegoResponse =
                await axios.get(
                    `${API_URL}/rawg/juego/${id}`
                );

            setGame(juegoResponse.data);

            // SCREENSHOTS

            const screenshotsResponse =
                await axios.get(
                    `${API_URL}/rawg/juego/${id}/screenshots`
                );

            setScreenshots(
                screenshotsResponse.data.results
            );

            // TRAILERS

            const trailersResponse =
                await axios.get(
                    `${API_URL}/rawg/juego/${id}/trailers`
                );

            setTrailers(
                trailersResponse.data.results
            );

        } catch (error) {

            console.error(error);

        }

    };

    const guardarEstado = async (estado) => {

        if (!usuarioId) {

            toast.error(
                "Debes iniciar sesión"
            );

            return;
        }

        try {

            await axios.post(
                `${API_URL}/lista`,
                {
                    juegoId: game.id,

                    nombreJuego: game.name,

                    imagenJuego:
                        game.background_image,

                    estado,

                    usuario: {
                        id: usuarioId
                    }
                }
            );

            toast.success(
                `Juego marcado como ${estado}`
            );

        } catch (error) {

            console.error(error);

            toast.error(
                "Error guardando juego"
            );

        }

    };

    if (!game) {

        return (

            <div className="
                min-h-screen
                flex
                justify-center
                items-center
                text-white
                text-2xl
                md:text-4xl
                font-bold
                bg-[#020617]
                px-6
                text-center
            ">
                Cargando juego...
            </div>

        );

    }

    const limpiarDescripcion = (texto) => {

        if (!texto) return "";

        return texto
            .split("Español")[0]
            .split("Русский")[0]
            .split("Deutsch")[0];

    };

    return (

        <div className="
            min-h-screen
            text-white

            px-4
            sm:px-6
            lg:px-10

            py-24

            bg-gradient-to-br
            from-[#020617]
            via-[#050816]
            to-[#02030A]

            overflow-x-hidden
        ">

            {/* BOTON VOLVER */}

            <button
                onClick={() => navigate(-1)}
                className="
                    fixed
                    top-4
                    left-4
                    md:top-6
                    md:left-6
                    z-50

                    flex
                    items-center
                    gap-2

                    bg-red-600/90
                    backdrop-blur-xl

                    border
                    border-red-400/40

                    px-4
                    md:px-6

                    py-3

                    rounded-2xl

                    text-white
                    font-black

                    text-sm
                    md:text-lg

                    shadow-2xl
                    shadow-red-500/40

                    hover:bg-red-500
                    hover:scale-105
                    hover:border-red-300

                    transition-all
                    duration-300
                "
            >

                <span className="
                    text-lg
                    md:text-2xl
                ">
                    ←
                </span>

                Volver

            </button>

            {/* HERO */}

            <div className="
                relative
                rounded-[28px]
                lg:rounded-[40px]
                overflow-hidden
                mb-12
                border
                border-gray-800
            ">

                <img
                    src={game.background_image}
                    alt={game.name}
                    className="
                        w-full

                        h-[250px]
                        sm:h-[350px]
                        md:h-[500px]
                        xl:h-[700px]

                        object-cover
                        object-center
                    "
                />

                <div className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#020617]
                    via-[#020617]/50
                    to-transparent
                "></div>

                <div className="
                    absolute
                    bottom-0
                    left-0

                    p-4
                    sm:p-6
                    md:p-10
                ">

                    <h1 className="
                        text-3xl
                        sm:text-5xl
                        md:text-6xl
                        xl:text-7xl

                        font-black
                        mb-3
                        leading-tight
                        max-w-[90%]
                    ">
                        {game.name}
                    </h1>

                    <p className="
                        text-yellow-400

                        text-lg
                        sm:text-2xl
                        md:text-3xl

                        font-bold
                    ">
                        ⭐ {game.rating}
                    </p>

                </div>

            </div>

            {/* GENEROS */}

            <div className="
                flex
                flex-wrap
                gap-3
                md:gap-4
                mb-10
            ">

                {
                    game.genres?.map((genre) => (

                        <span
                            key={genre.id}
                            className="
                                bg-purple-600

                                px-4
                                md:px-6

                                py-2
                                md:py-3

                                rounded-2xl

                                font-bold

                                text-sm
                                md:text-lg
                            "
                        >
                            {genre.name}
                        </span>

                    ))
                }

            </div>

            {/* BOTONES */}

            <div className="
                flex
                flex-wrap
                gap-4
                mb-12
            ">

                <button
                    onClick={() =>
                        guardarEstado("PENDIENTE")
                    }
                    className="
                        flex-1
                        sm:flex-none

                        min-w-[180px]

                        px-6
                        py-4

                        rounded-2xl
                        bg-yellow-600

                        font-bold

                        text-sm
                        md:text-base

                        hover:scale-105
                        transition-all
                    "
                >
                    ⏳ Pendiente
                </button>

                <button
                    onClick={() =>
                        guardarEstado("JUGANDO")
                    }
                    className="
                        flex-1
                        sm:flex-none

                        min-w-[180px]

                        px-6
                        py-4

                        rounded-2xl
                        bg-cyan-600

                        font-bold

                        text-sm
                        md:text-base

                        hover:scale-105
                        transition-all
                    "
                >
                    🎮 Jugando
                </button>

                <button
                    onClick={() =>
                        guardarEstado("COMPLETADO")
                    }
                    className="
                        flex-1
                        sm:flex-none

                        min-w-[180px]

                        px-6
                        py-4

                        rounded-2xl
                        bg-green-600

                        font-bold

                        text-sm
                        md:text-base

                        hover:scale-105
                        transition-all
                    "
                >
                    ✅ Completado
                </button>

            </div>

            {/* INFO */}

            <div className="
                grid
                grid-cols-1
                lg:grid-cols-3
                gap-6
                mb-12
            ">

                {/* RATING */}

                <div className="
                    bg-[#111827]
                    rounded-3xl

                    p-6
                    md:p-8

                    border
                    border-gray-800
                ">

                    <h3 className="
                        text-xl
                        md:text-2xl
                        font-bold
                        mb-4
                    ">
                        ⭐ Rating
                    </h3>

                    <p className="
                        text-4xl
                        md:text-5xl

                        font-black
                        text-yellow-400
                    ">
                        {game.rating}
                    </p>

                </div>

                {/* DURACION */}

                <div className="
                    bg-[#111827]
                    rounded-3xl

                    p-6
                    md:p-8

                    border
                    border-gray-800
                ">

                    <h3 className="
                        text-xl
                        md:text-2xl
                        font-bold
                        mb-4
                    ">
                        ⏱ Duración
                    </h3>

                    <p className="
                        text-4xl
                        md:text-5xl

                        font-black
                        text-cyan-400
                    ">
                        {game.playtime || "N/D"}
                    </p>

                </div>

                {/* FECHA */}

                <div className="
                    bg-[#111827]
                    rounded-3xl

                    p-6
                    md:p-8

                    border
                    border-gray-800
                ">

                    <h3 className="
                        text-xl
                        md:text-2xl
                        font-bold
                        mb-4
                    ">
                        📅 Lanzamiento
                    </h3>

                    <p className="
                        text-lg
                        md:text-2xl

                        font-black
                        text-green-400
                    ">
                        {game.released}
                    </p>

                </div>

            </div>

            {/* TRAILER */}

            {
                trailers.length > 0
                &&
                (

                    <div className="mb-16">

                        <h2 className="
                            text-3xl
                            md:text-4xl

                            font-black
                            mb-8
                        ">
                            Trailer
                        </h2>

                        <video
                            controls
                            className="
                                w-full
                                rounded-3xl
                                border
                                border-gray-800
                            "
                        >

                            <source
                                src={trailers[0].data.max}
                                type="video/mp4"
                            />

                        </video>

                    </div>

                )
            }

            {/* SCREENSHOTS */}

            <div className="mb-16">

                <h2 className="
                    text-3xl
                    md:text-4xl

                    font-black
                    mb-8
                ">
                    Screenshots
                </h2>

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-3
                    gap-6
                ">

                    {
                        screenshots
                            .slice(0, 6)
                            .map((shot) => (

                                <img
                                    key={shot.id}
                                    src={shot.image}
                                    alt="Screenshot"
                                    className="
                                        rounded-3xl

                                        h-60
                                        md:h-72

                                        w-full
                                        object-cover
                                    "
                                />

                            ))
                    }

                </div>

            </div>

            {/* DESCRIPCION */}

            <div className="
                bg-[#111827]
                rounded-3xl

                p-6
                md:p-10

                border
                border-gray-800

                mb-16
            ">

                <h2 className="
                    text-3xl
                    md:text-4xl

                    font-black
                    mb-6
                ">
                    Descripción
                </h2>

                <p className="
                    text-gray-300

                    text-base
                    md:text-lg

                    leading-relaxed
                ">
                    {limpiarDescripcion(game.description_raw)}
                </p>

            </div>

            {/* RESEÑAS */}

            <Resenas juego={game} />

        </div>

    );

}

export default GamePage;