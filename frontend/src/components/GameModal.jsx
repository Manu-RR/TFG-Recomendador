import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL } from "../config";
import Resenas from "./Resenas";

function GameModal({
    game,
    onClose,
    recargarPerfil
}) {

    const [screenshots, setScreenshots] = useState([]);
    const [trailers, setTrailers] = useState([]);
    const usuarioId =
        localStorage.getItem("usuarioId");

    const [estadoJuego, setEstadoJuego] =
        useState("");

    useEffect(() => {

        if (game) {

            // SCREENSHOTS
            axios
                .get(
                    `${API_URL}/rawg/juego/${game.id}/screenshots`
                )
                .then((response) => {

                    setScreenshots(response.data.results);

                })
                .catch((error) => {

                    console.error(error);

                });

            // TRAILERS
            axios
                .get(
                    `${API_URL}/rawg/juego/${game.id}/trailers`
                )
                .then((response) => {

                    setTrailers(response.data.results);

                })
                .catch((error) => {

                    console.error(error);

                });

        }

    }, [game]);

    const guardarEstado = async (estado) => {

        if (!usuarioId) return;

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

            setEstadoJuego(estado);

            window.location.reload();

        } catch (error) {

            console.error(error);

        }
    };

    if (!game) return null;


    return (

        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-50 p-6 overflow-hidden">

            <motion.div
                initial={{
                    scale: 0.9,
                    opacity: 0,
                    y: 50
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    y: 0
                }}
                transition={{ duration: 0.3 }}
                className="relative bg-[#0B1120]/80 rounded-3xl overflow-y-auto max-h-[90vh] max-w-5xl w-full border border-white/10 backdrop-blur-xl shadow-[0_0_80px_rgba(168,85,247,0.25)]" onClick={(e) => e.stopPropagation()}
            >

                {/* IMAGEN */}
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full max-h-[450px] object-contain bg-black"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B112080] to-transparent"></div>

                {/* CONTENIDO */}
                <div className="p-8 relative z-10">

                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        {game.name}
                    </h2>

                    <div className="text-yellow-400 text-2xl font-bold mb-6">
                        ⭐ {game.rating}
                        <div className="flex gap-6 mb-6 text-gray-300 font-semibold">

                            <p>
                                🎯 Dificultad: {game.dificultad}/5
                            </p>

                            <p>
                                ⏱ {game.duracion} horas
                            </p>

                        </div>
                    </div>

                    {/* GENEROS */}
                    <div className="flex flex-wrap gap-3 mb-6">

                        {game.genres?.map((genre) => (

                            <span
                                key={genre.id}
                                className="bg-purple-600 px-4 py-2 rounded-full text-sm font-semibold"
                            >
                                {genre.name}
                            </span>

                        ))}

                    </div>

                    <div className="
                        flex
                        flex-wrap
                        gap-4
                        mt-8
                    ">

                        <button
                            onClick={() =>
                                guardarEstado("PENDIENTE")
                            }
                            className="
                                px-5
                                py-3
                                rounded-2xl
                                bg-yellow-600
                                hover:scale-105
                                transition-all
                                font-bold
                            "
                        >
                            ⏳ Pendiente
                        </button>

                        <button
                            onClick={() =>
                                guardarEstado("JUGANDO")
                            }
                            className="
                                px-5
                                py-3
                                rounded-2xl
                                bg-cyan-600
                                hover:scale-105
                                transition-all
                                font-bold
                            "
                        >
                            🎮 Jugando
                        </button>

                        <button
                            onClick={() =>
                                guardarEstado("COMPLETADO")
                            }
                            className="
                                px-5
                                py-3
                                rounded-2xl
                                bg-green-600
                                hover:scale-105
                                transition-all
                                font-bold
                            "
                        >
                            ✅ Completado
                        </button>

                    </div>

                    {/* FECHA */}
                    <p className="text-gray-400 mb-4">
                        Fecha lanzamiento: {game.released}
                    </p>

                    {/* BOTON */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-50 bg-red-600 hover:bg-red-500 px-6 py-3 rounded-2xl font-bold transition-all"                    >
                        Cerrar
                    </button>

                    {/* TRAILER */}

                    {trailers.length > 0 ? (

                        <div className="mt-10">

                            <h3 className="text-2xl font-bold text-white mb-6">
                                Trailer
                            </h3>

                            <video
                                controls
                                autoPlay
                                muted
                                loop
                                className="w-full rounded-3xl border border-gray-800 shadow-2xl"
                            >

                                <source
                                    src={trailers[0].data.max}
                                    type="video/mp4"
                                />

                            </video>

                        </div>

                    ) : (

                        <div className="mt-10 bg-[#111827] border border-gray-800 rounded-3xl p-8 text-center">

                            <h3 className="text-2xl font-bold text-white mb-3">
                                🎥 Trailer no disponible
                            </h3>

                            <p className="text-gray-400">
                                Este juego no tiene trailer disponible en RAWG API.
                            </p>

                        </div>

                    )}

                    {/* SCREENSHOTS */}

                    <div className="mt-10">

                        <h3 className="text-2xl font-bold text-white mb-6">
                            Screenshots
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                            {screenshots.slice(0, 6).map((shot) => (

                                <img
                                    key={shot.id}
                                    src={shot.image}
                                    alt="Screenshot"
                                    className="rounded-2xl h-48 w-full object-cover hover:scale-105 hover:brightness-110 transition-all duration-300"
                                />

                            ))}

                        </div>
                        {/* RESEÑAS */}

                        <div className="mt-12">

                            <Resenas juego={game} />

                        </div>
                    </div>
                </div>

            </motion.div>

        </div>

    );
}

export default GameModal;