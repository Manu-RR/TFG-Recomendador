import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function GameList() {

    const [games, setGames] = useState([]);

    const [search, setSearch] =
        useState("");

    const [selectedGenre, setSelectedGenre] =
        useState("Todos");

    const [minRating, setMinRating] =
        useState(0);

    const [sortBy, setSortBy] =
        useState("");

    const [favorites, setFavorites] =
        useState([]);

    const [recomendados, setRecomendados] =
        useState([]);

    const usuarioId =
        localStorage.getItem("usuarioId");

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    // GENEROS

    const genres = [

        "Todos",

        ...new Set(

            games.flatMap(game =>
                game.genres.map(g => g.name)
            )

        )

    ];

    // FAVORITOS

    const toggleFavorite = async (game) => {

        if (!usuarioId) {

            toast.error("Debes iniciar sesión");

            return;
        }

        const exists = favorites.find(
            fav => fav.juegoId === game.id
        );

        // ELIMINAR

        if (exists) {

            try {

                await axios.delete(
                    `${API_URL}/favoritos/${exists.id}`
                );

                setFavorites(
                    favorites.filter(
                        fav => fav.id !== exists.id
                    )
                );

                toast.error("Eliminado de favoritos");

            } catch (error) {

                console.error(error);

            }

        }

        // AÑADIR

        else {

            try {

                const nuevoFavorito = {

                    juegoId: game.id,

                    nombreJuego: game.name,

                    imagenJuego:
                        game.background_image

                };

                const response = await axios.post(
                    `${API_URL}/favoritos/${usuarioId}`,
                    nuevoFavorito
                );

                setFavorites([
                    ...favorites,
                    response.data
                ]);

                toast.success("Añadido a favoritos");

            } catch (error) {

                console.error(error);

            }

        }

    };

    // CARGAR DATOS

    useEffect(() => {

        // FAVORITOS

        if (usuarioId) {

            axios
                .get(
                    `${API_URL}/favoritos/${usuarioId}`
                )
                .then((response) => {

                    setFavorites(response.data);

                })
                .catch((error) => {

                    console.error(
                        "Error cargando favoritos",
                        error
                    );

                });

        }

        // RECOMENDACIONES

        if (usuarioId) {

            axios
                .get(
                    `${API_URL}/recomendaciones/${usuarioId}`
                )
                .then((response) => {

                    setRecomendados(
                        response.data.results || []
                    );

                })
                .catch((error) => {

                    console.error(
                        "Error recomendaciones",
                        error
                    );

                });

        }

        // JUEGOS

        axios
            .get(`${API_URL}/rawg/juegos`)
            .then((response) => {

                const juegosConDatos =
                    response.data.results.map(
                        (game) => {

                            let dificultad = 3;

                            if (
                                game.genres.some(
                                    g =>
                                        g.name.includes("Shooter")
                                        ||
                                        g.name.includes("Strategy")
                                )
                            ) {

                                dificultad = 4;

                            }

                            if (
                                game.genres.some(
                                    g =>
                                        g.name.includes("Platformer")
                                )
                            ) {

                                dificultad = 2;

                            }

                            return {

                                ...game,

                                dificultad,

                                duracion: game.playtime

                            };

                        }
                    );

                setGames(juegosConDatos);

            })
            .catch((error) => {

                console.error(
                    "Error obteniendo juegos:",
                    error
                );

            })
            .finally(() => {

                setLoading(false);

            });

    }, [usuarioId]);

    // FILTROS

    const juegosFiltrados = games

        .filter((game) =>

            game.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

        )

        .filter((game) =>

            selectedGenre === "Todos"

            ||

            game.genres.some(
                g =>
                    g.name === selectedGenre
            )

        )

        .filter((game) =>

            game.rating >= minRating

        )

        .sort((a, b) => {

            if (sortBy === "rating") {

                return (
                    b.rating - a.rating
                );

            }

            if (sortBy === "name") {

                return a.name
                    .localeCompare(
                        b.name
                    );

            }

            return 0;

        });

        if (loading) {

            return (

                <div className="
                    min-h-screen
                    flex
                    justify-center
                    items-center
                    bg-[#0B1120]
                ">

                    <div className="
                        w-20
                        h-20
                        border-4
                        border-cyan-400
                        border-t-transparent
                        rounded-full
                        animate-spin
                    "></div>

                </div>

            );
        }


    return (

        <>

            {/* FAVORITOS */}

            {
                favorites.length > 0
                &&
                (

                    <section
                        id="favoritos"
                        className="
                            px-4
                            sm:px-6
                            lg:px-8
                            pt-32
                            pb-10
                        "
                    >

                        <h2 className="
                            text-3xl
                            sm:text-4xl
                            font-black
                            text-pink-400
                            mb-8
                        ">
                            Tus favoritos
                        </h2>

                        <div className="
                            flex
                            gap-6
                            overflow-x-auto
                            pb-4
                            scrollbar-hide
                        ">

                            {favorites.map((game) => (

                                <div
                                    key={game.id}
                                    className="
                                        min-w-[220px]
                                        sm:min-w-[240px]
                                        lg:min-w-[260px]
                                        bg-[#111827]
                                        rounded-3xl
                                        overflow-hidden
                                        border
                                        border-pink-500/30
                                    "
                                >

                                    <img
                                        src={game.imagenJuego}
                                        alt={game.nombreJuego}
                                        className="
                                            w-full
                                            h-36
                                            sm:h-40
                                            object-cover
                                        "
                                    />

                                    <div className="p-4">

                                        <h3 className="
                                            text-white
                                            font-bold
                                            line-clamp-1
                                        ">
                                            {game.nombreJuego}
                                        </h3>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </section>

                )
            }

            {/* RECOMENDACIONES */}

            {
                recomendados.length > 0
                &&
                (

                    <section
                        id="recomendados"
                        className="
                            px-4
                            sm:px-6
                            lg:px-8
                            pt-10
                            pb-20
                        "
                    >

                        <h2 className="
                            text-3xl
                            sm:text-4xl
                            font-black
                            text-cyan-400
                            mb-8
                        ">
                            Descubrimientos para ti
                        </h2>

                        <div className="
                            flex
                            gap-6
                            overflow-x-auto
                            pb-4
                            scrollbar-hide
                        ">

                            {
                            recomendados
                                .filter(game => game.background_image)

                                // QUITAR FAVORITOS
                                .filter(
                                    game =>
                                        !favorites.some(
                                            fav => fav.juegoId === game.id
                                        )
                                )

                                .slice(0, 6)

                                .length > 0 ? (

                                <>

                                    {
                                    recomendados
                                        .filter(game => game.background_image)

                                        .filter(
                                            game =>
                                                !favorites.some(
                                                    fav => fav.juegoId === game.id
                                                )
                                        )

                                        .slice(0, 6)

                                        .map((game) => (

                                            <motion.div
                                                key={game.id}
                                                onClick={() =>
                                                    navigate(`/game/${game.id}`)
                                                }
                                                whileHover={{
                                                    scale: 1.05,
                                                    y: -10
                                                }}
                                                className="
                                                    min-w-[220px]
                                                    sm:min-w-[240px]
                                                    lg:min-w-[260px]
                                                    bg-[#111827]
                                                    rounded-3xl
                                                    overflow-hidden
                                                    shadow-2xl
                                                    border
                                                    border-cyan-500/20
                                                    hover:border-cyan-400
                                                    transition-all
                                                    duration-300
                                                    cursor-pointer
                                                "
                                            >

                                                <img
                                                    src={game.background_image}
                                                    alt={game.name}
                                                    className="
                                                        w-full
                                                        h-44
                                                        sm:h-52
                                                        object-cover
                                                    "
                                                />

                                                <div className="p-5">

                                                    <h3 className="
                                                        text-lg
                                                        sm:text-xl
                                                        font-bold
                                                        text-white
                                                        mb-3
                                                        line-clamp-1
                                                    ">
                                                        {game.name}
                                                    </h3>

                                                    <p className="
                                                        text-cyan-400
                                                        font-bold
                                                    ">
                                                        ⭐ {game.rating}
                                                    </p>

                                                </div>

                                            </motion.div>

                                        ))
                                        }

                                    </>

                                ) : (

                                    <div className="
                                        w-full
                                        text-center
                                        py-12
                                        bg-[#111827]
                                        rounded-3xl
                                        border
                                        border-cyan-500/20
                                    ">

                                        <h3 className="
                                            text-2xl
                                            font-bold
                                            text-cyan-400
                                            mb-3
                                        ">
                                            No hay recomendaciones disponibles
                                        </h3>

                                        <p className="text-gray-400">
                                            Añade favoritos o cambia estados para
                                            recibir recomendaciones personalizadas.
                                        </p>

                                    </div>

                                )
                            }

                        </div>

                    </section>

                )
            }

            {/* GENEROS */}

            <section
                id="generos"
                className="
                    px-4
                    sm:px-6
                    lg:px-8
                    pb-20
                "
            >

                <h2 className="
                    text-3xl
                    sm:text-4xl
                    font-black
                    text-white
                    mb-10
                ">
                    Géneros
                </h2>

                <div className="
                    flex
                    flex-wrap
                    gap-4
                ">

                    {genres.map((genre) => (

                        <button
                            key={genre}
                            onClick={() =>
                                setSelectedGenre(
                                    genre
                                )
                            }
                            className={`
                                px-5
                                py-3
                                rounded-2xl
                                font-bold
                                transition-all

                                ${selectedGenre === genre

                                    ? `
                                        bg-purple-600
                                        text-white
                                        shadow-lg
                                        shadow-purple-500/30
                                      `

                                    : `
                                        bg-[#111827]
                                        text-gray-300
                                        hover:bg-purple-500/20
                                      `
                                }
                            `}
                        >
                            {genre}
                        </button>

                    ))}

                </div>

            </section>

            {/* JUEGOS */}

            <section
                id="juegos"
                className="
                    px-4
                    sm:px-6
                    lg:px-8
                    pb-20
                "
            >

                <h2 className="
                    text-3xl
                    sm:text-4xl
                    font-black
                    text-white
                    mb-10
                ">
                    Juegos populares
                </h2>

                {/* BUSCADOR */}

                <input
                    type="text"
                    placeholder="Buscar videojuego..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    className="
                        w-full
                        mb-10
                        px-6
                        py-4
                        rounded-2xl
                        bg-[#111827]
                        text-white
                        border
                        border-gray-700
                        focus:outline-none
                        focus:border-purple-500
                        text-base
                        sm:text-lg
                    "
                />

                {/* FILTROS */}

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-4
                    mb-10
                ">

                    <select
                        value={minRating}
                        onChange={(e) =>
                            setMinRating(
                                e.target.value
                            )
                        }
                        className="
                            bg-[#111827]
                            border
                            border-gray-700
                            rounded-2xl
                            p-4
                            text-white
                        "
                    >

                        <option value="0">
                            Cualquier rating
                        </option>

                        <option value="3">
                            3⭐ o más
                        </option>

                        <option value="4">
                            4⭐ o más
                        </option>

                        <option value="4.5">
                            4.5⭐ o más
                        </option>

                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(
                                e.target.value
                            )
                        }
                        className="
                            bg-[#111827]
                            border
                            border-gray-700
                            rounded-2xl
                            p-4
                            text-white
                        "
                    >

                        <option value="">
                            Ordenar por
                        </option>

                        <option value="rating">
                            Mejor valorados
                        </option>

                        <option value="name">
                            Nombre A-Z
                        </option>

                    </select>

                </div>

                {/* GRID */}

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    2xl:grid-cols-4
                    gap-8
                ">

                    {
                        juegosFiltrados.length > 0 ? (

                            juegosFiltrados.map((game) => (

                                <motion.div
                                    key={game.id}
                                    onClick={() =>
                                        navigate(`/game/${game.id}`)
                                    }
                                    whileHover={{
                                        scale: 1.05,
                                        y: -10
                                    }}
                                    className="
                                        bg-[#111827]
                                        rounded-3xl
                                        overflow-hidden
                                        shadow-2xl
                                        border
                                        border-gray-800
                                        hover:border-purple-500
                                        hover:shadow-purple-500/20
                                        transition-all
                                        duration-300
                                        cursor-pointer
                                    "
                                >

                                    <img
                                        src={game.background_image}
                                        alt={game.name}
                                        className="
                                            w-full
                                            h-48
                                            sm:h-56
                                            lg:h-60
                                            object-cover
                                            object-top
                                        "
                                    />

                                    <div className="p-5">

                                        <div className="
                                            flex
                                            justify-end
                                            mb-3
                                        ">

                                            <button
                                                onClick={(e) => {

                                                    e.stopPropagation();

                                                    toggleFavorite(game);

                                                }}
                                                className="
                                                    text-3xl
                                                    hover:scale-125
                                                    transition-all
                                                "
                                            >

                                                {
                                                    favorites.some(
                                                        fav =>
                                                            fav.juegoId === game.id
                                                    )

                                                        ? "❤️"

                                                        : "🤍"
                                                }

                                            </button>

                                        </div>

                                        <h3 className="
                                            text-lg
                                            sm:text-xl
                                            font-bold
                                            text-white
                                            mb-2
                                            line-clamp-1
                                        ">
                                            {game.name}
                                        </h3>

                                        <p className="
                                            text-yellow-400
                                            font-semibold
                                        ">
                                            ⭐ {game.rating}
                                        </p>

                                        <p className="
                                            text-gray-400
                                            mt-2
                                        ">
                                            🎯 Dificultad:
                                            {" "}
                                            {game.dificultad}/5
                                        </p>

                                        <p className="
                                            text-gray-400
                                        ">
                                            ⏱ Duración:
                                            {" "}
                                            {
                                                game.duracion > 0
                                                    ? game.duracion
                                                    : "N/D"
                                            }
                                            {" "}
                                            horas
                                        </p>

                                    </div>

                                </motion.div>

                            ))

                        ) : (

                            <div className="
                                col-span-full
                                text-center
                                py-20
                            ">

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-cyan-400
                                    mb-4
                                ">
                                    No existe el juego que estás buscando
                                </h2>

                                <p className="
                                    text-gray-400
                                    text-lg
                                ">
                                    Prueba con otro nombre o cambia los filtros.
                                </p>

                            </div>

                        )
                    }

                </div>

            </section>

        </>

    );
}

export default GameList;