import React, { useEffect, useState } from "react";
import axios from "axios";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  //Modal
  const [visible, setVisible] = React.useState(false);
  const [modalEditar, setModalEditar] = React.useState(false);
  //Estados de crear Cliente
  const [nombreCliente, setNombreCliente] = React.useState("");
  const [descripcionCliente, setDescripcionCliente] = React.useState("");
  const [cargoCliente, setCargoCliente] = React.useState("");
  const [emailCliente, setEmailCliente] = React.useState("");
  const [telCliente, setTelCliente] = React.useState("");
  const [idCliente, setIdCliente] = React.useState("");
  //
  const [cliente, setCliente] = React.useState({});

  const [contadorActualizarComponente, setContadorActualizacionComponente] =
    useState(0);

  //Obtener el usuario actual
  const id_usuario = localStorage.getItem("id_usuario");

  //Crear Clientes
  const crearCliente = async () => {
    try {
      if (nombreCliente === "") {
        alert("El nombre del cliente no puede estar vacío");
        return;
      }
      if (descripcionCliente === "") {
        alert("La descripcion del cliente no puede estar vacía");
        return;
      }
      const cliente = {
        nombre_cliente: nombreCliente,
        descripcion_cliente: descripcionCliente,
        id_usuario: id_usuario,
      };
      const response = await axios.post(
        "https://clockigenial2.onrender.com/cliente/registro-cliente",
        cliente
      );
      console.log(response.data);
      setContadorActualizacionComponente(contadorActualizarComponente + 1);
      setVisible(false);
      alert("Cliente Creado");
    } catch (error) {
      console.log(error);
    }
  };

  //ObtenerClientes
  const obtenerClientes = async () => {
    try {
      const { data } = await axios.get(
        `https://clockigenial2.onrender.com/lista/lista-clientes/${id_usuario}`
      );
      setClientes(data.clientesUsuario);
      console.log(data.clientesUsuario);
    } catch (error) {
      console.log(error);
    }
  };

  //Ejecutar la funcion para obtener las actividades
  useEffect(() => {
    obtenerClientes();
  }, [contadorActualizarComponente]);

  //Modal
  const abrirModal = () => setVisible(!visible);

  const abrirModalEditar = (id_cliente) => {
    setModalEditar(!modalEditar);
    const cliente = clientes.find(
      (cliente) => cliente.id_cliente === id_cliente
    );
    setIdCliente(cliente.id_cliente);
    setNombreCliente(cliente.nombre_cliente);
    setDescripcionCliente(cliente.descripcion_cliente);
  };

  //Eliminar Cliente
  const eliminarCliente = async (id_cliente) => {
    try {
      const response = await axios.delete(
        `https://clockigenial2.onrender.com/cliente/eliminar-cliente/${id_cliente}`
      );
      console.log(response.data);
      setContadorActualizacionComponente(contadorActualizarComponente + 1);
      alert("Cliente Eliminado");
    } catch (error) {
      console.log(error);
    }
  };

  const editarCliente = async (id_cliente) => {
    const response = await axios.put(
      `https://clockigenial2.onrender.com/cliente/editar-cliente/${idCliente}`,
      {
        nombre_cliente: nombreCliente,
        descripcion_cliente: descripcionCliente,
        cargo_cliente: cargoCliente,
        email_cliente: emailCliente,
        tel_cliente: telCliente,
      }
    );
    console.log(response.data);
    setContadorActualizacionComponente(contadorActualizarComponente + 1);
    setModalEditar(false);
    alert("Cliente Editado");
  };

  return (
    <div className="m-4 flex flex-col overflow-hidden">
      <>
        <div  className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table  className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead  className="bg-violet-600">
              <tr>
                <th scope="col"  className="px-6 py-4 font-medium text-gray-200">
                  Nombre
                </th>
                <th scope="col"  className="px-6 py-4 font-medium text-gray-200">
                  Telefono
                </th>
                <th scope="col"  className="px-6 py-4 font-medium text-gray-200">
                  Cargo
                </th>
                <th scope="col"  className="px-6 py-4 font-medium text-gray-200">
                  Descripcion
                </th>
                <th
                  scope="col"
                   className="px-6 py-4 font-medium text-gray-200"
                ></th>
              </tr>
            </thead>
            <tbody  className="divide-y divide-gray-100 border-t border-gray-100">
              {clientes.map((cliente) => (
                <tr  className="hover:bg-gray-50" key={cliente.id_cliente}>
                  <th  className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div  className="text-sm">
                      <div  className="font-medium text-gray-700">
                        {cliente.nombre_cliente}
                      </div>
                      <div  className="text-gray-400">{cliente.email_cliente}</div>
                    </div>
                  </th>
                  <td  className="px-6 py-4">
                    <span  className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                      {cliente.tel_cliente}
                    </span>
                  </td>
                  <td  className="px-6 py-4">{cliente.cargo_cliente}</td>
                  <td  className="px-6 py-4">
                    <p>{cliente.descripcion_cliente}</p>
                  </td>
                  <td  className="px-6 py-4">
                    <div  className="flex justify-end gap-4">
                      <a x-data="{ tooltip: 'Delete' }" href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          onClick={() => eliminarCliente(cliente.id_cliente)}
                          stroke="currentColor"
                           className="h-6 w-6 text-gray-600 hover:scale-125 transition-all duration-300"
                          x-tooltip="tooltip"
                        >
                          <path
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </a>
                      <a x-data="{ tooltip: 'Edite' }" href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          onClick={() => abrirModalEditar(cliente.id_cliente)}
                          stroke="currentColor"
                           className="h-6 w-6 text-gray-600 hover:scale-125 transition-all duration-300"
                          x-tooltip="tooltip"
                        >
                          <path
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
          Crear Cliente
        </button>
      </>
      {/* Modal Editar */}
      {modalEditar ? (
        <>
          <div className="justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-secondary-300 rounded-t">
                  <h3 className="text-3xl font-semibold">Editar Cliente</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={abrirModalEditar}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div>
                    <div className="mb-3 pt-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Nombre Cliente
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="Nombre Cliente"
                        value={nombreCliente}
                        onChange={(e) => setNombreCliente(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 pt-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Telefono
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="Telefono"
                        value={telCliente}
                        onChange={(e) => setTelCliente(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 pt-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Cargo
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="Cargo"
                        value={cargoCliente}
                        onChange={(e) => setCargoCliente(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 pt-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Descripcion Cliente
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="Email"
                        value={emailCliente}
                        onChange={(e) => setEmailCliente(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 pt-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Descripcion Cliente
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="Descripcion Cliente"
                        value={descripcionCliente}
                        onChange={(e) => setDescripcionCliente(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-secondary-300 rounded-b">
                  <button
                    className="bg-[#1E1F24] hover:bg-[#2D2E33] text-white font-bold py-2 px-4 mx-auto rounded-xl items-end justify-end "
                    type="button"
                    onClick={() => editarCliente(cliente.id_cliente)}
                  >
                    Editar Cliente
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {/* Modal */}
      {visible ? (
        <>
          <div className="justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-secondary-300 rounded-t">
                  <h3 className="text-3xl font-semibold">Crear Cliente</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={abrirModal}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div>
                    <div className="mb-3 pt-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Nombre Cliente
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="Nombre Cliente"
                        value={nombreCliente}
                        onChange={(e) => setNombreCliente(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 pt-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Descripcion Cliente
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="Descripcion Cliente"
                        value={descripcionCliente}
                        onChange={(e) => setDescripcionCliente(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-secondary-300 rounded-b">
                  <button
                    className="bg-[#1E1F24] hover:bg-[#2D2E33] text-white font-bold py-2 px-4 mx-auto rounded-xl items-end justify-end "
                    type="button"
                    onClick={crearCliente}
                  >
                    Crear Cliente
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default ListaClientes;
