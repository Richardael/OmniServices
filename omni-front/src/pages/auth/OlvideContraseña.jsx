import { useState } from "react";
//Estilos
import "./../../App.css";
//Icons
import { RiMailLine } from "react-icons/ri";

//Rutas
import { Link } from "react-router-dom";

import axios from "axios";
import AlertaBuena from "../../components/alertas/AlertaBuena";
import AlertaMala from "../../components/alertas/AlertaMala";

const OlvideContraseña = () => {
  const [correo_us, setCorreo_us] = useState("");
  const [error, setError] = useState("");
  const [mostrarAlertaBuena, setMostrarAlertaBuena] = useState(false);
  const [alertaBuena, setAlertaBuena] = useState("");
  const [mostrarAlertaMala, setMostrarAlertaMala] = useState(false);
  const [alertaMala, setAlertaMala] = useState("");

  const recuperarContraseña = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post(
      "https://omniservices.onrender.com/usuarios/recuperar-password",
      {
        correo_us: correo_us,
      }
    );
    console.log(response);
    setMostrarAlertaBuena(true);
    setTimeout(() => {
      setMostrarAlertaBuena(false);
    }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
    setAlertaBuena(response.data.message);
    }
    catch (error) {
      setMostrarAlertaMala(true);
      setTimeout(() => {
        setMostrarAlertaMala(false);
      }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
      setAlertaMala(error.response.data.message);
    }
  };

  //Vista Login
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg">
        <div className="flex relative justify-center items-center px-8 pt-8 pb-5">
          <h1 className="text-secondary-200 text-3xl font-medium tracking-widest">
            OmniServices
          </h1>
        </div>
        <div className="bg-secondary-100 w-full rounded-lg p-8 mb-8">
          <div className="flex flex-col items-center gap-1 mb-6">
            <h1 className="text-xl text-primary-300 ">Enviar Instrucciones</h1>
            <p className="text-gray-400 text-sm">
              Recupera tu contraseña usando tu correo electronico
            </p>
          </div>
          <form onSubmit={recuperarContraseña} className="flex flex-col gap-4">
            <div className="relative">
              <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary-300" />
              <input
                type="email"
                className="w-full border border-primary-300 py-2 pl-8 pr-4 text-secondary-900 rounded-md outline-none"
                placeholder="Ingresa tu correo"
                onChange={(e) => setCorreo_us(e.target.value)}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-primary-300 py-2 px-4 text-white rounded-md hover:bg-primary-400 transition-colors"
              >
                Recuperar Contraseña
              </button>
            </div>
          </form>
        </div>
        <span className="flex items-center justify-center gap-2 text-gray-200">
          ¿Recordaste tu contraseña?{" "}
          <Link
            to="../"
            className="text-secondary-200 font-bold hover:underline decoration-1"
          >
            Volver al Login
          </Link>
        </span>
      </div>

      <AlertaMala
        mostrarAlertaMala={mostrarAlertaMala}
        alertaMala={alertaMala}
      />

      <AlertaBuena
        mostrarAlertaBuena={mostrarAlertaBuena}
        alertaBuena={alertaBuena}
      />
    </div>
  );
};

export default OlvideContraseña;
