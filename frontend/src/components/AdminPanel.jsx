import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import EditarUsuarioModal from "./EditarUsuarioModal";

function AdminPanel() {

    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditando, setUsuarioEditando] =
        useState(null);

    const [stats, setStats] = useState({});

    useEffect(() => {

        cargarUsuarios();

    }, []);

    const cargarUsuarios = () => {

        axios
            .get(`${API_URL}/usuarios/stats`)
            .then((response) => {

                setStats(response.data);

            });

        axios
            .get(`${API_URL}/usuarios`)
            .then((response) => {

                setUsuarios(response.data);

            });

    };

    const eliminarUsuario = async (id) => {

        try {

            await axios.delete(

                `${API_URL}/usuarios/${id}`,

                {
                    headers: {
                        rol: localStorage.getItem("rol")
                    }
                }

            );

            cargarUsuarios();

        } catch (error) {

            console.error(error);

        }
    };

    return (

        <section
            id="admin"
            className="px-8 py-20"
        >

            {/* TÍTULO */}

            <h2 className="
                text-5xl
                font-black
                text-red-400
                mb-10
            ">
                Panel Admin
            </h2>

            {/* STATS */}

            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
                mb-12
            ">

                <div className="
                    bg-[#111827]
                    border
                    border-purple-500/20
                    rounded-3xl
                    p-8
                ">

                    <h3 className="
                        text-gray-400
                        text-lg
                        mb-2
                    ">
                        Usuarios Totales
                    </h3>

                    <p className="
                        text-5xl
                        font-black
                        text-white
                    ">
                        {stats.usuarios || 0}
                    </p>

                </div>

                <div className="
                    bg-[#111827]
                    border
                    border-red-500/20
                    rounded-3xl
                    p-8
                ">

                    <h3 className="
                        text-gray-400
                        text-lg
                        mb-2
                    ">
                        Administradores
                    </h3>

                    <p className="
                        text-5xl
                        font-black
                        text-red-400
                    ">
                        {stats.admins || 0}
                    </p>

                </div>

            </div>

            {/* LISTA USUARIOS */}

            <div className="space-y-6">

                {usuarios.map((user) => (

                    <div
                        key={user.id}
                        className="
                            bg-[#111827]
                            border
                            border-gray-800
                            rounded-2xl
                            p-6
                            flex
                            flex-col
                            md:flex-row
                            justify-between
                            md:items-center
                            gap-6
                        "
                    >

                        {/* INFO */}

                        <div className="
                            flex
                            items-center
                            gap-5
                        ">
                            <img
                                src={
                                    user.avatar
                                    ||
                                    `https://ui-avatars.com/api/?name=${user.nombre}`
                                }
                                alt={user.nombre}
                                className="
                                    w-16
                                    h-16
                                    rounded-full
                                    object-cover
                                    border-2
                                    border-cyan-400
                                "
                            />
                           <div> 
                                <h3 className="
                                    text-xl
                                    font-bold
                                    text-white
                                ">
                                    {user.nombre}
                                </h3>

                                <p className="text-gray-400">
                                    {user.email}
                                </p>

                                <p className="
                                    text-sm
                                    text-purple-400
                                    mt-1
                                ">
                                    {user.rol}
                                </p>

                                <p className="
                                    text-pink-400
                                    font-semibold
                                    mt-2
                                ">
                                    🎮 Favoritos:
                                    {" "}
                                    {user.favoritos || 0}
                                </p>
                            </div>
                        </div>

                        {/* BOTONES */}

                        <div className="
                            flex
                            gap-3
                            relative
                            z-50
                        ">

                            <button
                                type="button"
                                onClick={() =>
                                    setUsuarioEditando(user)
                                }
                                className="
                                    relative
                                    z-50

                                    bg-cyan-600
                                    hover:bg-cyan-500

                                    px-5
                                    py-3

                                    rounded-xl

                                    font-bold

                                    transition-all
                                    duration-300

                                    hover:scale-105

                                    shadow-lg
                                    shadow-cyan-500/20
                                "
                            >
                                Editar
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    eliminarUsuario(user.id)
                                }
                                className="
                                    relative
                                    z-50

                                    bg-red-600
                                    hover:bg-red-500

                                    px-5
                                    py-3

                                    rounded-xl

                                    font-bold

                                    transition-all
                                    duration-300

                                    hover:scale-105

                                    shadow-lg
                                    shadow-red-500/20
                                "
                            >
                                Eliminar
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            {/* MODAL EDITAR */}

            {
                usuarioEditando
                &&
                (

                    <EditarUsuarioModal
                        usuario={usuarioEditando}
                        onClose={() =>
                            setUsuarioEditando(null)
                        }
                        recargarUsuarios={
                            cargarUsuarios
                        }
                    />

                )
            }

        </section>

    );
}

export default AdminPanel;