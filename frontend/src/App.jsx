import { motion } from "framer-motion";
import GameList from "./components/GameList";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import LoginModal from "./components/LoginModal";
import { Toaster } from "react-hot-toast";
import AnimatedBackground from "./components/AnimatedBackground";
import AdminPanel from "./components/AdminPanel";
import axios from "axios";
import PerfilUsuario from "./components/PerfilUsuario";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import GamePage from "./pages/GamePage";
import { API_URL } from "./config";

function App() {

    const [showLogin, setShowLogin] = useState(false);
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {

        const usuarioId =
            localStorage.getItem("usuarioId");

        if (usuarioId) {

            axios
                .get(
                    `${API_URL}/favoritos/${usuarioId}`
                )
                .then((response) => {

                    setFavoritos(response.data);

                });

        }

    }, []);

    return (

    <BrowserRouter>

        <Routes>

            {/* HOME */}

            <Route
                path="/"
                element={

                    <div className="
                        relative
                        min-h-screen
                        bg-gradient-to-br
                        from-[#020617]
                        via-[#050816]
                        to-[#02030A]
                        text-white
                        overflow-hidden
                    ">

                        <AnimatedBackground />

                        {/* EFECTOS */}

                        <div className="
                            absolute
                            top-[-250px]
                            left-[-200px]
                            w-[700px]
                            h-[700px]
                            bg-purple-600/20
                            rounded-full
                            blur-3xl
                        "></div>

                        <div className="
                            absolute
                            bottom-[-250px]
                            right-[-200px]
                            w-[700px]
                            h-[700px]
                            bg-cyan-500/20
                            rounded-full
                            blur-3xl
                        "></div>

                        <Navbar
                            openLogin={() =>
                                setShowLogin(true)
                            }
                        />

                        {/* HERO */}

                        <section
                            id="inicio"
                            className="
                                flex
                                flex-col
                                justify-center
                                items-center
                                text-center
                                min-h-screen
                                pt-32
                                px-6
                            "
                        >

                            <motion.h1
                                initial={{
                                    opacity: 0,
                                    y: -50
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                transition={{
                                    duration: 1
                                }}
                                className="
                                    text-7xl
                                    md:text-[10rem]
                                    font-black
                                    tracking-tight
                                    leading-none
                                    mb-10
                                    bg-gradient-to-r
                                    from-purple-500
                                    via-blue-400
                                    to-cyan-400
                                    text-transparent
                                    bg-clip-text
                                    drop-shadow-[0_0_45px_rgba(168,85,247,0.45)]
                                "
                            >
                                NEXUSPLAY
                            </motion.h1>

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 30
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                transition={{
                                    delay: 0.4,
                                    duration: 1
                                }}
                                className="max-w-4xl"
                            >

                                <p className="
                                    text-2xl
                                    md:text-3xl
                                    font-semibold
                                    text-white
                                    leading-relaxed
                                ">
                                    Descubre videojuegos increíbles,
                                    guarda tus favoritos y explora
                                    nuevas aventuras con una experiencia
                                    visual moderna e inteligente.
                                </p>

                                <p className="
                                    mt-6
                                    text-lg
                                    text-gray-400
                                    leading-relaxed
                                ">
                                    Plataforma desarrollada con
                                    React, Spring Boot y RAWG API,
                                    diseñada para jugadores reales.
                                </p>

                            </motion.div>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="
                                    mt-12
                                    px-10
                                    py-5
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-purple-600
                                    to-pink-500
                                    hover:scale-110
                                    transition-all
                                    duration-300
                                    text-xl
                                    font-bold
                                    shadow-[0_0_35px_rgba(168,85,247,0.45)]
                                "
                                onClick={() => {

                                    document
                                        .getElementById("juegos")
                                        .scrollIntoView({
                                            behavior: "smooth"
                                        });

                                }}
                            >
                                Explorar juegos
                            </motion.button>

                            {/* CARDS */}

                            <div className="
                                mt-20
                                grid
                                grid-cols-1
                                md:grid-cols-3
                                gap-8
                                max-w-5xl
                            ">

                                {/* CARD 1 */}

                                <div className="
                                    bg-white/5
                                    border
                                    border-purple-500/20
                                    backdrop-blur-xl
                                    rounded-3xl
                                    p-8
                                    hover:scale-105
                                    transition-all
                                    duration-300
                                ">

                                    <h3 className="
                                        text-2xl
                                        font-bold
                                        text-purple-400
                                        mb-4
                                    ">
                                        🎮 Explora
                                    </h3>

                                    <p className="
                                        text-gray-300
                                        leading-relaxed
                                    ">
                                        Descubre cientos de videojuegos
                                        populares organizados por géneros,
                                        puntuaciones y estilos.
                                    </p>

                                </div>

                                {/* CARD 2 */}

                                <div className="
                                    bg-white/5
                                    border
                                    border-cyan-500/20
                                    backdrop-blur-xl
                                    rounded-3xl
                                    p-8
                                    hover:scale-105
                                    transition-all
                                    duration-300
                                ">

                                    <h3 className="
                                        text-2xl
                                        font-bold
                                        text-cyan-400
                                        mb-4
                                    ">
                                        ❤️ Favoritos
                                    </h3>

                                    <p className="
                                        text-gray-300
                                        leading-relaxed
                                    ">
                                        Guarda tus juegos favoritos
                                        y crea tu colección personal
                                        gaming.
                                    </p>

                                </div>

                                {/* CARD 3 */}

                                <div className="
                                    bg-white/5
                                    border
                                    border-pink-500/20
                                    backdrop-blur-xl
                                    rounded-3xl
                                    p-8
                                    hover:scale-105
                                    transition-all
                                    duration-300
                                ">

                                    <h3 className="
                                        text-2xl
                                        font-bold
                                        text-pink-400
                                        mb-4
                                    ">
                                        🚀 Inteligencia
                                    </h3>

                                    <p className="
                                        text-gray-300
                                        leading-relaxed
                                    ">
                                        Sistema moderno desarrollado
                                        con React + Spring Boot
                                        integrado con RAWG API.
                                    </p>

                                </div>

                            </div>

                        </section>

                        <GameList />

                        <PerfilUsuario />

                        {
                            showLogin
                            &&
                            (
                                <LoginModal
                                    onClose={() =>
                                        setShowLogin(false)
                                    }
                                />
                            )
                        }

                        {
                            localStorage.getItem("rol")
                            === "ADMIN"
                            &&
                            localStorage.getItem("usuario")
                            &&
                            (
                                <AdminPanel />
                            )
                        }

                        <Toaster
                            position="top-right"
                        />

                    </div>

                }
            />

            {/* PAGINA JUEGO */}

            <Route
                path="/game/:id"
                element={<GamePage />}
            />

        </Routes>

    </BrowserRouter>

);
}

export default App;