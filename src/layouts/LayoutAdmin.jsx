import React from 'react'
import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom'
// Icons
import {
  RiFileList3Line,
  RiLogoutCircleRLine,
  RiMenu3Fill,
  RiCloseLine,
  RiHome3Line,
} from "react-icons/ri";

const LayoutAdmin = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const cerrarSesion = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    window.location.href = '/auth'; // Redirige al usuario a la dirección /auth
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      {/* Sidebar */}
      <sidebar
        className={`bg-[#1E1F24] fixed ${
          showMenu ? "-left-0" : "-left-full"
        } lg:left-0 top-0 w-72 h-full p-8 flex flex-col justify-between transition-all overflow-y-scroll z-50`}
      >
        {/* Menu */}
        <div>
          {/* Logo */}
          <div className="mb-8 flex">
            <h1 className="text-white uppercase font-bold text-2xl tracking-[4px]">
              Omni<span className='text-primary-300'>Services</span>
            </h1>
          </div>
          {/* Nav */}
          <nav>
  <Link
    to="/"
    className={`flex items-center gap-4 text-xl p-4 hover:text-gray-200 transition-colors ${
      location.pathname === '/' ? 'text-primary-300' : 'text-gray-400'
    }`}
  >
    <RiHome3Line /> Inicio
  </Link>
  <Link
    to="/servicios-ibm"
    className={`flex items-center gap-4 text-xl p-4 hover:text-gray-200 transition-colors ${
      location.pathname === '/servicios-ibm' ? 'text-primary-300' : 'text-gray-400'
    }`}
  >
    <RiFileList3Line />
    <span className="flex-1 flex items-center justify-between gap-4">Servicios IBM</span>
  </Link>
  <Link
    to="/servicios-open"
    className={`flex items-center gap-4 text-xl p-4 hover:text-gray-200 transition-colors ${
      location.pathname === '/servicios-open' ? 'text-primary-300' : 'text-gray-400'
    }`}
  >
    <RiFileList3Line />
    <span className="flex-1 flex items-center justify-between gap-4">Servicios Open</span>
  </Link>
</nav>
        </div>
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
      </sidebar>
      {/* Btn menu movile */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed right-4 bottom-4 bg-[#664EFA] ring-4 ring-[#141517] text-white text-xl p-3 rounded-full z-50"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
      </button>
      {/* Header */}
      <main className= "lg:pl-80 p-8 overflow-y-scroll ">
      <Outlet/>
      </main>
    </> 
  )
}

export default LayoutAdmin