import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../controladores/auth/AuthProvider';

const RutaProtegida = () => {
    //Condicional de Si estas Logeado o no
    const auth = useAuth()
    return (
        <div>
            {auth.isAuthenticated ? <Outlet /> : <Navigate to="/auth" />}
        </div>
    );
}

export default RutaProtegida;