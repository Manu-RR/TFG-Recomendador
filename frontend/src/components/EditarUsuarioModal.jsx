import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function EditarUsuarioModal({

    usuario,
    onClose,
    recargarUsuarios

}) {

    const [nombre, setNombre] =
        useState(usuario.nombre);

    const [email, setEmail] =
        useState(usuario.email);

    const [rol, setRol] =
        useState(usuario.rol);

    const [password, setPassword] =
        useState("");

    // IMPORTANTE:
    // El backend usa "avatar", NO "fotoPerfil"

    const [avatar, setAvatar] =
        useState(usuario.avatar || "");

    const guardarCambios = async () => {

        try {

            await axios.put(

                `${import.meta.env.VITE_API_URL}/usuarios/${usuario.id}`,

                {
                    nombre,
                    email,
                    rol,
                    password,
                    avatar
                }

            );

            toast.success(
                "Usuario actualizado"
            );

            recargarUsuarios();

            onClose();

        } catch (error) {

            console.error(error);

            toast.error(
                "Error actualizando usuario"
            );

        }
    };

    return (

        <div className="
            fixed
            inset-0
            bg-black/80
            backdrop-blur-sm
            flex
            justify-center
            items-center
            z-50
            px-4
        ">

            <motion.div
                initial={{
                    scale: 0.8,
                    opacity: 0
                }}
                animate={{
                    scale: 1,
                    opacity: 1
                }}
                className="
                    bg-[#0F172A]
                    w-full
                    max-w-xl
                    p-10
                    rounded-[32px]
                    border
                    border-cyan-500/20
                    shadow-2xl
                "
            >

                <h2 className="
                    text-4xl
                    font-black
                    mb-8
                    text-center
                    bg-gradient-to-r
                    from-cyan-400
                    to-purple-500
                    text-transparent
                    bg-clip-text
                ">
                    Editar Usuario
                </h2>

                {/* FOTO */}

                <div className="
                    flex
                    justify-center
                    mb-8
                ">

                    <img
                        src={
                            avatar
                            ||
                            `https://ui-avatars.com/api/?name=${nombre}`
                        }
                        alt="Perfil"
                        className="
                            w-32
                            h-32
                            rounded-full
                            object-cover
                            border-4
                            border-cyan-500
                            shadow-2xl
                            shadow-cyan-500/30
                        "
                    />

                </div>

                {/* INPUTS */}

                <div className="space-y-5">

                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) =>
                            setNombre(e.target.value)
                        }
                        className="
                            w-full
                            px-5
                            py-4
                            rounded-2xl
                            bg-[#1F2937]
                            border
                            border-gray-700
                            text-white
                            focus:outline-none
                            focus:border-cyan-500
                        "
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="
                            w-full
                            px-5
                            py-4
                            rounded-2xl
                            bg-[#1F2937]
                            border
                            border-gray-700
                            text-white
                            focus:outline-none
                            focus:border-cyan-500
                        "
                    />

                    <input
                        type="text"
                        placeholder="Foto perfil URL"
                        value={avatar}
                        onChange={(e) =>
                            setAvatar(e.target.value)
                        }
                        className="
                            w-full
                            px-5
                            py-4
                            rounded-2xl
                            bg-[#1F2937]
                            border
                            border-gray-700
                            text-white
                            focus:outline-none
                            focus:border-cyan-500
                        "
                    />

                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="
                            w-full
                            px-5
                            py-4
                            rounded-2xl
                            bg-[#1F2937]
                            border
                            border-gray-700
                            text-white
                            focus:outline-none
                            focus:border-cyan-500
                        "
                    />

                    {/* ROL */}

                    <select
                        value={rol}
                        onChange={(e) =>
                            setRol(e.target.value)
                        }
                        className="
                            w-full
                            px-5
                            py-4
                            rounded-2xl
                            bg-[#1F2937]
                            border
                            border-gray-700
                            text-white
                            focus:outline-none
                            focus:border-cyan-500
                        "
                    >

                        <option value="USER">
                            USER
                        </option>

                        <option value="ADMIN">
                            ADMIN
                        </option>

                    </select>

                </div>

                {/* BOTONES */}

                <div className="
                    flex
                    gap-4
                    mt-10
                ">

                    <button
                        onClick={guardarCambios}
                        className="
                            flex-1
                            py-4
                            rounded-2xl
                            bg-cyan-600
                            hover:bg-cyan-500
                            font-bold
                            transition-all
                            hover:scale-105
                        "
                    >
                        Guardar
                    </button>

                    <button
                        onClick={onClose}
                        className="
                            flex-1
                            py-4
                            rounded-2xl
                            bg-red-600
                            hover:bg-red-500
                            font-bold
                            transition-all
                            hover:scale-105
                        "
                    >
                        Cancelar
                    </button>

                </div>

            </motion.div>

        </div>

    );
}

export default EditarUsuarioModal;