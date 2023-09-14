import { useState } from "react";
//Bibliotecas
import axios from "axios";
//Estilos
import "./../../App.css";
//Imagenes
import logo from "./../../assets/Systick.png";
//Componentes
import AlertaBuena from "./../../components/alertas/AlertaBuena";
import AlertaMala from "./../../components/alertas/AlertaMala";

//Icons
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeCloseLine,
  RiUser3Line,
  RiUser4Line,
  RiUser2Line,
} from "react-icons/ri";

//Rutas
import { Link } from "react-router-dom";

const Register = () => {
  //Alertas
  const [mostrarAlertaBuena, setMostrarAlertaBuena] = useState(false);
  const [alertaBuena, setAlertaBuena] = useState("");
  const [mostrarAlertaMala, setMostrarAlertaMala] = useState(false);
  const [alertaMala, setAlertaMala] = useState("");

  // Estados del Registro User
  const [nombre_us, setNombre_us] = useState("");
  const [nombre_completo, setNombre_completo] = useState("");
  const [correo_us, setCorreo_us] = useState("");
  const [password, setPassword] = useState("");
  const [repeat_password, setRepeat_Password] = useState("");

  //Estado Mostrar Contraseña
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  //Estado Confirmar Contraseña
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    //User Vacio de React
    if (correo_us.length === 0) {
      setMostrarAlertaMala(true);
      setTimeout(() => {
        setMostrarAlertaMala(false);
      }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
      setAlertaMala("Correo no puede estar vacio");
      //Password No puede estar vacio
    } else if (password.length === 0) {
      setMostrarAlertaMala(true);
      setTimeout(() => {
        setMostrarAlertaMala(false);
      }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
      setAlertaMala("Password no puede estar vacío");
      //Repetir Password No puede estar vacio
    } else if (repeat_password.length === 0) {
      setMostrarAlertaMala(true);
      setTimeout(() => {
        setMostrarAlertaMala(false);
      }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
      setAlertaMala("Repetir contraseña no puede estar vacío");
      //Nombre de Usuario No puede estar vacio
    } else if (nombre_us.length === 0) {
      setMostrarAlertaMala(true);
      setTimeout(() => {
        setMostrarAlertaMala(false);
      }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
      setAlertaMala("Nombre de Usuario no puede estar Vacio");
      //Nombre Completo No puede estar vacio
    } else if (nombre_completo.length === 0) {
      setMostrarAlertaMala(true);
      setTimeout(() => {
        setMostrarAlertaMala(false);
      }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
      setAlertaMala("Nombre Completo no puede estar vacío");
    }else if (password != repeat_password) {
      setMostrarAlertaMala(true);
      setTimeout(() => {
        setMostrarAlertaMala(false);
      }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
      setAlertaMala("Contraseñas no son iguales");
    }
    else {
      try {
        const response = await axios.post('http://192.168.0.41:8000/usuarios/registro/', {
          nombre_us: nombre_us,
          nombre_completo: nombre_completo,
          correo_us: correo_us,
          password: password,
        });
        //Estoy enviando un json que dice "Token" desde el backend y la clave es message, es una respuesta tras lograr el registro exitoso
        const registrado = response.data
        console.log(registrado);
        if (registrado) {
          setMostrarAlertaBuena(true);
          setTimeout(() => {
            setMostrarAlertaBuena(false);
          }, 1000);
          setAlertaBuena("Registro exitoso");
          //Redirigir usuario al Login
          setTimeout(() => {
            window.location.href = "/auth/";
          }, 1000);
        } else {
          setMostrarAlertaMala(true);
          setTimeout(() => {
            setMostrarAlertaMala(false);
          }, 5000);
          setAlertaMala("Registro fallido");
        }
      }
      catch (error) {
        console.error("Error al registrar:", error);
      }
    }
  };
  //Vista Registro
  return (
    <div>
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg">
        <div className="flex justify-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-100">OmniServices</h1>
          {/* <img src="/logo.png" width="50" height="50" /> */}
        </div>
        <div className="bg-white w-full rounded-lg p-8 mb-8">
          <div className="flex flex-col items-center gap-1 mb-4">
            <h1 className="text-xl text-gray-900">Registrate a<span className="text-primary-300 font-semibold"> OmniServices</span></h1>
            <p className="text-gray-400 text-sm">
              Ingresa tus datos de registro
            </p>

          </div>
          <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
            <div className="relative">
            <RiUser2Line className="absolute top-1/2 -translate-y-1/2 left-2 text-primary-300 w-5 h-5" />
              <input
                type="text"
                autoComplete="off"
                className="w-full border py-2 px-8 rounded-md outline-none bg-secondary-100 text-secondary-900 group focus:ring-1 focus:ring-primary-300"
                placeholder="Nombre de Usuario"
                name="nombre_us"
                value={nombre_us}
                onChange={(e) => setNombre_us(e.target.value)}
              />
            </div>
            <div className="relative">
            <RiUser4Line className="absolute top-1/2 -translate-y-1/2 left-2 text-primary-300 w-5 h-5" />
              <input
                type="text"
                autoComplete="off"
                className="w-full border py-2 px-8 rounded-md outline-none bg-secondary-100 text-secondary-900 group focus:ring-1 focus:ring-primary-300"
                placeholder="Nombre Completo"
                name="nombre_completo"
                value={nombre_completo}
                onChange={(e) => setNombre_completo(e.target.value)}
              />
            </div>
            </div>
            <div className="relative">
            <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary-300 w-5 h-5" />
              <input
                type="email"
                autoComplete="off"
                className="w-full border py-2 px-8 rounded-md outline-none bg-secondary-100 text-secondary-900 group focus:ring-1 focus:ring-primary-300"
                placeholder="Ingresa tu correo"
                name="correo_us"
                value={correo_us}
                onChange={(e) => setCorreo_us(e.target.value)}
              />
            </div>
            <div className="relative">
            <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary-300 w-5 h-5" />
              <input
              type={mostrarContraseña ? "text" : "password"}
              autoComplete="off"
              className="w-full border py-2 px-8 rounded-md outline-none bg-secondary-100 text-secondary-900 group focus:ring-1 focus:ring-primary-300"
                placeholder="Ingresa tu contraseña"
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
                placeholder="Ingresa tu contraseña"
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
                Iniciar sesión
              </button>
            </div>
          </form>
          <p className="text-secondary-300 text-center mt-5">
              ¿Tienes una Cuenta?{" "}
                            <Link
              to="/auth/"
              className="text-primary-300 font-medium hover:text-primary-400 transition-colors"
            >
              Inicia Sesion
            </Link>
            </p>
        </div>
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
  );
};

export default Register;
