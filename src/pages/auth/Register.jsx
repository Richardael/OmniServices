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
    <div>
 <div className="min-h-screen bg-[#F2F4FE] flex items-center justify-center p-4">
  <div className="max-w-lg">
    <div className="flex justify-center mb-8">
      
    </div>
    <div className="bg-white w-full rounded-lg p-8 mb-8">
      <div className="flex flex-col items-center gap-1 mb-8">
        <h1 className="text-xl text-gray-900">Crear cuenta</h1>
        <p className="text-gray-400 text-sm">
          Crea tu cuenta dentro de la plataforma y disfruta
        </p>
      </div>
      <form className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            className="w-full border py-2 px-10 rounded-md outline-none"
            placeholder="Ingresa tu nombre"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
        <div className="relative">
          <input
            type="email"
            className="w-full border py-2 px-10 rounded-md outline-none"
            placeholder="Ingresa tu correo"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <div className="relative">
          <input
            type="password"
            className="w-full border py-2 px-10 rounded-md outline-none"
            placeholder="Ingresa tu contraseña"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 py-2 px-4 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Crear cuenta
          </button>
        </div>
      </form>
    </div>
    <span className="flex items-center justify-center gap-2">
      ¿Ya tienes cuenta?{" "}
      <a href="#" className="text-blue-500">
        Inicia sesión
      </a>
    </span>
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
