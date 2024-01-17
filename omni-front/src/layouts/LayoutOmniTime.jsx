import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { RiExternalLinkLine, RiLogoutCircleRLine } from "react-icons/ri";

const LayoutOmniTime = () => {
  const cerrarSesion = () => {
    localStorage.removeItem("nombre_us"); // Elimina el nombre de usuario del localStorage
    localStorage.removeItem("accessToken"); // Elimina el token de acceso del localStorage
    localStorage.removeItem("refreshToken"); // Elimina el token de refresco del localStorage
    localStorage.removeItem("id_rol"); // Elimina el id_rol del localStorage
    localStorage.removeItem("id_usuario"); // Elimina el id_usuario del localStorage
    window.location.href = "/auth"; // Redirige al usuario a la dirección /auth
  };

  return (
    <>
      <div className="w-full bg-[#1E1F24] p-2 flex flex-col gap-4 items-center justify-center md:justify-between">
        <h1 className="text-white uppercase font-bold text-4xl text-center tracking-[4px]">
          Omni<span className="text-violet-600">Time</span>
        </h1>
        <nav className="flex items-center gap-4">
          <Link
            to="/omnitime/galeria-actividades"
            className="flex items-center gap-4 text-gray-400 text-xl p-4 hover:text-gray-200 transition-colors"
          >
            Actividades
          </Link>
          <Link
            to="/omnitime/galeria-proyectos"
            className="flex items-center gap-4 text-gray-400 text-xl p-4 hover:text-gray-200 transition-colors"
          >
            Proyectos
          </Link>
          <Link
            to="/omnitime/lista-clientes"
            className="flex items-center gap-4 text-gray-400 text-xl p-4 hover:text-gray-200 transition-colors"
          >
            Clientes
          </Link>
          <Link
            to="/omnitime/resumen"
            className="flex items-center gap-4 text-gray-400 text-xl p-4 hover:text-gray-200 transition-colors"
          >
            Resumen
          </Link>
          {/* <a
            onClick={cerrarSesion}
            href="#"
            className="flex items-center gap-4 text-gray-400 text-xl p-4 hover:text-gray-200 transition-colors"
          >
            <RiLogoutCircleRLine /> Cerrar Sesión
          </a> */}
          <Link
            to="/"
            className="flex absolute right-0 justify-end gap-4 text-gray-400 text-xl p-4 hover:text-gray-200 transition-colors"
        >
          <h1 className="text-gray-400 flex items-center gap-2 uppercase font-bold text-2xl text-center tracking-[4px] hover:text-primary-300 transition-colors">
            <RiExternalLinkLine />
            OmniServices
          </h1>
        </Link>
        </nav>
        {/* Quiero que esto este en el lado derecho */}
      </div>
      <Outlet />
    </>
  );
};

export default LayoutOmniTime;
