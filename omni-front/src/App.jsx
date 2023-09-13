import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./controladores/auth/AuthProvider";
import "./App.css";
//Layouts
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutAuth from "./layouts/LayoutAuth";

//Pages Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import OlvideContraseña from "./pages/auth/OlvideContraseña";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Ruta Protegida */}
        <Route path="/" element={<RutaProtegida />}>
          {/* Rutas Dashboard Admin */}
          <Route path="/" element={<LayoutAdmin />}>
            <Route index element={<Home />} />
            <Route path="servicios-open" element={<ServiciosOPEN />} />
            <Route path="servicios-ibm" element={<ServiciosIBM />} />
            <Route path="registro-servicios" element={<RegistrarServicios />}/>
            <Route path="registro-talleres" element={<RegistrarTalleres />}/>
            <Route path="talleres-ibm" element={<TalleresIBM />} />
            <Route path="talleres-open" element={<TalleresOpen />} />
          </Route>
        </Route>

        {/* Rutas Auth */}
        <Route path="auth" element={<LayoutAuth />}>
          <Route index element={<Login />} />
          <Route path="olvide-contraseña" element={<OlvideContraseña />} />
          <Route path="registro-user" element={<Register />} />
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
