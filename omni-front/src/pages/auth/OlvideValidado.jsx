import React from 'react'
import {useState} from 'react'
import {RiLockLine, RiEyeLine, RiEyeCloseLine} from "react-icons/ri"
import axios from 'axios'
import AlertaBuena from '../../components/alertas/AlertaBuena'
import AlertaMala from '../../components/alertas/AlertaMala'

const OlvideValidado = () => {
    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    const [password, setPassword] = useState("");
    const [repeat_password, setRepeat_Password] = useState("");
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
    const [mostrarAlertaBuena, setMostrarAlertaBuena] = useState(false);
    const [alertaBuena, setAlertaBuena] = useState("");
    const [mostrarAlertaMala, setMostrarAlertaMala] = useState(false);
    const [alertaMala, setAlertaMala] = useState("");


    const recuperarContraseña = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.put(
          "https://omniservices.onrender.com/usuarios/reset-password",
          {
            nuevo_password: password,
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
      }

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
          <h1 className="text-xl text-primary-300 ">Completar Recuperacion</h1>
          <p className="text-gray-400 text-sm">
            Ingresa una nueva contraseña para acceder a tu perfil
          </p>
        </div>
        <form onSubmit={recuperarContraseña}
          
          className="flex flex-col gap-4">
        <div className="relative">
              <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary-300 w-5 h-5" />
                <input
                type={mostrarContraseña ? "text" : "password"}
                autoComplete="off"
                className="w-full border py-2 px-8 rounded-md outline-none bg-secondary-100 text-secondary-900 group focus:ring-1 focus:ring-primary-300"
                  placeholder="Ingresa tu nueva contraseña"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                 {mostrarContraseña ? (
                <RiEyeLine
                  onClick={() => setMostrarContraseña(!mostrarContraseña)}
                  className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary-300 select-none"
                />
              ) : (
                <RiEyeCloseLine
                  onClick={() => setMostrarContraseña(!mostrarContraseña)}
                  className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary-300 select-none"
                />
              )}
              </div>
              <div className="relative">
            <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary-300 w-5 h-5" />
              <input
              type={mostrarConfirmar ? "text" : "password"}
              autoComplete="off"
              className="w-full border py-2 px-8 rounded-md outline-none bg-secondary-100 text-secondary-900 group focus:ring-1 focus:ring-primary-300"
                placeholder="Confirma tu nueva contraseña"
                name="password"
                value={repeat_password}
                onChange={(e) => setRepeat_Password(e.target.value)}
              />
               {mostrarConfirmar ? (
              <RiEyeLine
                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary-300 select-none"
              />
            ) : (
              <RiEyeCloseLine
                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary-300 select-none"
              />
            )}
            </div>
          <div>
            <button
              type="submit"
              className="w-full bg-primary-300 py-2 px-4 text-white rounded-md hover:bg-primary-400 transition-colors"
            >
              Cambiar Contraseña
            </button>
          </div>
        </form>
      </div>
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
  )
}

export default OlvideValidado