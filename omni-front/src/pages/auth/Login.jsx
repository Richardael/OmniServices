//Hooks
import { useState } from "react";
import { useAuth } from "..//../controladores/auth/AuthProvider";
//Bibliotecas
import axios from "axios";
//Estilos
import "./../../App.css";
//Componentes
import AlertaBuena from "./../../components/alertas/AlertaBuena";
import AlertaMala from "./../../components/alertas/AlertaMala";
//Imagenes
import logo from "./../../assets/Systick.png";
//Icons
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeCloseLine,
} from "react-icons/ri";

//Rutas
import { Link, Navigate } from "react-router-dom";
const Login = () => {
  //Alertas
  const [mostrarAlertaBuena, setMostrarAlertaBuena] = useState(false);
  const [alertaBuena, setAlertaBuena] = useState("");
  const [mostrarAlertaMala, setMostrarAlertaMala] = useState(false);
  const [alertaMala, setAlertaMala] = useState("");

  //Estado Mostrar Contraseña
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  //Estados Login User
  const [correo_us, setCorreo_us] = useState("");
  const [password, setPassword] = useState("");

  //Verificar si estas Logeado
  const auth = useAuth();
  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Enviar Datos Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    //User Vacio de React
    if (correo_us.length === 0) {
      setMostrarAlertaMala(true);
      setTimeout(() => {
        setMostrarAlertaMala(false);
      }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
      setAlertaMala("Usuario no puede estar vacío");

      //Password No puede estar vacio
    } else if (password.length === 0) {
      setMostrarAlertaMala(true);
      setTimeout(() => {
        setMostrarAlertaMala(false);
      }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
      setAlertaMala("Password no puede estar vacío");
    }
    //Login Completo
    else {
      try {
        const response = await axios.post("http://192.168.1.50:8000/login/login", {
          correo_us: correo_us,
          password: password,
        });
        const token = response.data;

        if (token) {
          setMostrarAlertaBuena(true);
          setTimeout(() => {
            setMostrarAlertaBuena(false);
            // Almacena el token en el contexto de autenticación
            console.log (token);
            auth.saveUser({ accessToken: token });
            //Almacena el nombre_us que viene del token
            localStorage.setItem("id_rol", response.data["id_rol"]);
            localStorage.setItem("nombre_us", response.data["nombre_us"]);
          }, 1000);
          setAlertaBuena("Inicio de sesión exitoso");
        } else {
          setMostrarAlertaMala(true);
          setTimeout(() => {
            setMostrarAlertaMala(false);
          }, 5000);
          setAlertaMala("Inicio de sesión fallido");
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
    }
  };

  //Vista Login
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
              <h1 className="text-xl text-gray-900">Bienvenido a<span className="text-primary-300 font-semibold"> OmniServices</span></h1>
              <p className="text-gray-400 text-sm">
                Ingresa con tu correo electrónico y tu contraseña
              </p>

            </div>
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
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
                ¿No Tienes una Cuenta?{" "}
                              <Link
                to="/auth/registro-user"
                className="text-primary-300 font-medium hover:underline decoration-1 transition-colors"
              >
                Registrate
              </Link>
              </p>
          </div>
          <span className="flex items-center justify-center gap-2 text-gray-200">
            ¿Olvidaste tu contraseña?{" "}
            <Link
                to="/auth/olvide-contraseña"
                className="text-secondary-100 font-medium hover:underline decoration-1 transition-colors"
              >
                Recuperar
              </Link>
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

export default Login;
