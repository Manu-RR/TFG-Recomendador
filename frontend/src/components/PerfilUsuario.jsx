import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { API_URL } from "../config";

function PerfilUsuario() {

    const [perfil, setPerfil] =
        useState(null);

    const usuarioId =
        localStorage.getItem("usuarioId");

    const [modoEditar, setModoEditar] =
        useState(false);

    const [nuevoNombre, setNuevoNombre] =
        useState("");

    const [nuevoAvatar, setNuevoAvatar] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [mostrarPassword, setMostrarPassword] =
        useState(false);

    const [
        mostrarConfirmPassword,
        setMostrarConfirmPassword
    ] = useState(false);

    useEffect(() => {

        if (!usuarioId) return;

        cargarPerfil();

    }, []);

    const cargarPerfil = () => {

        axios
            .get(
                `${API_URL}/usuarios/${usuarioId}/perfil`
            )
            .then((response) => {

                setPerfil(response.data);

                setNuevoNombre(
                    response.data.usuario.nombre
                );

                setNuevoAvatar(
                    response.data.usuario.avatar || ""
                );

            })
            .catch((error) => {

                console.error(error);

            });

    };

    const guardarCambios = async () => {

        if (
            password &&
            password !== confirmPassword
        ) {

            toast.error(
                "Las contraseñas no coinciden"
            );

            return;
        }

        try {

            await axios.put(

                `${API_URL}/usuarios/${usuarioId}/perfil`,

                {
                    nombre: nuevoNombre,
                    avatar: nuevoAvatar,
                    password: password
                }

            );

            toast.success(
                "Perfil actualizado"
            );

            setModoEditar(false);

            setPassword("");
            setConfirmPassword("");

            cargarPerfil();

        } catch (error) {

            console.error(error);

            toast.error(
                "Error actualizando perfil"
            );

        }

    };

    if (!usuarioId) return null;

    if (!perfil) return null;

    return (

        <section
            id="perfil"
            className="
                px-4
                sm:px-6
                lg:px-8
                py-16
                lg:py-20
            "
        >

            {/* HEADER */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 30
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                className="
                    relative
                    overflow-hidden
                    rounded-[30px]
                    lg:rounded-[40px]
                    bg-gradient-to-br
                    from-[#111827]
                    via-[#0F172A]
                    to-[#1E1B4B]
                    border
                    border-purple-500/20
                    p-5
                    sm:p-8
                    lg:p-10
                    mb-12
                "
            >

                {/* EFECTO */}

                <div className="
                    absolute
                    top-0
                    right-0
                    w-52
                    h-52
                    sm:w-72
                    sm:h-72
                    bg-purple-500/20
                    blur-[120px]
                    rounded-full
                "></div>

                <div className="
                    relative
                    z-10
                    flex
                    flex-col
                    xl:flex-row
                    gap-10
                    items-start
                ">

                    {/* AVATAR */}

                    <div className="
                        flex
                        flex-col
                        items-center
                        gap-5
                        w-full
                        xl:w-auto
                    ">

                        <img
                            src={
                                nuevoAvatar &&
                                (
                                    nuevoAvatar.startsWith("http")
                                    ||
                                    nuevoAvatar.startsWith("data:image")
                                )

                                    ? nuevoAvatar

                                    : `https://ui-avatars.com/api/?name=${perfil.usuario.nombre}&background=111827&color=00d4ff&size=256`
                            }
                            alt="Avatar"
                            className="
                                w-28
                                h-28
                                sm:w-36
                                sm:h-36
                                lg:w-40
                                lg:h-40
                                rounded-full
                                object-cover
                                border-4
                                border-cyan-400
                                shadow-2xl
                                shadow-cyan-500/30
                                bg-[#111827]
                            "
                        />

                        {
                            modoEditar && (

                                <>

                                    <p className="
                                        text-gray-400
                                        text-sm
                                        text-center
                                        max-w-[240px]
                                    ">
                                        Pega la URL de una imagen
                                        para usarla como avatar
                                    </p>

                                    <input
                                        type="text"
                                        value={nuevoAvatar}
                                        onChange={(e) =>
                                            setNuevoAvatar(
                                                e.target.value
                                            )
                                        }
                                        placeholder="https://..."
                                        className="
                                            w-full
                                            max-w-[320px]
                                            bg-[#1F2937]
                                            border
                                            border-gray-700
                                            rounded-2xl
                                            px-5
                                            py-4
                                            text-white
                                            focus:outline-none
                                            focus:border-cyan-400
                                            text-sm
                                            sm:text-base
                                        "
                                    />

                                </>

                            )
                        }

                    </div>

                    {/* INFO */}

                    <div className="flex-1 w-full">

                        {
                            modoEditar
                                ? (

                                    <div className="space-y-5">

                                        {/* NOMBRE */}

                                        <div>

                                            <label className="
                                                text-gray-400
                                                mb-2
                                                block
                                                text-sm
                                                sm:text-base
                                            ">
                                                Nombre usuario
                                            </label>

                                            <input
                                                type="text"
                                                value={nuevoNombre}
                                                onChange={(e) =>
                                                    setNuevoNombre(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Nombre"
                                                className="
                                                    w-full
                                                    bg-[#1F2937]
                                                    border
                                                    border-gray-700
                                                    rounded-2xl
                                                    px-5
                                                    py-4
                                                    text-white
                                                    focus:outline-none
                                                    focus:border-cyan-400
                                                    text-sm
                                                    sm:text-base
                                                "
                                            />

                                        </div>

                                        {/* EMAIL */}

                                        <div>

                                            <label className="
                                                text-gray-400
                                                mb-2
                                                block
                                                text-sm
                                                sm:text-base
                                            ">
                                                Correo electrónico
                                            </label>

                                            <input
                                                type="email"
                                                value={perfil.usuario.email}
                                                disabled
                                                className="
                                                    w-full
                                                    bg-[#111827]
                                                    border
                                                    border-gray-700
                                                    rounded-2xl
                                                    px-5
                                                    py-4
                                                    text-gray-400
                                                    cursor-not-allowed
                                                    text-sm
                                                    sm:text-base
                                                "
                                            />

                                        </div>

                                        {/* PASSWORD */}

                                        <div className="relative">

                                            <label className="
                                                text-gray-400
                                                mb-2
                                                block
                                                text-sm
                                                sm:text-base
                                            ">
                                                Nueva contraseña
                                            </label>

                                            <input
                                                type={
                                                    mostrarPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Nueva contraseña"
                                                className="
                                                    w-full
                                                    bg-[#1F2937]
                                                    border
                                                    border-gray-700
                                                    rounded-2xl
                                                    px-5
                                                    py-4
                                                    text-white
                                                    focus:outline-none
                                                    focus:border-cyan-400
                                                    text-sm
                                                    sm:text-base
                                                "
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setMostrarPassword(
                                                        !mostrarPassword
                                                    )
                                                }
                                                className="
                                                    absolute
                                                    right-5
                                                    top-[55px]
                                                    text-lg
                                                    sm:text-xl
                                                "
                                            >
                                                {
                                                    mostrarPassword
                                                        ? "🙈"
                                                        : "👁️"
                                                }
                                            </button>

                                        </div>

                                        {/* CONFIRM PASSWORD */}

                                        <div className="relative">

                                            <label className="
                                                text-gray-400
                                                mb-2
                                                block
                                                text-sm
                                                sm:text-base
                                            ">
                                                Confirmar contraseña
                                            </label>

                                            <input
                                                type={
                                                    mostrarConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={confirmPassword}
                                                onChange={(e) =>
                                                    setConfirmPassword(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Confirmar contraseña"
                                                className="
                                                    w-full
                                                    bg-[#1F2937]
                                                    border
                                                    border-gray-700
                                                    rounded-2xl
                                                    px-5
                                                    py-4
                                                    text-white
                                                    focus:outline-none
                                                    focus:border-cyan-400
                                                    text-sm
                                                    sm:text-base
                                                "
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setMostrarConfirmPassword(
                                                        !mostrarConfirmPassword
                                                    )
                                                }
                                                className="
                                                    absolute
                                                    right-5
                                                    top-[55px]
                                                    text-lg
                                                    sm:text-xl
                                                "
                                            >
                                                {
                                                    mostrarConfirmPassword
                                                        ? "🙈"
                                                        : "👁️"
                                                }
                                            </button>

                                        </div>

                                        {/* BOTONES */}

                                        <div className="
                                            flex
                                            flex-col
                                            sm:flex-row
                                            gap-4
                                            pt-4
                                        ">

                                            <button
                                                onClick={guardarCambios}
                                                className="
                                                    w-full
                                                    sm:w-auto
                                                    bg-green-600
                                                    hover:bg-green-500
                                                    px-7
                                                    py-3
                                                    rounded-2xl
                                                    font-bold
                                                    transition-all
                                                "
                                            >
                                                Guardar
                                            </button>

                                            <button
                                                onClick={() =>
                                                    setModoEditar(false)
                                                }
                                                className="
                                                    w-full
                                                    sm:w-auto
                                                    bg-red-600
                                                    hover:bg-red-500
                                                    px-7
                                                    py-3
                                                    rounded-2xl
                                                    font-bold
                                                    transition-all
                                                "
                                            >
                                                Cancelar
                                            </button>

                                        </div>

                                    </div>

                                ) : (

                                    <>

                                        <h2 className="
                                            text-3xl
                                            sm:text-4xl
                                            lg:text-5xl
                                            font-black
                                            text-white
                                            break-words
                                        ">
                                            {
                                                perfil.usuario.nombre
                                            }
                                        </h2>

                                        {/* EMAIL */}

                                        <div className="mt-6">

                                            <label className="
                                                text-gray-400
                                                mb-2
                                                block
                                                text-sm
                                                sm:text-base
                                            ">
                                                Correo electrónico
                                            </label>

                                            <input
                                                type="email"
                                                value={perfil.usuario.email}
                                                disabled
                                                className="
                                                    w-full
                                                    bg-[#111827]
                                                    border
                                                    border-gray-700
                                                    rounded-2xl
                                                    px-5
                                                    py-4
                                                    text-gray-400
                                                    cursor-not-allowed
                                                    text-sm
                                                    sm:text-base
                                                "
                                            />

                                        </div>

                                        <div className="
                                            mt-5
                                            inline-block
                                            px-5
                                            py-2
                                            rounded-full
                                            bg-purple-500/20
                                            text-purple-300
                                            font-bold
                                            text-sm
                                            sm:text-base
                                        ">

                                            {
                                                perfil.usuario.rol
                                            }

                                        </div>

                                        <div className="mt-8">

                                            <button
                                                onClick={() =>
                                                    setModoEditar(true)
                                                }
                                                className="
                                                    w-full
                                                    sm:w-auto
                                                    bg-cyan-600
                                                    hover:bg-cyan-500
                                                    px-7
                                                    py-3
                                                    rounded-2xl
                                                    font-bold
                                                    transition-all
                                                    shadow-lg
                                                    shadow-cyan-500/20
                                                "
                                            >
                                                Editar perfil
                                            </button>

                                        </div>

                                    </>

                                )
                        }

                    </div>

                </div>

            </motion.div>

            {/* LISTA JUEGOS */}

            <div className="
                grid
                grid-cols-1
                xl:grid-cols-3
                gap-6
            ">

                {
                    ["JUGANDO", "COMPLETADO", "PENDIENTE"]
                        .map((estado) => {

                            const juegosEstado =
                                (perfil.lista || [])
                                    .filter(
                                        juego =>
                                            juego.estado === estado
                                    );

                            return (

                                <div
                                    key={estado}
                                    className="
                                        bg-[#111827]
                                        border
                                        border-gray-800
                                        rounded-3xl
                                        p-5
                                        sm:p-6
                                    "
                                >

                                    <h3 className="
                                        text-2xl
                                        sm:text-3xl
                                        font-black
                                        text-white
                                        mb-6
                                    ">
                                        {estado}
                                        {" "}
                                        (
                                        {
                                            juegosEstado.length
                                        }
                                        )
                                    </h3>

                                    <div className="space-y-4">

                                        {
                                            juegosEstado.length > 0
                                                ? (

                                                    juegosEstado.map((juego) => (

                                                        <div
                                                            key={juego.id}
                                                            className="
                                                                flex
                                                                flex-col
                                                                sm:flex-row
                                                                items-center
                                                                gap-4
                                                                bg-[#1F2937]
                                                                rounded-2xl
                                                                p-4
                                                                border
                                                                border-gray-700
                                                                hover:scale-[1.02]
                                                                hover:border-cyan-400
                                                                transition-all
                                                                duration-300
                                                            "
                                                        >

                                                            <img
                                                                src={juego.imagenJuego}
                                                                alt={juego.nombreJuego}
                                                                className="
                                                                    w-full
                                                                    sm:w-24
                                                                    h-48
                                                                    sm:h-24
                                                                    object-cover
                                                                    rounded-2xl
                                                                "
                                                            />

                                                            <div className="
                                                                flex-1
                                                                w-full
                                                            ">

                                                                <h4 className="
                                                                    text-white
                                                                    font-bold
                                                                    text-base
                                                                    sm:text-lg
                                                                    line-clamp-2
                                                                ">
                                                                    {
                                                                        juego.nombreJuego
                                                                    }
                                                                </h4>

                                                                <p className="
                                                                    text-gray-400
                                                                    mt-1
                                                                    text-sm
                                                                    sm:text-base
                                                                ">
                                                                    Estado:
                                                                    {" "}
                                                                    {
                                                                        juego.estado
                                                                    }
                                                                </p>

                                                            </div>

                                                        </div>

                                                    ))

                                                ) : (

                                                    <div className="
                                                        text-gray-500
                                                        text-center
                                                        py-10
                                                    ">
                                                        No hay juegos
                                                    </div>

                                                )
                                        }

                                    </div>

                                </div>

                            );

                        })
                }

            </div>

        </section>

    );
}

export default PerfilUsuario;