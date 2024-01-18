import axios from "axios";
import React, { useState, useEffect } from "react";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import AlertaBuena from "../alertas/AlertaBuena";
import AlertaMala from "../alertas/AlertaMala";

const TablasServicios = ({servicios,updateCount,setUpdateCount}) => {
  const [plataformaServicio, setPlataformaServicio] = useState(false);
  const [categoriaServicio, setCategoriaServicio] = useState(false);
  const [prioridadServicio, setPrioridadServicio] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [categoria, setTCategoria] = useState("");
  const [nombre_servicio, setNombre_servicio] = useState("");
  const [descripcion_servicio, setDescripcion_servicio] = useState("");
  const [industria_atendida, setIndustria_atendida] = useState("");
  const [tiempo_estimado, setTiempo_estimado] = useState("");
  const [prioridad_servicio, setPrioridad_servicio] = useState("");
  const [costos_servicio, setCostos_servicio] = useState("");
  const [pre_requisitos, setPre_requisitos] = useState("");
  const [tarifa_servicio, setTarifa_servicio] = useState("");
  const [tipo_servicio, setTipo_servicio] = useState("");
  const [tipo_plataforma, setTipo_plataforma] = useState("");
  const [descripciont_servicio, setDescripciont_servicio] = useState("");
  const [disponibilidad_servicio, setDisponibilidad_servicio] = useState("");

  const [selectedServiceId, setSelectedServiceId] = useState(null); // Nueva variable de estado para almacenar el ID del servicio seleccionado

  const [mostrarAlertaBuena, setMostrarAlertaBuena] = useState(false);
  const [alertaBuena, setAlertaBuena] = useState("");
  const [mostrarAlertaMala, setMostrarAlertaMala] = useState(false);
  const [alertaMala, setAlertaMala] = useState("");

  const ordenPlataforma = () => {
    if (plataformaServicio) {
      servicios.sort((IBM, Open) =>
        IBM.tipo_plataforma.localeCompare(Open.tipo_plataforma)
      );
      setPlataformaServicio(!plataformaServicio);
      setCategoriaServicio(false);
      setPrioridadServicio(false);
    } else {
      servicios.sort((IBM, Open) =>
        Open.tipo_plataforma.localeCompare(IBM.tipo_plataforma)
      );
      setPlataformaServicio(!plataformaServicio);
      setCategoriaServicio(false);
      setPrioridadServicio(false);
    }
  };
  const ordenCategoria = () => {
    //Quiero que se ordenen los servicios por categoria de forma ascendente y descendente
    //El Orden de las categorias debe ser abecedario
    if (categoriaServicio) {
      servicios.sort((a, b) =>
        b.categoria.localeCompare(a.categoria)
      );
      setCategoriaServicio(!categoriaServicio);
      setPrioridadServicio(false);
      setPlataformaServicio(false);
    } else {
      servicios.sort((a, b) =>
        a.categoria.localeCompare(b.categoria)
      );
      setCategoriaServicio(!categoriaServicio);
      setPrioridadServicio(false);
      setPlataformaServicio(false);
    }
  };
  const prioridadOrden = {
    "Muy Alta": 1,
    "Alta": 2,
    "Media": 3,
    "Baja": 4,
    "Muy Baja": 5,
    "Planificado": 6,
  };
  const ordenPrioridad = () => {
    if (prioridadServicio) {
      // Orden ascendente
      servicios.sort((a, b) => {
        return (
          prioridadOrden[b.prioridad_servicio] -
          prioridadOrden[a.prioridad_servicio]
        );
      });
    } else {
      // Orden descendente
      servicios.sort((a, b) => {
        return (
          prioridadOrden[a.prioridad_servicio] -
          prioridadOrden[b.prioridad_servicio]
        );
      });
    }

    setPrioridadServicio(!prioridadServicio);
    setCategoriaServicio(false);
    setPlataformaServicio(false);
  };

  const handleEditar = (servicio) => {
    setSelectedServiceId(servicio._id); // Al hacer clic en Editar, establece el ID del servicio seleccionado
    setNombre_servicio(servicio.nombre_servicio);
    setDescripcion_servicio(servicio.descripcion_servicio);
    setIndustria_atendida(servicio.industria_atendida);
    setTiempo_estimado(servicio.tiempo_estimado);
    setPrioridad_servicio(servicio.prioridad_servicio);
    setCostos_servicio(servicio.costos_servicio);
    setPre_requisitos(servicio.pre_requisitos);
    setTarifa_servicio(servicio.tarifa_servicio);
    setTipo_servicio(servicio.tipo_servicio);
    setTipo_plataforma(servicio.tipo_plataforma);
    setDescripciont_servicio(servicio.descripciont_servicio);
    setDisponibilidad_servicio(servicio.disponibilidad_servicio);
    setTCategoria(servicio.categoria);
    setModalEditar(true);
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

  const handleEditerServices = (e) => {
    e.preventDefault();
    const servicio = {
      nombre_us: localStorage.getItem("nombre_us"),
      id: selectedServiceId, // El ID del servicio seleccionado
      nombre_servicio: nombre_servicio,
      tipo_plataforma: tipo_plataforma,
      categoria: categoria,
      tipo_servicio: tipo_servicio,
      industria_atendida: industria_atendida,
      prioridad_servicio: prioridad_servicio,
      disponibilidad_servicio: disponibilidad_servicio,
      pre_requisitos: pre_requisitos,
      tiempo_estimado: tiempo_estimado,
      costos_servicio: costos_servicio,
      tarifa_servicio: tarifa_servicio,
      descripcion_servicio: descripcion_servicio,
      descripciont_servicio: descripciont_servicio,
    };
    axios
      .put(
        `https://omniservices.onrender.com/lista/modificar/${selectedServiceId}`,
        servicio
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
        setModalEditar(false);
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
    <div>
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
                {plataformaServicio ? (
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
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">
                Categoria
                {categoriaServicio ? (
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
                Prioridad
                {prioridadServicio ? (
                  <RiArrowDropUpLine
                    className="w-7 h-7 ml-1.5"
                    onClick={ordenPrioridad}
                  />
                ) : (
                  <RiArrowDropDownLine
                    className="w-7 h-7 ml-1.5"
                    onClick={ordenPrioridad}
                  />
                )}
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Editar</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio) => (
            <tr key={servicio._id} className="bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {servicio.nombre_servicio.split(" ").splice(0, 8).join(" ")}
                </div>
              </td>
              <td className="px-2 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {servicio.tipo_plataforma}
                </div>
              </td>
              <td className="px-2 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {servicio.categoria}
                </div>
              </td>
              <td className="px-2 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {servicio.prioridad_servicio}
                </div>
              </td>
              <td className="px-2 py-4 text-semibold font-medium text-right flex">
                <button
                  onClick={() => handleEliminar(servicio._id)}
                  className="text-secondary-300 hover:underline mx-4"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleEditar(servicio)}
                  className="text-primary-300 hover:underline mx-4"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Aca va el modal editar al presionar el editar */}
      {/* Quiero que el modal contenga un formulario con los datos del servicio a editar */}
      {modalEditar ? (
        <>
          <div className=" flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            {servicios.map(
              (servicio) =>
                // Mostrar el modalEditar solo para el servicio con el ID coincidente
                selectedServiceId === servicio._id && (
                  <div
                    key={servicio._id}
                    className="relative w-auto my-6 mx-auto max-w-5xl"
                  >
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                        <h3 className="text-2xl font-semibold">
                          {servicio.nombre_servicio}
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setModalEditar(false)}
                        >
                          <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative px-6 py-2 flex-auto">
                        <form onSubmit={handleEditerServices}>
                          <div className="grid grid-cols-4 gap-8 my-4 bg-white p-4 rounded-md shadow-md">
                            {/* Tipo de Plataforma del Servicio a editar */}
                            <select
                              id="underline_select"
                              required
                              className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
                              onChange={(e) =>
                                setTipo_plataforma(e.target.value)
                              }
                              value={tipo_plataforma}
                            >
                              {/* Que la opcion sea del valor que ya posee
                                el servicio a editar */}
                              <option disabled selected>
                                Tipo de Plataforma
                              </option>
                              {/* Si el tipo de plataforma es Open, la otra opcion sera IBM, si la opcion es IBM sera Open respetivamente */}
                              <option value="IBM">IBM</option>
                              <option value="Open">Open</option>
                            </select>
                            {/* Categoria */}
                            <select
                              id="underline_select"
                              required
                              className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
                              onChange={(e) => setTCategoria(e.target.value)}
                              value={categoria}
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
                                  <option value="BaseDeDatos">
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
                            {/* Tipo de Servicio */}
                            <select
                              id="underline_select"
                              required
                              className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
                              onChange={(e) => setTipo_servicio(e.target.value)}
                              value={tipo_servicio}
                            >
                              <option selected>Tipo de Servicio</option>
                              <option value="Servicio de Soporte">
                                Servicio de Soporte
                              </option>
                              <option value="Servicio de Consultoria-Asesoria">
                                Servicio de Consultoria-Asesoria
                              </option>
                              <option value="Servicio de Capacitacion">
                                Servicio de Capacitacion
                              </option>
                              <option value="Servicio de Instalacion">
                                Servicio de Instalacion
                              </option>
                              <option value="Servicio de Licenciamiento">
                                Servicio de Licenciamiento
                              </option>
                              <option value="Servicio de Ventas">
                                Servicio de Ventas
                              </option>
                              <option value="Servicio de Desarrollo">
                                Servicio de Desarrollo
                              </option>
                            </select>
                            {/* Industria Atendida */}
                            <select
                              id="underline_select"
                              required
                              className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
                              onChange={(e) =>
                                setIndustria_atendida(e.target.value)
                              }
                              value={industria_atendida}
                            >
                              <option disabled selected>
                                Industria Atendida
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
                                  className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
                                  required
                                  onChange={(e) =>
                                    setNombre_servicio(e.target.value)
                                  }
                                  value={nombre_servicio}
                                />
                                <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
                                  Nombre Servicio{" "}
                                  <span className="text-red-500">*</span>
                                </span>
                              </label>
                            </div>
                            {/* Prioridad del Servicio */}
                            <select
                              id="underline_select"
                              className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
                              onChange={(e) =>
                                setPrioridad_servicio(e.target.value)
                              }
                              required
                              value={prioridad_servicio}
                            >
                              <option disabled selected>
                                Prioridad del Servicio
                              </option>
                              <option value="Muy Alta">Muy Alta</option>
                              <option value="Alta">Alta</option>
                              <option value="Media">Media</option>
                              <option value="Baja">Baja</option>
                              <option value="Muy Baja">Muy Baja</option>
                              <option value="Planificado">Planificado</option>
                            </select>
                            {/* Disponibilidad */}
                            <select
                              id="underline_select"
                              required
                              className="block py-2.5 pl-2 w-full text-secondary-900 bg-transparent border-0 rounded-md border-b-2 border-primary-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-100 peer"
                              onChange={(e) =>
                                setDisponibilidad_servicio(e.target.value)
                              }
                              value={disponibilidad_servicio}
                            >
                              <option disabled selected>
                                Disponibilidad
                              </option>
                              <option value="24/7">24/7</option>
                              <option value="8/5">8/5</option>
                              <option value="8/7">8/7</option>
                              <option value="8/6">8/6</option>
                              <option value="8/4">8/4</option>
                              <option value="9/5">9/5</option>
                              <option value="9/7">9/7</option>
                            </select>
                            {/* Pre-requisitos */}
                            <div>
                              <label className="flex w-full relative">
                                <input
                                  type="text"
                                  className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
                                  required
                                  onChange={(e) =>
                                    setPre_requisitos(e.target.value)
                                  }
                                  value={pre_requisitos}
                                />
                                <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
                                  Pre-Requisitos{" "}
                                  <span className="text-red-500">*</span>
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-8 bg-white p-4 rounded-md shadow-md">
                            {/* Costos */}
                            <div>
                              <label className="flex w-full relative">
                                <input
                                  type="number"
                                  className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
                                  required
                                  onChange={(e) =>
                                    setCostos_servicio(e.target.value)
                                  }
                                  value={costos_servicio}
                                />
                                <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
                                  Costos del Servicio{" "}
                                  <span className="text-red-500">*</span>
                                </span>
                              </label>
                            </div>
                            {/* Tarifa */}
                            <div>
                              <label className="flex w-full relative">
                                <input
                                  type="number"
                                  className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
                                  required
                                  onChange={(e) =>
                                    setTarifa_servicio(e.target.value)
                                  }
                                  value={tarifa_servicio}
                                />
                                <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
                                  Tarifa del Servicio{" "}
                                  <span className="text-red-500">*</span>
                                </span>
                              </label>
                            </div>
                            {/* Tiempo Estimado */}
                            <div>
                              <label className="flex w-full relative">
                                <input
                                  type="number"
                                  className="bg-transparent border-b-2  border-primary-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:border-primary-100 valid:border-primary-100"
                                  required
                                  onChange={(e) =>
                                    setTiempo_estimado(e.target.value)
                                  }
                                  value={tiempo_estimado}
                                />
                                <span className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-secondary-900 flex items-center gap-2">
                                  Tiempo Estimado (horas)
                                  <span className="text-red-500">*</span>
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="my-4 bg-white p-4 rounded-md shadow-md grid grid-cols-2">
                            {/* Descripcion */}
                            <div className="my-4 mx-5">
                              <label
                                htmlFor="message"
                                className="block mb-2 text-sm font-medium text-gray-900 px-2"
                              >
                                Descripcion del Servicio
                                <span className="text-red-500"> *</span>
                              </label>
                              <textarea
                                id="message"
                                rows="4"
                                className="block p-2.5 w-full text-sm text-secondary-900 bg-gray-50 border-2 border-primary-300 appearance-none outline-none focus:border-2 focus:border-primary-100 rounded-md"
                                onChange={(e) =>
                                  setDescripcion_servicio(e.target.value)
                                }
                                required
                                value={descripcion_servicio}
                              ></textarea>
                            </div>
                            {/* Descripcion Tecnica */}
                            <div className="my-4 mx-5">
                              <label
                                htmlFor="message"
                                className="block mb-2 text-sm font-medium text-gray-900 px-2"
                              >
                                Descripcion Tecnica del Servicio
                                <span className="text-red-500"> *</span>
                              </label>
                              <textarea
                                id="message"
                                rows="4"
                                className="block p-2.5 w-full text-sm text-secondary-900 bg-gray-50 border-2 border-primary-300 appearance-none outline-none focus:border-2 focus:border-primary-100 rounded-md"
                                onChange={(e) =>
                                  setDescripciont_servicio(e.target.value)
                                }
                                value={descripciont_servicio}
                              ></textarea>
                            </div>
                          </div>
                          <div className="text-center">
                            <button className="bg-primary-300 py-2 px-4 text-white rounded-md hover:bg-primary-200 transition-colors">
                              Editar Servicios
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

export default TablasServicios;
