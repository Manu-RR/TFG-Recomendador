import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Resenas({ juego }) {

    const [comentario, setComentario] =
        useState("");

    const [puntuacion, setPuntuacion] =
        useState(5);

    const [hover, setHover] =
        useState(null);

    const [resenas, setResenas] =
        useState([]);

    const usuarioId =
        localStorage.getItem("usuarioId");

    useEffect(() => {

        cargarResenas();

    }, []);

    const cargarResenas = () => {

        axios
            .get(
                `${import.meta.env.VITE_API_URL}/resenas/${juego.id}`
            )
            .then((response) => {

                setResenas(response.data);

            });

    };

    const publicarResena = async () => {

        if (!usuarioId) return;

        if (!comentario.trim()) return;

        await axios.post(
            `${import.meta.env.VITE_API_URL}/resenas`,
            {
                juegoId: juego.id,
                nombreJuego: juego.name,
                comentario,
                puntuacion,
                usuario: {
                    id: usuarioId
                }
            }
        );

        setComentario("");

        setPuntuacion(5);

        cargarResenas();

    };

    const eliminarResena = async (id) => {

        await axios.delete(
            `${import.meta.env.VITE_API_URL}/resenas/${id}`
        );

        cargarResenas();

    };

    const media =
        resenas.length > 0
            ? (
                  resenas.reduce(
                      (acc, r) =>
                          acc + r.puntuacion,
                      0
                  ) / resenas.length
              ).toFixed(1)
            : 0;

    return (

        <div className="mt-16">

            {/* HEADER */}

            <div className="
                flex
                justify-between
                items-center
                mb-8
            ">

                <div>

                    <h3 className="
                        text-3xl
                        font-black
                        text-white
                    ">
                        Reseñas
                    </h3>

                    <p className="text-gray-400 mt-2">
                        {resenas.length} opiniones
                    </p>

                </div>

                <div className="
                    bg-[#111827]
                    px-6
                    py-4
                    rounded-2xl
                    border
                    border-yellow-500/20
                ">

                    <p className="
                        text-yellow-400
                        text-3xl
                        font-black
                    ">
                        ⭐ {media}
                    </p>

                </div>

            </div>

            {/* FORM */}

            {usuarioId && (

                <div className="
                    bg-[#111827]
                    border
                    border-gray-800
                    rounded-3xl
                    p-6
                    mb-10
                ">

                    <textarea
                        value={comentario}
                        onChange={(e) =>
                            setComentario(e.target.value)
                        }
                        placeholder="Escribe tu reseña..."
                        className="
                            w-full
                            bg-[#0B1120]
                            border
                            border-gray-700
                            rounded-2xl
                            p-5
                            text-white
                            focus:outline-none
                            focus:border-purple-500
                            resize-none
                            h-32
                        "
                    />

                    {/* STARS */}

                    <div className="
                        flex
                        items-center
                        gap-2
                        mt-5
                    ">

                        {[1, 2, 3, 4, 5].map((star) => (

                            <button
                                key={star}
                                onClick={() =>
                                    setPuntuacion(star)
                                }
                                onMouseEnter={() =>
                                    setHover(star)
                                }
                                onMouseLeave={() =>
                                    setHover(null)
                                }
                                className="
                                    text-4xl
                                    transition-all
                                "
                            >

                                <span
                                    className={
                                        star <=
                                        (hover || puntuacion)
                                            ? "text-yellow-400"
                                            : "text-gray-600"
                                    }
                                >
                                    ★
                                </span>

                            </button>

                        ))}

                    </div>

                    <button
                        onClick={publicarResena}
                        className="
                            mt-6
                            px-8
                            py-4
                            rounded-2xl
                            bg-gradient-to-r
                            from-purple-600
                            to-pink-500
                            hover:scale-105
                            transition-all
                            font-bold
                            shadow-lg
                            shadow-purple-500/20
                        "
                    >
                        Publicar reseña
                    </button>

                </div>

            )}

            {/* LISTA */}

            <div className="space-y-6">

                {resenas.map((r) => (

                    <motion.div
                        key={r.id}
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        className="
                            bg-[#111827]
                            border
                            border-gray-800
                            rounded-3xl
                            p-6
                        "
                    >

                        <div className="
                            flex
                            flex-col
                            sm:flex-row
                            justify-between
                            items-start
                            gap-5
                        ">

                            <div className="flex gap-4">

                                {/* AVATAR */}

                                <div className="
                                    w-14
                                    h-14
                                    rounded-full
                                    bg-gradient-to-r
                                    from-purple-500
                                    to-cyan-500
                                    flex
                                    items-center
                                    justify-center
                                    text-white
                                    font-black
                                    text-xl
                                ">

                                    {r.usuario?.nombre
                                        ?.charAt(0)
                                        ?.toUpperCase()}

                                </div>

                                <div>

                                    <h4 className="
                                        text-xl
                                        font-bold
                                        text-white
                                    ">
                                        {r.usuario?.nombre}
                                    </h4>

                                    <p className="
                                        text-yellow-400
                                        text-lg
                                    ">
                                        {"★".repeat(
                                            r.puntuacion
                                        )}
                                    </p>

                                    <p className="
                                        text-gray-300
                                        mt-3
                                    ">
                                        {r.comentario}
                                    </p>

                                    <p className="
                                        text-gray-500
                                        text-sm
                                        mt-4
                                    ">
                                        {new Date(
                                            r.fecha
                                        ).toLocaleDateString()}
                                    </p>

                                </div>

                            </div>

                            {/* BORRAR */}

                            {
                                (
                                    String(r.usuario?.id) === usuarioId
                                    ||
                                    localStorage.getItem("rol") === "ADMIN"
                                )
                                &&
                                (

                                    <button
                                        onClick={() =>
                                            eliminarResena(r.id)
                                        }
                                        className="
                                            bg-red-600
                                            hover:bg-red-500

                                            px-4
                                            sm:px-5

                                            py-2

                                            rounded-xl

                                            font-bold
                                            text-sm
                                            sm:text-base

                                            transition-all
                                            duration-300

                                            hover:scale-105
                                        "
                                    >
                                        Borrar
                                    </button>

                                )
                            }

                        </div>

                    </motion.div>

                ))}

            </div>

        </div>

    );
}

export default Resenas;