import React from "react";
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
// Icons
import {
  RiFileList3Line,
  RiLogoutCircleRLine,
  RiMenu3Fill,
  RiCloseLine,
  RiHome3Line,
  RiAdminLine,
  RiArrowRightSLine,
  RiGroupLine,
  RiFolder2Line,
  RiFileSearchLine,
  RiFileList2Line,
  RiGroup2Line,
  RiTimeLine,
  RiExternalLinkLine,
} from "react-icons/ri";

const LayoutAdmin = () => {
  const location = useLocation();
  const [rol, setRol] = useState(localStorage.getItem("id_rol"));
  const [showMenu, setShowMenu] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showSubmenu2, setShowSubmenu2] = useState(false);
  const [showSubmenu3, setShowSubmenu3] = useState(false);
  const cerrarSesion = () => {
    localStorage.removeItem("nombre_us"); // Elimina el nombre de usuario del localStorage
    localStorage.removeItem("accessToken"); // Elimina el token de acceso del localStorage
    localStorage.removeItem("refreshToken"); // Elimina el token de refresco del localStorage
    localStorage.removeItem("id_rol"); // Elimina el id_rol del localStorage
    localStorage.removeItem("id_usuario"); // Elimina el id_usuario del localStorage
    window.location.href = "/auth"; // Redirige al usuario a la dirección /auth
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`bg-[#1E1F24] fixed ${
          showMenu ? "-left-0" : "-left-full"
        } lg:left-0 top-0 w-72 h-full p-8 flex flex-col justify-between transition-all overflow-y-scroll z-50`}
      >
        {/* Menu */}
        <div>
          {/* Logo */}
          <div className="mb-8 flex">
            <h1 className="text-white uppercase font-bold text-2xl text-center tracking-[4px]">
              Omni<span className="text-primary-300">Services</span>
            </h1>
          </div>
          {/* Nav */}
          <nav>
            <Link
              to="/"
              className={`flex items-center gap-4 text-xl p-4 hover:text-gray-200 transition-colors ${
                location.pathname === "/" ? "text-primary-300" : "text-gray-400"
              }`}
            >
              <RiHome3Line /> Inicio
            </Link>
            {/* Servicios */}
            <div>
              <button
                onClick={() => setShowSubmenu(!showSubmenu)}
                className="w-full flex items-center justify-between py-4 pr-2 pl-3 rounded-lg hover:text-secondary-100"
              >
                <span className="flex items-center text-xl text-gray-400  gap-4">
                  <RiFileList2Line />
                  Servicios
                </span>
                <RiArrowRightSLine
                  className={`mt-1 text-2xl text-gray-300 ${
                    showSubmenu && "rotate-90"
                  } transition-all`}
                />
              </button>
              <ul
                className={` ${
                  showSubmenu ? "h-[130px]" : "h-0"
                } overflow-y-hidden transition-all`}
              >
                <li>
                  <Link
                    to="/servicios-ibm"
                    className={`flex items-center gap-4 text-xl p-4 hover:text-gray-200 transition-colors ${
                      location.pathname === "/servicios-ibm"
                        ? "text-primary-300"
                        : "text-gray-400"
                    }`}
                  >
                    <RiFileList3Line />
                    <span className="flex-1 flex items-center justify-between gap-4">
                      Servicios IBM
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/servicios-open"
                    className={`flex items-center gap-4 text-xl p-4 hover:text-gray-200 transition-colors ${
                      location.pathname === "/servicios-open"
                        ? "text-primary-300"
                        : "text-gray-400"
                    }`}
                  >
                    <RiFileList3Line />
                    <span className="flex-1 flex items-center justify-between gap-4">
                      Servicios Open
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            {/* Talleres */}
            <div>
              <button
                onClick={() => setShowSubmenu2(!showSubmenu2)}
                className="w-full flex items-center justify-between py-4 pr-2 pl-3 rounded-lg hover:text-secondary-100"
              >
                <span className="flex items-center text-xl text-gray-400  gap-4">
                  <RiGroup2Line />
                  Talleres
                </span>
                <RiArrowRightSLine
                  className={`mt-1 text-2xl text-gray-300 ${
                    showSubmenu2 && "rotate-90"
                  } transition-all`}
                />
              </button>
              <ul
                className={` ${
                  showSubmenu2 ? "h-[130px]" : "h-0"
                } overflow-y-hidden transition-all`}
              >
                <li>
                  <Link
                    to="/talleres-ibm"
                    className={`flex items-center gap-4 text-xl p-4 hover:text-gray-200 transition-colors ${
                      location.pathname === "/talleres-ibm"
                        ? "text-primary-300"
                        : "text-gray-400"
                    }`}
                  >
                    <RiGroupLine />
                    <span className="flex-1 flex items-center justify-between gap-4">
                      Talleres IBM
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/talleres-open"
                    className={`flex items-center gap-4 text-xl p-4 hover:text-gray-200 transition-colors ${
                      location.pathname === "/talleres-open"
                        ? "text-primary-300"
                        : "text-gray-400"
                    }`}
                  >
                    <RiGroupLine />
                    <span className="flex-1 flex items-center justify-between gap-4">
                      Talleres Open
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Admin */}
            {rol === "1" ? (
              <div>
                <button
                  onClick={() => setShowSubmenu3(!showSubmenu3)}
                  className="w-full flex items-center justify-between py-4 pr-2 pl-3 rounded-lg hover:text-secondary-100"
                >
                  <span className="flex items-center text-xl text-gray-400  gap-4">
                    <RiAdminLine />
                    Panel Admin{" "}
                  </span>
                  <RiArrowRightSLine
                    className={`mt-1 text-2xl text-gray-300 ${
                      showSubmenu3 && "rotate-90"
                    } transition-all`}
                  />
                </button>
                <ul
                  className={` ${
                    showSubmenu3 ? "h-[174px]" : "h-0"
                  } overflow-y-hidden transition-all`}
                >
                  <li>
                    <Link
                      to="/lista-servicios"
                      className={`flex items-center gap-4 text-xl p-4 hover:text-gray-200 transition-colors ${
                        location.pathname === "/lista-servicios"
                          ? "text-primary-300"
                          : "text-gray-400"
                      }`}
                    >
                      <RiFolder2Line />
                      <span className="flex-1 flex items-center justify-between gap-4">
                        Lista Servicios
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/lista-talleres"
                      className={`flex items-center gap-4 text-xl p-4 hover:text-gray-200 transition-colors ${
                        location.pathname === "/lista-talleres"
                          ? "text-primary-300"
                          : "text-gray-400"
                      }`}
                    >
                      <RiFolder2Line />
                      <span className="flex-1 flex items-center justify-between gap-4">
                        Lista Talleres
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/historial"
                      className={`flex items-center gap-4 text-xl p-4 hover:text-gray-200 transition-colors ${
                        location.pathname === "/historial"
                          ? "text-primary-300"
                          : "text-gray-400"
                      }`}
                    >
                      <RiFileSearchLine />
                      <span className="flex-1 flex items-center justify-between gap-4">
                        Historial
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            ) : null}
          </nav>
        </div>
        {/* OmniTime */}
        <Link
          to="/omnitime/galeria-actividades"
          className="flex items-center gap-4 text-xl p-4"
        >
          <h1 className="text-gray-400 flex items-center gap-2 uppercase font-bold text-2xl text-center tracking-[4px] hover:text-violet-600 transition-colors">
          <RiExternalLinkLine />
            OmniTime
          </h1>
        </Link>
        {/* Logout */}
        <div>
          <a
            onClick={cerrarSesion}
            href="#"
            className="flex items-center gap-4 text-gray-400 text-xl p-4 hover:text-gray-200 transition-colors"
          >
            <RiLogoutCircleRLine /> Cerrar Sesión
          </a>
        </div>
      </div>
      {/* Btn menu movile */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed right-4 bottom-4 bg-primary-300 ring-4 ring-primary-100 text-white text-xl p-3 rounded-full z-50"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
      </button>
      {/* Header */}
      <main className="lg:pl-80 p-8 overflow-y-scroll ">
        <Outlet />
      </main>
    </>
  );
};

export default LayoutAdmin;
