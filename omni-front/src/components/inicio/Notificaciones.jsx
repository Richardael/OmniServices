import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    axios
      .get("https://omniservices.onrender.com/historial/notificacion/")
      .then((response) => {
        console.log(response.data);
        setNotificaciones(response.data);
      });
    const interval = setInterval(() => {}, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    //Diseña la vista de las notificaciones de los 3 cambios mas recientes del historial
    //Debe contener Accion, usuario y mensaje
    //Quiero un diseo moderno y agradable
    <div>
      <h1 className="text-3xl font-extrabold text-center text-primary-900 mb-3">
        Notificaciones <span className="text-primary-300"> Recientes</span>
      </h1>
      <div className="relative overflow-x-auto sm:rounded-xl">
        <table className="w-full text-sm text-left text-secondary-500">
          <tbody className="bg-white">
            {notificaciones.map((notificacion) => (
              <tr key={notificacion._id}>
                <td className="px-3 py-3 text-sm">
                  <p className="font-semibold">{notificacion.usuario}</p>
                </td>
                <td className="px-1 py-3">
                  <div className="flex items-center">
                    <div>
                      {/* Condicional si la accion es eliminar que la clase sea text-red-300 si no, que sea text-green-300 */}
                      <p className="font-semibold">
                        {notificacion.accion === "Eliminación" ? (
                          <span className="text-red-400">
                            {notificacion.accion}
                          </span>
                        ) : (
                          <span className="text-green-500">
                            {notificacion.accion}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-1 py-3 text-xs">
                  <p className="font-semibold">{notificacion.detalles}</p>
                </td>
                <td className="px-1 py-3 text-xs"> 
                {/* Quiero que me muestre solo 10 caracteres de fecha y Hora */}
                  <p className="font-semibold">{notificacion.fechaHora.slice(3,25)}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notificaciones;
