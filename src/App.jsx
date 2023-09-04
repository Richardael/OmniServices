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
          </Route>

          {/* Registro de Usuario */}
          <Route path="registro-user" element={<LayoutAuth />}>
            <Route index element={<Register />} />
          </Route>
        </Route>

        {/* Rutas Auth */}
        <Route path="auth" element={<LayoutAuth />}>
          <Route index element={<Login />} />
          <Route path="olvide-contraseña" element={<OlvideContraseña />} />
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
