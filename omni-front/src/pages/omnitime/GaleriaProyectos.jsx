import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//Alertas
import AlertaBuena from "../../components/alertas/AlertaBuena";
import AlertaMala from "../../components/alertas/AlertaMala";

const GaleriaProyectos = () => {
  //Estados para proyecto
  const [proyectos, setProyectos] = React.useState([]);
  //Estado de Modal
  const [modalCrearProyecto, setModalCrearProyecto] = React.useState(false);
  const [modalEditar, setModalEditar] = React.useState(false);
  //Estados de crear Proyecto
  const [nombreProyecto, setNombreProyecto] = React.useState("");
  const [descripcionProyecto, setDescripcionProyecto] = React.useState("");
  const [clienteProyecto, setClienteProyecto] = React.useState("");
  const [categoriaProyecto, setCategoriaProyecto] = React.useState(0);
  const [clientes, setClientes] = React.useState([]);
  const [idProyecto, setIdProyecto] = React.useState("");

  //Obtener el usuario actual
  const id_usuario = localStorage.getItem("id_usuario");

  //Alertas
  const [mostrarAlertaMala, setMostrarAlertaMala] = React.useState(false);
  const [alertaMala, setAlertaMala] = React.useState("");
  const [mostrarAlertaBuena, setMostrarAlertaBuena] = React.useState(false);
  const [alertaBuena, setAlertaBuena] = React.useState("");
  const [contadorActualizarComponente, setContadorActualizarComponente] = React.useState(0);
  //Obtener Proyectos
  const obtenerProyectos = async () => {
    try {
      const { data } = await axios.get(
        `https://clockigenial2.onrender.com/lista/proyectos-por-usuario/${id_usuario}`
      );
      setProyectos(data.proyectosUsuario);
      console.log(data.proyectosUsuario);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    obtenerProyectos();
  }, [contadorActualizarComponente]);

  //Obtener Clientes
  const obtenerClientes = async () => {
    try {
      const { data } = await axios.get(
        `https://clockigenial2.onrender.com/lista/clientes-por-usuario/${id_usuario}`
      );
      setClientes(data.clientesUsuario);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    obtenerClientes();
  }, []);

  //Color Proyecto
  const colorCategoria = (categoria) => {
    switch (categoria) {
      case 1:
        return {
          backgroundColor: "#f87171",
        };
      case 2:
        return {
          backgroundColor: "#60a5fa",
        };
      case 3:
        return {
          backgroundColor: "#4ade80",
        };
      case 4:
        return {
          backgroundColor: "#facc15",
        };
      case 5:
        return {
          backgroundColor: "#a78bfa",
        };
      case 6:
        return {
          backgroundColor: "#fb923c",
        };
      default: {
        return {
          backgroundColor: "#F1f1f1",
        };
      }
    }
  };

  //Abrir modal
  const abrirModal = () => {
    setModalCrearProyecto(true);
  };
  const abrirModalEditar = (id_proyecto) => {
    setModalEditar(true);
    const proyecto = proyectos.find((proyecto) => proyecto.id_proyecto === id_proyecto);
    console.log(proyecto);
    setNombreProyecto(proyecto.nombre_proyecto);
    setDescripcionProyecto(proyecto.descripcion);
    setClienteProyecto(proyecto.nombre_cliente);
    setCategoriaProyecto(proyecto.categoria);
    setIdProyecto(proyecto.id_proyecto);
  }

  //Crear Proyecto
  const crearProyecto = async (e) => {
    e.preventDefault();
    //Validar
    if (
      nombreProyecto.trim() === "" ||
      descripcionProyecto.trim() === "" ||
      clienteProyecto.trim() === "" ||
      categoriaProyecto.trim() === ""
    ) {
      console.log("Campos vacios");
      return;
    }
    //Crear Proyecto
    try {
      const { data } = await axios.post(
        `https://clockigenial2.onrender.com/proyecto/registro-proyecto`,
        {
          nombre_proyecto: nombreProyecto,
          id_cliente: clienteProyecto,
          id_usuario: id_usuario,
          categoria: categoriaProyecto,
          descripcion: descripcionProyecto,
        }
      );
      console.log(data);
      //Alerta
      setMostrarAlertaBuena(true);
      setTimeout(() => {
        setMostrarAlertaBuena(false);
      }, 5000);
      setAlertaBuena("Proyecto creado correctamente");
      setContadorActualizarComponente(contadorActualizarComponente + 1);
      setModalCrearProyecto(false);
    } catch (error) {
      console.log(error);
      //Alerta
      setMostrarAlertaMala(true);
      setTimeout(() => {
        setMostrarAlertaMala(false);
      }, 5000);
      setAlertaMala("Error al crear el proyecto");
    }
  };

  //Eliminar Proyecto
  const eliminarProyecto = async (id_proyecto) => {
    try {
      const { data } = await axios.delete(
        `https://clockigenial2.onrender.com/proyecto/eliminar-proyecto/${id_proyecto}`
      );
      console.log(data);
      //Alerta
      setMostrarAlertaBuena(true);
      setTimeout(() => {
        setMostrarAlertaBuena(false);
      }, 5000);
      setAlertaBuena("Proyecto eliminado correctamente");
      setContadorActualizarComponente(contadorActualizarComponente + 1);
    } catch (error) {
      console.log(error);
      //Alerta
      setMostrarAlertaMala(true);
      setTimeout(() => {
        setMostrarAlertaMala(false);
      }, 5000);
      setAlertaMala("Error al eliminar el proyecto");
    }
  };

  //Editar Proyecto
  const editarCliente = async (e) => {
    e.preventDefault();
    //Validar
    if (
      nombreProyecto.trim() === "" ||
      descripcionProyecto.trim() === ""
    ) {
      console.log("Campos vacios");
      return;
    }
    //Editar
    try {
      const { data } = await axios.put(
        `https://clockigenial2.onrender.com/proyecto/editar-proyecto/${idProyecto}`,
        {
          nombre_proyecto: nombreProyecto,
          categoria: categoriaProyecto,
          descripcion: descripcionProyecto,
        }
      );
      console.log(data);
      //Alerta
      setMostrarAlertaBuena(true);
      setTimeout(() => {
        setMostrarAlertaBuena(false);
      }, 5000);
      setAlertaBuena("Proyecto actualizado correctamente");
      setContadorActualizarComponente(contadorActualizarComponente + 1);
      setModalEditar(false);
    } catch (error) {
      console.log(error);
      //Alerta
      setMostrarAlertaMala(true);
      setTimeout(() => {
        setMostrarAlertaMala(false);
      }, 5000);
      setAlertaMala("Error al actualizar el proyecto");
    }
  };


  return (
    <div className="m-4 flex flex-col overflow-hidden">
      {proyectos.length ? (
        <>
          <div  className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table  className="w-full border-collapse bg-gray-50 text-left text-sm text-gray-500">
              <thead  className="bg-[#1E1F24]">
                <tr>
                  <th scope="col"  className="px-6 py-4 font-medium text-gray-300">
                    Nombre de Proyecto
                  </th>
                  <th scope="col"  className="px-6 py-4 font-medium text-gray-300">
                    Cliente
                  </th>
                  <th scope="col"  className="px-6 py-4 font-medium text-gray-300">
                    Actividades
                  </th>
                  <th scope="col"  className="px-6 py-4 font-medium text-gray-300">
                    Descripcion
                  </th>
                  <th
                    scope="col"
                     className="px-6 py-4 font-medium text-gray-300"
                  ></th>
                </tr>
              </thead>
              <tbody  className="divide-y divide-secondary-300 border-t border-secondary-300">
                {proyectos.map((proyecto) => (
                  <tr
                     className="hover:bg-gray-50"
                    key={proyecto.id_proyecto}
                  >
                    <th  className="flex gap-3 px-6 py-4 items-center font-normal text-gray-600">
                      <div  className="relative h-10 w-10 rounded-full" style={colorCategoria(proyecto.categoria)} >
                      </div>
                      <div  className="text-sm">
                        <div  className="font-semibold text-gray-600">
                          {proyecto.nombre_proyecto}
                        </div>
                      </div>
                    </th>
                    <td  className="px-6 py-4">
                      <span  className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-violet-600">
                        {proyecto.nombre_cliente}
                      </span>
                    </td>
                    <td  className="px-6 py-4 text-gray-600">{proyecto.contador}</td>
                    <td  className="px-6 py-4 text-gray-600">
                      <p>{proyecto.descripcion}</p>
                    </td>
                    <td  className="px-6 py-4">
                      <div  className="flex justify-end gap-4">
                        <a x-data="{ tooltip: 'Delete' }" href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            onClick={() => eliminarProyecto(proyecto.id_proyecto)}
                             className="h-6 w-6 text-gray-600 hover:scale-125 transition-all duration-300"
                            x-tooltip="tooltip"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </a>
                        <a x-data="{ tooltip: 'Edite' }" href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            onClick={() => abrirModalEditar(proyecto.id_proyecto)}
                             className="h-6 w-6 text-gray-600 hover:scale-125 transition-all duration-300"
                            x-tooltip="tooltip"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                          </svg>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={abrirModal}
             className="bg-[#1E1F24] hover:bg-[#2D2E33] text-white font-bold py-2 px-4 mx-auto rounded-xl items-end justify-end "
          >
            Crear Proyecto
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-black text-4xl text-center grid col-span-3">
              No tienes ningun proyecto registrado
            </h2>
            <p className="text-xl mt-5 mb-10 text-center">
              Registra tus {""}
              <span className="text-violet-600 font-bold">Proyectos</span>
            </p>
            <button  className="bg-[#1E1F24] hover:bg-[#2D2E33] text-white font-bold py-2 px-4 mx-auto rounded-xl items-end justify-end ">
              Crear Proyecto
            </button>
          </div>
        </>
      )}
      {/* Modal Editar Proyecto */}
      {modalEditar ? (
        <>
          <div className="justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-secondary-300 rounded-t">
                  <h3 className="text-3xl font-semibold">Editar Proyecto</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div>
                    <div className="mb-3 pt-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Nombre del Proyecto
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ring-violet-600"
                        placeholder="Nombre del Proyecto"
                        style={{ transition: "all .15s ease" }}
                        value={nombreProyecto}
                        onChange={(e) => setNombreProyecto(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 pt-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Descripcion
                      </label>
                      <textarea
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ring-violet-600"
                        placeholder="Descripcion"
                        style={{ transition: "all .15s ease" }}
                        value={descripcionProyecto}
                        onChange={(e) => setDescripcionProyecto(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 pt-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Categoria del Proyecto (Color)
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ring-violet-600 "
                        value={categoriaProyecto}
                        onChange={(e) => setCategoriaProyecto(e.target.value)}
                      >
                        <option value="0">Selecciona una Categoria</option>
                        <option value="1">Rojo</option>
                        <option value="2">Azul</option>
                        <option value="3">Verde</option>
                        <option value="4">Amarillo</option>
                        <option value="5">Morado</option>
                        <option value="6">Naranja</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-secondary-200 rounded-b">
                  <button
                    className="text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setModalEditar(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-violet-600 text-white active:bg-violet-600 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={editarCliente}
                  >
                    Editar Proyecto
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* Modal Crear Proyecto */}
      {modalCrearProyecto ? (
        <>
          <div className="justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-secondary-300 rounded-t">
                  <h3 className="text-3xl font-semibold">Crear Proyecto</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div>
                    <div className="mb-3 pt-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Nombre del Proyecto
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ring-violet-600"
                        placeholder="Nombre del Proyecto"
                        style={{ transition: "all .15s ease" }}
                        value={nombreProyecto}
                        onChange={(e) => setNombreProyecto(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 pt-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Descripcion
                      </label>
                      <textarea
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ring-violet-600"
                        placeholder="Descripcion"
                        style={{ transition: "all .15s ease" }}
                        value={descripcionProyecto}
                        onChange={(e) => setDescripcionProyecto(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 pt-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Cliente
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ring-violet-600 "
                        value={clienteProyecto}
                        onChange={(e) => setClienteProyecto(e.target.value)}
                      >
                        <option value="0">Selecciona un Cliente</option>
                        {clientes.map((cliente) => (
                          <option value={cliente.id_cliente}>
                            {cliente.nombre_cliente}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 pt-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Categoria del Proyecto (Color)
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ring-violet-600 "
                        value={categoriaProyecto}
                        onChange={(e) => setCategoriaProyecto(e.target.value)}
                      >
                        <option value="0">Selecciona una Categoria</option>
                        <option value="1">Rojo</option>
                        <option value="2">Azul</option>
                        <option value="3">Verde</option>
                        <option value="4">Amarillo</option>
                        <option value="5">Morado</option>
                        <option value="6">Naranja</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-secondary-200 rounded-b">
                  <button
                    className="text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setModalCrearProyecto(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-violet-600 text-white active:bg-violet-600 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={crearProyecto}
                  >
                    Crear Proyecto
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
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

export default GaleriaProyectos;
