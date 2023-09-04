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
  const [repeat_password, setRepeat_password] = useState("");

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
        const response = await axios.post('http://192.168.1.50:8000/registro/', {
          nombre_us: nombre_us,
          nombre_completo: nombre_completo,
          correo_us: correo_us,
          password: password,
          repeat_password: repeat_password
        });
        const token = response.data["token"];
        
        if (token) {
          setMostrarAlertaBuena(true);
          setTimeout(() => {
            setMostrarAlertaBuena(false);
          }, 1000); 
          setAlertaBuena("Registro Exitoso exitoso");
        } else {
          setMostrarAlertaMala(true);
          setTimeout(() => {
            setMostrarAlertaMala(false);
          }, 5000); 
          setAlertaMala("Registro fallido");
        }
      } catch (error) {
        console.error("Registro fallido: ", error);
      }
    }
  };
  //Vista Registro
  return (
    <div className="sm:flex">
      <div className="register flex flex-col min-h-screen rounded-lg md:p-8 max-sm:mt-6 sm:w-3/5">
        <div className="flex relative items-center px-8 pt-6 pb-2">
          <img className="w-10 h-10" src={logo} alt="Logo Systick" />
          <h1 className="text-gray-100 absolute ml-9 text-3xl font-medium tracking-widest">
            ystick
          </h1>
        </div>
        <div className="p-8">
          <h3 className="text-gray-500 uppercase text-sm font-bold mb-2">
            Registra todos los usuarios que desees
          </h3>
          <h1 className="text-3xl text-white font-medium mb-3">
            Crea un usuario
          </h1>
          <span className="text-gray-500 font-medium">
            ¿Ya es un usuario creado?{" "}
            <Link to="../" className="text-primary-100 hover:underline">
              Salir
            </Link>
          </span>
          <form onSubmit={handleRegisterSubmit} className="mt-8">
            <div className="max-w-lg mb-4 flex flex-col md:flex-row items-center justify-between gap-4 relative">
              <RiUser4Line className="absolute md:top-1/2 -translate-y-1/2 left-2 text-primary-100 max-md:mt-6" />
              <input
                type="text"
                autoComplete="off"
                className="w-full py-3 pl-8 pr-4 rounded-xl outline-none bg-secondary-100 text-gray-100 group focus:ring-2 focus:ring-primary-100"
                placeholder="Nombre de Usuario"
                name="nombre_us"
                value={nombre_us}
                onChange={(e) => setNombre_us(e.target.value)}
              />
              <RiUser3Line className="absolute md:top-1/2 -translate-y-1/2 md:ml-4 left-1/2 text-primary-100 max-md:top-3/4 mt-1 max-md:left-2" />
              <input
                type="text"
                autoComplete="off"
                className="w-full py-3 pl-8 pr-4 rounded-xl outline-none bg-secondary-100 text-gray-100 group focus:ring-2 focus:ring-primary-100"
                placeholder="Nombre Completo"
                name="nombre_completo"
                value={nombre_completo}
                onChange={(e) => setNombre_completo(e.target.value)}
              />
            </div>
            <div className="max-w-lg mb-4 relative">
              <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary-100" />
              <input
                type="email"
                autoComplete="off"
                className="w-full py-3 pl-8 pr-4 rounded-xl outline-none bg-secondary-100 text-gray-100 group focus:ring-2 focus:ring-primary-100"
                placeholder="Correo electrónico"
                name="correo_us"
                value={correo_us}
                onChange={(e) => setCorreo_us(e.target.value)}
              />
            </div>
            <div className="max-w-lg mb-4 flex flex-col md:flex-row items-center justify-between gap-4 relative">
              <RiLockLine className="absolute md:top-1/2 -translate-y-1/2 left-2 text-primary-100 max-md:mt-6" />
              <input
                type={mostrarContraseña ? "text" : "password"}
                autoComplete="off"
                className="w-full py-3 px-8 rounded-xl outline-none bg-secondary-100 text-gray-100 group focus:ring-2 focus:ring-primary-100"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {mostrarContraseña ? (
                <RiEyeLine
                  onClick={() => setMostrarContraseña(!mostrarContraseña)}
                  className="absolute md:top-1/2 -translate-y-1/2 md:right-1/2 md:mr-4 hover:cursor-pointer text-primary-100 max-md:mt-6 max-md:right-2 select-none"
                />
              ) : (
                <RiEyeCloseLine
                  onClick={() => setMostrarContraseña(!mostrarContraseña)}
                  className="absolute md:top-1/2 -translate-y-1/2 md:right-1/2 md:mr-4 hover:cursor-pointer text-primary-100 max-md:mt-6 max-md:right-2 select-none"
                />
              )}
              <RiLockLine className="absolute md:top-1/2 -translate-y-1/2 md:ml-4 left-1/2 text-primary-100 max-md:left-2 max-md:top-2/4 max-md:mt-6" />
              <input
                type={mostrarConfirmar ? "text" : "password"}
                autoComplete="off"
                className="w-full py-3 px-8 rounded-xl outline-none bg-secondary-100 text-gray-100 group focus:ring-2 focus:ring-primary-100"
                placeholder="Confirmar Contraseña"
                name="repeat_password"
                value={repeat_password}
                onChange={(e) => setRepeat_password(e.target.value)}
              />
              {mostrarConfirmar ? (
                <RiEyeLine
                  onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                  className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary-100 select-none max-md:mt-8 max-md:right-2"
                />
              ) : (
                <RiEyeCloseLine
                  onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                  className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary-100 select-none max-md:mt-8 max-md:right-2"
                />
              )}
            </div>
            <div className="max-w-lg">
              <button className="bg-primary-100 text-white w-full py-3 px-4 rounded-xl hover:bg-primary-200 transition-colors">
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex items-center sm:w-3/5 max-sm:hidden">
        <h1 className="text-white text-3xl text-center mr-14 font-mono">
          Systik Impulsa tu Equipo: Implementa Soluciones,{" "}
          <span className="text-green-500 font-bold animate-pulse">
            {" "}
            Eleva Productividad.
          </span>
        </h1>
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
