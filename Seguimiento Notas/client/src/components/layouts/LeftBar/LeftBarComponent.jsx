import { Button, IconButton, Typography } from "@material-tailwind/react"
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../../../hooks/useAuthStore";

export const LeftBarComponent = () => {

    const { startLogout, user } = useAuthStore();

    return (
        <aside className="bg-gradient-to-br from-blue-gray-800 to-blue-gray-900 translate-x-0 fixed inset-0 z-50 my-4 ml-4 w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">

            <div className="relative border-b border-white/20">
                <Link to={'home'} className="flex items-center gap-4 py-6 px-8">

                    <Typography variant="h6" color={"white"}>
                        Notas app
                    </Typography>
                </Link>
            </div>

            <div className="m-4 h-screen">
                <ul className="mb-4 grid grid-col gap-1 ">
                    <li>
                        <NavLink to={'/'}>
                            {({ isActive }) => (
                                <Button
                                    variant={isActive ? "gradient" : "text"}
                                    color={isActive ? "red" : "white"}
                                    className="flex items-center gap-4 px-4 capitalize"
                                    fullWidth
                                >
                                    <Typography color="inherit" className="font-medium capitalize">
                                        Inicio
                                    </Typography>
                                </Button>
                            )}

                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={'/notas'}>
                            {({ isActive }) => (
                                <Button
                                    variant={isActive ? "gradient" : "text"}
                                    color={isActive ? "red" : "white"}
                                    className="flex items-center gap-4 px-4 capitalize"
                                    fullWidth
                                >
                                    <Typography color="inherit" className="font-medium capitalize">
                                        Notas
                                    </Typography>
                                </Button>
                            )}

                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={'/asistencia'}>
                            {({ isActive }) => (
                                <Button
                                    variant={isActive ? "gradient" : "text"}
                                    color={isActive ? "red" : "white"}
                                    className="flex items-center gap-4 px-4 capitalize"
                                    fullWidth
                                >
                                    <Typography color="inherit" className="font-medium capitalize">
                                        Asistencia
                                    </Typography>
                                </Button>
                            )}

                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={'/ingresos'}>
                            {({ isActive }) => (
                                <Button
                                    variant={isActive ? "gradient" : "text"}
                                    color={isActive ? "red" : "white"}
                                    className="flex items-center gap-4 px-4 capitalize"
                                    fullWidth
                                >
                                    <Typography color="inherit" className="font-medium capitalize">
                                        Ingresos
                                    </Typography>
                                </Button>
                            )}

                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={'/grados'}>
                            {({ isActive }) => (
                                <Button
                                    variant={isActive ? "gradient" : "text"}
                                    color={isActive ? "red" : "white"}
                                    className="flex items-center gap-4 px-4 capitalize"
                                    fullWidth
                                >
                                    <Typography color="inherit" className="font-medium capitalize">
                                        Grados
                                    </Typography>
                                </Button>
                            )}

                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={'/asignaturas'}>
                            {({ isActive }) => (
                                <Button
                                    variant={isActive ? "gradient" : "text"}
                                    color={isActive ? "red" : "white"}
                                    className="flex items-center gap-4 px-4 capitalize"
                                    fullWidth
                                >
                                    <Typography color="inherit" className="font-medium capitalize">
                                        Asignaturas
                                    </Typography>
                                </Button>
                            )}

                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={'/grupos'}>
                            {({ isActive }) => (
                                <Button
                                    variant={isActive ? "gradient" : "text"}
                                    color={isActive ? "red" : "white"}
                                    className="flex items-center gap-4 px-4 capitalize"
                                    fullWidth
                                >
                                    <Typography color="inherit" className="font-medium capitalize">
                                        grupos
                                    </Typography>
                                </Button>
                            )}

                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={'/grados_grupos'}>
                            {({ isActive }) => (
                                <Button
                                    variant={isActive ? "gradient" : "text"}
                                    color={isActive ? "red" : "white"}
                                    className="flex items-center gap-4 px-4 capitalize"
                                    fullWidth
                                >
                                    <Typography color="inherit" className="font-medium capitalize">
                                        Grados grupos
                                    </Typography>
                                </Button>
                            )}

                        </NavLink>
                    </li>

                    <li>
                        <Button
                            variant="text"
                            color="white"
                            className="flex items-center gap-4 px-4 capitalize"
                            onClick={startLogout}
                            fullWidth
                        >
                            <Typography color="inherit" className="font-medium capitalize">
                                Salir
                            </Typography>
                        </Button>
                    </li>

                </ul>

            </div>
        </aside >
    )
}
