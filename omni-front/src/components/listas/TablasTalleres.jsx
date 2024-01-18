import axios from "axios";
import React, { useState, useEffect } from "react";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import AlertaBuena from "../alertas/AlertaBuena";
import AlertaMala from "../alertas/AlertaMala";

const TablasTalleres = ({ talleres, updateCount, setUpdateCount }) => {
  const [tipo_plataforma, setTipo_plataforma] = useState("");
  const [categoria, setCategoria] = useState("");
  const [nombre_taller, setNombre_taller] = useState("");
  const [descripcion_taller, setDescripcion_taller] = useState("");
  const [publico_taller, setPublico_taller] = useState("");
  const [pre_conocimientos, setPre_conocimientos] = useState("");
  const [temario_taller, setTemario_taller] = useState("");
  const [obj_general, setObj_general] = useState("");
  const [duracion_taller, setDuracion_taller] = useState("");
  const [modalidad_taller, setModalidad_taller] = useState("");
  const [cantidad_participantes, setCantidad_participantes] = useState("");
  const [mostrarAlertaBuena, setMostrarAlertaBuena] = useState(false);
  const [alertaBuena, setAlertaBuena] = useState("");
  const [mostrarAlertaMala, setMostrarAlertaMala] = useState(false);
  const [alertaMala, setAlertaMala] = useState("");
  const [selectedTallerId, setSelectedTallerId] = useState(null);
  const [plataformaTaller, setPlataformaTaller] = useState(false);
  const [categoriaTaller, setCategoriaTaller] = useState(false);
  const [modalidadTaller, setModalidadTaller] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const ordenPlataforma = () => {
    if (plataformaTaller) {
      talleres.sort((IBM, Open) =>
        IBM.tipo_plataforma.localeCompare(Open.tipo_plataforma)
      );
      setPlataformaTaller(!plataformaTaller);
      setCategoriaTaller(false);
      setModalidadTaller(false);
    } else {
      talleres.sort((IBM, Open) =>
      Open.tipo_plataforma.localeCompare(IBM.tipo_plataforma)
      );
      setPlataformaTaller(!plataformaTaller);
      setCategoriaTaller(false);
      setModalidadTaller(false);
    }
  };
  const ordenCategoria = () => {
    //Quiero que se ordenen los talleres por categoria de forma ascendente y descendente
    //El Orden de las categorias debe ser abecedario
    if (categoriaTaller) {
      talleres.sort((a, b) => b.categoria.localeCompare(a.categoria));
      setCategoriaTaller(!categoriaTaller);
      setModalidadTaller(false);
      setPlataformaTaller(false);
    } else {
      talleres.sort((a, b) => a.categoria.localeCompare(b.categoria));
      setCategoriaTaller(!categoriaTaller);
      setModalidadTaller(false);
      setPlataformaTaller(false);
    }
  };

  const ordenModalidad = () => {
    //Quiero que se ordenen los talleres por modalidad de forma ascendente y descendente
    //El Orden de las modalidades debe ser presencial y online
    if (modalidadTaller) {
      talleres.sort((Online, Presencial) =>
        Online.modalidad_taller.localeCompare(Presencial.modalidad_taller)
      );
      setModalidadTaller(!modalidadTaller);
      setCategoriaTaller(false);
      setPlataformaTaller(false);
    } else {
      talleres.sort((Online, Presencial) =>
        Presencial.modalidad_taller.localeCompare(Online.modalidad_taller)
      );
      setModalidadTaller(!modalidadTaller);
      setCategoriaTaller(false);
      setPlataformaTaller(false);
    }
  };

  const handleEditar = (taller) => {
    setSelectedTallerId(taller._id);
    setTipo_plataforma(taller.tipo_plataforma);
    setCategoria(taller.categoria);
    setNombre_taller(taller.nombre_taller);
    setDescripcion_taller(taller.descripcion_taller);
    setPublico_taller(taller.publico_taller);
    setPre_conocimientos(taller.pre_conocimientos);
    setTemario_taller(taller.temario_taller);
    setObj_general(taller.obj_general);
    setDuracion_taller(taller.duracion_taller);
    setModalidad_taller(taller.modalidad_taller);
    setCantidad_participantes(taller.cantidad_participantes);
    setShowModal(true);
  };

  const handleEliminar = (id) => {
    axios
      .delete(`https://omniservices.onrender.com/lista/eliminar/${id}`, {
        data: { nombre_us: localStorage.getItem("nombre_us") }, // Agrega nombre_us al cuerpo de la solicitud
      })
      .then((res) => {
        console.log(res.data);
        // Incrementa el contador de actualización
        setUpdateCount(updateCount + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const handleEditerTalleres = (e) => {
    e.preventDefault();
    const taller = {
      nombre_us: localStorage.getItem("nombre_us"),
      id: selectedTallerId,
      tipo_plataforma: tipo_plataforma,
      categoria: categoria,
      nombre_taller: nombre_taller,
      descripcion_taller: descripcion_taller,
      publico_taller: publico_taller,
      pre_conocimientos: pre_conocimientos,
      temario_taller: temario_taller,
      obj_general: obj_general,
      duracion_taller: duracion_taller,
      modalidad_taller: modalidad_taller,
      cantidad_participantes: cantidad_participantes,
    };
    axios
    .put(
      `https://omniservices.onrender.com/lista/modificar/${selectedTallerId}`,
      taller
    )
    .then((res) => {
      console.log(res.data);
      //Insertar alerta buena con tiempo
      setMostrarAlertaBuena(true);
      setTimeout(() => {
        setMostrarAlertaBuena(false);
      }, 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
      setAlertaBuena("Servicio editado correctamente");
      // Incrementa el contador de actualización
      setUpdateCount(updateCount + 1);
      setShowModal(false);
    })
    .catch((err) => {
      console.log(err);
      setMostrarAlertaMala(true);
      setTimeout(() => {
        setMostrarAlertaMala(false);
      }
      , 5000); // Ocultar la notificación después de 5000 ms (5 segundos)
      setAlertaMala("Error al editar el servicio");
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-secondary-500">
        <thead className='text-xs text-secondary-900 uppercase bg-gray-50 "'>
          <tr>
            <th scope="col" className="px-4 py-3">
              Nombre del Servicio
            </th>
            <th scope="col" className="px-2 py-3">
              <div className="flex items-center">
                Plataforma
                {plataformaTaller ? (
                  <RiArrowDropUpLine
                    className="w-7 h-7 ml-1.5"
                    onClick={ordenPlataforma}
                  />
                ) : (
                  <RiArrowDropDownLine
                    className="w-7 h-7 ml-1.5"
                    onClick={ordenPlataforma}
                  />
                )}
              </div>
            </th>
            <th scope="col" className="px-2 py-3">
              <div className="flex items-center">
                Categoria
                {categoriaTaller ? (
                  <RiArrowDropUpLine
                    className="w-7 h-7 ml-1.5"
                    onClick={ordenCategoria}
                  />
                ) : (
                  <RiArrowDropDownLine
                    className="w-7 h-7 ml-1.5"
                    onClick={ordenCategoria}
                  />
                )}
              </div>
            </th>
            <th scope="col" className="px-2 py-3">
              <div className="flex items-center">
                Modalidad
                {modalidadTaller ? (
                  <RiArrowDropUpLine
                    className="w-7 h-7 ml-1.5"
                    onClick={ordenModalidad}
                  />
                ) : (
                  <RiArrowDropDownLine
                    className="w-7 h-7 ml-1.5"
                    onClick={ordenModalidad}
                  />
                )}
              </div>
            </th>
            <th scope="col" className="px-2 py-3">
              <span className="sr-only">Editar</span>
            </th>
          </tr>
        </thead>
        <tbody>
        {talleres.map((taller) => (
  <tr
  key={taller._id} // Agregar una prop "key" con un valor único
  className="border-t border-gray-200 bg-gray-50"
>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {taller.nombre_taller.split(" ").splice(0, 7).join(" ")}
                </div>
              </td>
              <td className="px-2 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {taller.tipo_plataforma}
                </div>
              </td>
              <td className="px-2 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-900">{taller.categoria}</div>
              </td>
              <td className="px-2 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {taller.modalidad_taller}
                </div>
              </td>
              <td className="px-2 py-3 whitespace-nowrap text-left pr-5 text-sm font-medium">
              <button
                  onClick={() => handleEliminar(taller._id)}
                  className=" hover:text-secondary-300"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleEditar(taller)}
                  className="text-primary-300 hover:text-primary-400 ml-4"
                >
                  Editar
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal ? (
        <>
          <div className=" flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            {talleres.map(
              (taller) =>
                // Mostrar el modalEditar solo para el taller con el ID coincidente
                selectedTallerId === taller._id && (
                  <div
                    key={taller._id}
                    className="relative w-auto my-6 mx-auto max-w-5xl"
                  >
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                        <h3 className="text-2xl font-semibold">
                          {taller.nombre_taller}
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative px-6 py-2 flex-auto">
                        <form onSubmit={handleEditerTalleres}>
                          <div className="grid grid-cols-3 gap-8 my-4 bg-white p-4 rounded-md shadow-md">
                            {/* Tipo de Plataforma */}
                            <select
                              id="underline_select"
                              value={tipo_plataforma}
                              className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
                              onChange={(e) =>
                                setTipo_plataforma(e.target.value)
                              }
                            >
                              <option disabled selected>
                                Tipo de Plataforma
                              </option>
                              <option value="IBM">IBM</option>
                              <option value="Open">Open</option>
                            </select>
                            {/* Categoria */}
                            <select
                              id="underline_select"
                              value={categoria}
                              className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
                              onChange={(e) => setCategoria(e.target.value)}
                            >
                              {tipo_plataforma === "" && (
                                <option disabled selected>
                                  Elegir Tipo De Plataforma
                                </option>
                              )}
                              {tipo_plataforma === "IBM" && (
                                <optgroup label="IBM">
                                  <option disabled selected>
                                    Categoria
                                  </option>
                                  <option value="Operaciones">
                                    Operaciones
                                  </option>
                                  <option value="Administracion">
                                    Administración
                                  </option>
                                  <option value="Programacion">
                                    Programación
                                  </option>
                                  <option value="Base de datos">
                                    Base de datos
                                  </option>
                                  <option value="Seguridad">Seguridad</option>
                                  <option value="Comunicaciones">
                                    Comunicaciones
                                  </option>
                                </optgroup>
                              )}
                              {tipo_plataforma === "Open" && (
                                <optgroup label="Open">
                                  <option disabled selected>
                                    Categoria
                                  </option>
                                  <option value="Programacion">
                                    Programación
                                  </option>
                                  <option value="Base de datos">
                                    Base de datos
                                  </option>
                                  <option value="Seguridad">Seguridad</option>
                                  <option value="Redes">Redes</option>
                                  <option value="Hardware">Hardware</option>
                                  <option value="Software">Software</option>
                                </optgroup>
                              )}
                            </select>
                            {/* Publico Taller */}
                            <select
                              id="underline_select"
                              value={publico_taller}
                              className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
                              onChange={(e) =>
                                setPublico_taller(e.target.value)
                              }
                            >
                              <option disabled selected>
                                Publico Taller
                              </option>
                              <option value="Banca">Banca</option>
                              <option value="Finanzas">Finanzas</option>
                              <option value="Educacion">Educacion</option>
                              <option value="Salud">Salud</option>
                              <option value="Seguros">Seguros</option>
                              <option value="Telecomunicaciones">
                                Telecomunicaciones
                              </option>
                              <option value="Hosteleria">Hosteleria</option>
                              <option value="Comercio Electronico">
                                Comercio Electronico
                              </option>
                              <option value="Distribucion y Logistica">
                                Distribucion y Logistica
                              </option>
                              <option value="Manufactura">Manufactura</option>
                            </select>
                          </div>

                          <div className="grid grid-cols-4 gap-8 my-4 bg-white p-4 rounded-md shadow-md">
                            {/* Nombre del Servicio */}
                            <div>
                              <label className="flex w-full relative">
                                <input
                                  type="text"
                                  value={nombre_taller}
                                  className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
                                  required
                                  onChange={(e) =>
                                    setNombre_taller(e.target.value)
                                  }
                                />
                                <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
                                  Nombre del Taller{" "}
                                  <span className="text-red-500">*</span>
                                </span>
                              </label>
                            </div>
                            {/* Modalidad Taller */}
                            <select
                              id="underline_select"
                              value={modalidad_taller}
                              className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
                              onChange={(e) =>
                                setModalidad_taller(e.target.value)
                              }
                            >
                              <option disabled selected>
                                Modalidad Taller
                              </option>
                              <option value="Presencial">Presencial</option>
                              <option value="Online">Online</option>
                            </select>
                            {/* Pre-requisitos */}
                            <div>
                              <label className="flex w-full relative">
                                <input
                                  type="text"
                                  value={pre_conocimientos}
                                  className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
                                  required
                                  onChange={(e) =>
                                    setPre_conocimientos(e.target.value)
                                  }
                                />
                                <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
                                  Pre-Conocimientos{" "}
                                  <span className="text-red-500">*</span>
                                </span>
                              </label>
                            </div>
                            {/* Obj General */}
                            <div>
                              <label className="flex w-full relative">
                                <input
                                  type="text"
                                  value={obj_general}
                                  className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
                                  required
                                  onChange={(e) =>
                                    setObj_general(e.target.value)
                                  }
                                />
                                <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
                                  Objetivo General{" "}
                                  <span className="text-red-500">*</span>
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 bg-white gap-8 p-4 rounded-md shadow-md mb-4">
                            {/* Duracion Talleres */}
                            <div>
                              <label className="flex w-full relative">
                                <input
                                  type="number"
                                  value={duracion_taller}
                                  className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
                                  required
                                  onChange={(e) =>
                                    setDuracion_taller(e.target.value)
                                  }
                                />
                                <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
                                  Duracion Taller{" "}
                                  <span className="text-red-500">*</span>
                                </span>
                              </label>
                            </div>
                            {/* Cantidad Participantes */}
                            <div>
                              <label className="flex w-full relative">
                                <input
                                  type="number"
                                  value={cantidad_participantes}
                                  className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
                                  required
                                  onChange={(e) =>
                                    setCantidad_participantes(e.target.value)
                                  }
                                />
                                <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
                                  Cantidad Participantes{" "}
                                  <span className="text-red-500">*</span>
                                </span>
                              </label>
                            </div>
                            {/* Cantidad Participantes */}
                          </div>
                          <div className="grid grid-cols-2 gap-8 bg-white p-4 rounded-md shadow-md">
                            {/* Descripcion Taller */}
                            <div className="my-4 mx-5">
                              <label
                                htmlFor="message"
                                className="block mb-2 text-sm font-medium text-gray-900 px-2"
                              >
                                Descripcion Taller
                                <span className="text-red-500"> *</span>
                              </label>
                              <textarea
                                id="message"
                                rows="4"
                                value={descripcion_taller}
                                className="block p-2.5 w-full text-sm text-secondary-900 bg-gray-50 border-2 border-primary-300 appearance-none outline-none focus:border-2 focus:border-primary-100 rounded-md"
                                placeholder="Escribe una breve descripcion del taller"
                                onChange={(e) =>
                                  setDescripcion_taller(e.target.value)
                                }
                              ></textarea>
                            </div>
                            {/* Temario Taller (Textarea) */}
                            <div className="my-4 mx-5">
                              <label
                                htmlFor="message"
                                className="block mb-2 text-sm font-medium text-gray-900 px-2"
                              >
                                Temario Taller
                                <span className="text-red-500"> *</span>
                              </label>
                              <textarea
                                id="message"
                                rows="4"
                                value={temario_taller}
                                className="block p-2.5 w-full text-sm text-secondary-900 bg-gray-50 border-2 border-primary-300 appearance-none outline-none focus:border-2 focus:border-primary-100 rounded-md"
                                placeholder="Escribe el temario del taller detalladamente"
                                onChange={(e) =>
                                  setTemario_taller(e.target.value)
                                }
                              ></textarea>
                            </div>
                          </div>
                          <div className="text-center">
                            <button className="bg-primary-300 py-2 px-4 mt-5 text-white rounded-md hover:bg-primary-200 transition-colors">
                              Editar Taller
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )
            )}
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

export default TablasTalleres;
