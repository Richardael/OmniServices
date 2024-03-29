import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./controladores/auth/AuthProvider";
import { useState } from "react";

import "./App.css";
//Layouts
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutAuth from "./layouts/LayoutAuth";
import LayoutOmniTime from "./layouts/LayoutOmniTime";

//Pages Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import OlvideContraseña from "./pages/auth/OlvideContraseña";
import OlvideValidado from "./pages/auth/OlvideValidado";

//Pages Admin
import Error404 from "./pages/Error404";
import Home from "./pages/admin/Home";
import ServiciosOPEN from "./pages/admin/ServiciosOpen";
import ServiciosIBM from "./pages/admin/ServiciosIBM";
import RutaProtegida from "./pages/RutaProtegida";
import RegistrarServicios from "./pages/admin/RegistrarServicios";
import TalleresIBM from "./pages/admin/TalleresIBM";
import TalleresOpen from "./pages/admin/TalleresOpen";
import RegistrarTalleres from "./pages/admin/RegistrarTalleres";
import ListaServicios from "./pages/admin/ListaServicios";
import ListaTalleres from "./pages/admin/ListaTalleres";
import Historial from "./pages/admin/Historial";

//Pages OmniTime
import GaleriaActividades from "./pages/omnitime/GaleriaActividades";
import GaleriaProyectos from "./pages/omnitime/GaleriaProyectos";
import ListaClientes from "./pages/omnitime/ListaClientes";
import Resumen from "./pages/omnitime/Resumen";
import CrearActividades from "./pages/omnitime/CrearActividades";
import Perfil from "./pages/omnitime/Perfil";

function App() {
  const [updateCount, setUpdateCount] = useState(0);
  return (
    <BrowserRouter>
      <Routes>

        {/* Ruta Protegida */}
        <Route path="/" element={<RutaProtegida />}>
          {/* Rutas Dashboard Admin */}
          <Route path="/" element={<LayoutAdmin />}>
            {/* Quiero agregarle updateCount */}
            <Route index element={<Home   />} />
            <Route path="servicios-open" element={<ServiciosOPEN />} />
            <Route path="servicios-ibm" element={<ServiciosIBM />} />
            <Route path="registro-servicios" element={<RegistrarServicios />} />
            <Route path="registro-talleres" element={<RegistrarTalleres   />} />
            <Route path="talleres-ibm" element={<TalleresIBM />} />
            <Route path="talleres-open" element={<TalleresOpen />} />
            <Route path="lista-servicios" element={<ListaServicios />} />
            <Route path="lista-talleres" element={<ListaTalleres /> } />
            <Route path="historial" element={<Historial />} />
          </Route>
          {/* Rutas Dashboard OmniTime */}
          <Route path="/omnitime" element={<LayoutOmniTime />}>
            <Route path="galeria-actividades" element={<GaleriaActividades />} />
            <Route path="galeria-proyectos" element={<GaleriaProyectos />} />
            <Route path="lista-clientes" element={<ListaClientes />} />
            <Route path="resumen" element={<Resumen />} />
            <Route path="crear-actividad" element={<CrearActividades />} />
            <Route path="editar-perfil" element={<Perfil />} />
          </Route>
        </Route>

        {/* Rutas Auth */}
        <Route path="auth" element={<LayoutAuth />}>
          <Route index element={<Login />} />
          <Route path="olvide-contraseña" element={<OlvideContraseña />} />
          <Route path="registro-user" element={<Register />} />
          {/* Creame una ruta dinamica para el olvide validado, que tome el token de la url que le es enviado al correo en forma de token */}
          {/* Un ejemplo de la direccion es esta http://192.168.1.16:1111/auth/olvide-validado/5c40f9d1941bc21c234ced92c6063807b1bd435c*/}
          <Route path="olvide-validado/:token" element={<OlvideValidado />} />
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
