import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../config";

function LoginModal({ onClose }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [nombre, setNombre] = useState("");
    const [isRegister, setIsRegister] = useState(false);

    // LOGIN
    const handleLogin = async () => {

        try {

            const response = await axios.post(
                `${API_URL}/usuarios/login`,
                {
                    email,
                    password
                }
            );

            // LOGIN FALLIDO

            if (!response.data.success) {

                toast.error(response.data.message);

                return;
            }

            const usuario = response.data.usuario;

            localStorage.setItem("usuario", usuario.email);
            localStorage.setItem("rol", usuario.rol);
            localStorage.setItem("usuarioId", usuario.id);

            toast.success("Login correcto");

            onClose();

            window.location.reload();

        } catch (error) {

            toast.error("Error conectando con el servidor");

        }
    };

    // REGISTER
    const handleRegister = async () => {

        // VALIDAR PASSWORDS
        if (password !== confirmPassword) {

            toast.error("Las contraseñas no coinciden");

            return;

        }

        try {

            await axios.post(
                `${API_URL}/usuarios/registro`,
                {
                    nombre,
                    email,
                    password,
                    rol: "USER"
                }
            );

            toast.success("Usuario registrado");

            setIsRegister(false);

            setNombre("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

        } catch (error) {

            console.log(error);

            console.log(error.response);

            console.log(error.response.data);

            toast.error("Error registrando usuario");

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
                    opacity: 0,
                    y: 50
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.4
                }}
                className="
                    relative
                    overflow-hidden
                    bg-[#0F172A]/95
                    p-10
                    rounded-[32px]
                    w-full
                    max-w-md
                    border
                    border-purple-500/20
                    shadow-2xl
                    shadow-purple-500/20
                    backdrop-blur-xl
                "
            >

                {/* EFECTOS DE LUZ */}

                <div className="
                    absolute
                    top-[-100px]
                    right-[-100px]
                    w-[250px]
                    h-[250px]
                    bg-purple-600/20
                    rounded-full
                    blur-3xl
                "></div>

                <div className="
                    absolute
                    bottom-[-100px]
                    left-[-100px]
                    w-[250px]
                    h-[250px]
                    bg-cyan-500/20
                    rounded-full
                    blur-3xl
                "></div>

                {/* CONTENIDO */}

                <div className="relative z-10">

                    <h2 className="
                        text-5xl
                        font-black
                        mb-10
                        text-center
                        bg-gradient-to-r
                        from-white
                        via-purple-300
                        to-cyan-400
                        text-transparent
                        bg-clip-text
                    ">
                        {isRegister
                            ? "Crear cuenta"
                            : "Iniciar sesión"}
                    </h2>

                    {/* NOMBRE */}

                    {isRegister && (

                        <input
                            type="text"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) =>
                                setNombre(e.target.value)
                            }
                            className="
                                w-full
                                mb-5
                                px-5
                                py-4
                                rounded-2xl
                                bg-[#1F2937]
                                text-white
                                border
                                border-gray-700
                                focus:outline-none
                                focus:border-purple-500
                                transition-all
                            "
                        />

                    )}

                    {/* EMAIL */}

                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="
                            w-full
                            mb-5
                            px-5
                            py-4
                            rounded-2xl
                            bg-[#1F2937]
                            text-white
                            border
                            border-gray-700
                            focus:outline-none
                            focus:border-purple-500
                            transition-all
                        "
                    />

                    {/* PASSWORD */}

                    <div className="relative mb-5">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
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
                                text-white
                                border
                                border-gray-700
                                focus:outline-none
                                focus:border-purple-500
                                transition-all
                            "
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="
                                absolute
                                right-5
                                top-1/2
                                -translate-y-1/2
                                text-gray-400
                                hover:text-white
                                transition-all
                                text-xl
                            "
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>

                    </div>

                    {/* CONFIRM PASSWORD */}

                    {isRegister && (

                        <div className="relative mb-8">

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirmar contraseña"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="
                                    w-full
                                    px-5
                                    py-4
                                    rounded-2xl
                                    bg-[#1F2937]
                                    text-white
                                    border
                                    border-gray-700
                                    focus:outline-none
                                    focus:border-purple-500
                                    transition-all
                                "
                            />

                        </div>

                    )}

                    {/* BOTONES */}

                    <div className="flex flex-col gap-4">

                        <button
                            onClick={
                                isRegister
                                    ? handleRegister
                                    : handleLogin
                            }
                            className="
                                w-full
                                py-4
                                rounded-2xl
                                bg-gradient-to-r
                                from-purple-600
                                via-fuchsia-500
                                to-pink-500
                                hover:scale-105
                                transition-all
                                duration-300
                                font-bold
                                text-lg
                                shadow-lg
                                shadow-purple-500/30
                            "
                        >
                            {isRegister
                                ? "Crear cuenta"
                                : "Entrar"}
                        </button>

                        <button
                            onClick={onClose}
                            className="
                                w-full
                                py-4
                                rounded-2xl
                                bg-[#1F2937]
                                hover:bg-[#374151]
                                font-bold
                                text-lg
                                transition-all
                                border
                                border-gray-700
                            "
                        >
                            Cancelar
                        </button>

                        <p className="
                            text-center
                            text-gray-400
                            mt-6
                        ">

                            {isRegister
                                ? "¿Ya tienes cuenta?"
                                : "¿No tienes cuenta?"}

                            <span
                                onClick={() =>
                                    setIsRegister(!isRegister)
                                }
                                className="
                                    text-purple-400
                                    ml-2
                                    cursor-pointer
                                    hover:text-purple-300
                                    transition-all
                                    font-semibold
                                "
                            >
                                {isRegister
                                    ? "Inicia sesión"
                                    : "Regístrate"}
                            </span>

                        </p>

                    </div>

                </div>

            </motion.div>

        </div>

    );
}

export default LoginModal;