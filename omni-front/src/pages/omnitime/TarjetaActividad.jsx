import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  RiBookmark2Line,
  RiStarLine,
  RiArrowRightSLine,
  RiUser2Line,
  RiTaskLine,
  RiMoneyDollarBoxLine,
  RiMoneyDollarCircleLine,
  RiTimeLine,
  RiCalendar2Line,
  RiDeleteBinLine,
  RiPencilLine,
} from "react-icons/ri";

const TarjetaActividad = ({
  id_actividad,
  nombre_actividad,
  duracion_total,
  fecha_registro,
  nombre_cliente,
  nombre_proyecto,
  tarifa,
  total_tarifa,
  total_tarifa_bs,
  completado,
  categoria,
}) => {
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [modalActividad, setModalActividad] = useState(false);
  const [registrosTiempoObtenidos, setRegistrosTiempoObtenidos] = useState([]);
//Estados de crear Intervalo son numeros
    const [horaIntervalo, setHoraIntervalo] = useState(null);
    const [minutoIntervalo, setMinutoIntervalo] = useState(null);
    const [segundoIntervalo, setSegundoIntervalo] = useState(null);

    //Actualizar componente
    const [contadorActualizarComponente, setContadorActualizarComponente] = useState(0);

  const colorCategoria = () => {
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

  const abrirModalActividad = (id_actividad) => {
    setModalActividad(!modalActividad);
    obtenerIntervalos(id_actividad);
    setActividadSeleccionada(id_actividad);
  };

  const obtenerIntervalos = async (id_actividad) => {
    try {
      const { data } = await axios.get(
        `http://192.168.1.10:7000/lista/lista-tiempo/${id_actividad}`
      );
      console.log(data);
      setRegistrosTiempoObtenidos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const completarActividad = async (id_actividad) => {
    const {data} = await axios.post(
      `http://192.168.1.10:7000/actividad/actividad-completada`,
      {
        id_actividad: id_actividad,
      },
    );
    console.log(data);
    alert("Actividad completada");
    };

    const agregarIntervalo = async (id_actividad) => {
        console.log(id_actividad);
        console.log(horaIntervalo);
        console.log(minutoIntervalo);
        console.log(segundoIntervalo);
        //Condicional si hora es vacio no se puede
        if (horaIntervalo === "") {
            alert("La hora no puede estar vacía");
            return;
        }
        //Condicional si minuto es vacio no se puede
        if (minutoIntervalo === "") {
            alert("El minuto no puede estar vacío");
            return;
        }
        //Condicional si segundo es vacio no se puede
        if (segundoIntervalo === "") {
            alert("El segundo no puede estar vacío");
            return;
        }
        //Condicional si hora es superior a 24 no se puede
        if (horaIntervalo > 24) {
            alert("Las horas no pueden ser superior a 24");
            return;
        }
        //Condicional si minuto es superior a 60 no se puede
        if (minutoIntervalo > 59) {
            alert("Los minutos no pueden ser superior a 60");
            return;
        }
        //Condicional si segundo es superior a 60 no se puede
        if (segundoIntervalo > 59) {
            alert("Los segundos no pueden ser superior a 60");
            return;
        }
        const { data } = await axios.post(
            `http://192.168.1.10:7000/actividad/actualizar-actividad`,
            {
                id_actividad: actividadSeleccionada,
                horas: parseInt(horaIntervalo),
                minutos: parseInt(minutoIntervalo),
                segundos: parseInt(segundoIntervalo),
            },
        );
        console.log(data);
        //Actualizar componente
        setContadorActualizarComponente(contadorActualizarComponente + 1);
        // Limpiar el div
        setHoraIntervalo("");
        setMinutoIntervalo("");
        setSegundoIntervalo("");
        alert("Intervalo agregado");
        };

        useEffect(() => {
            obtenerIntervalos(actividadSeleccionada);
        }, [contadorActualizarComponente]);
  return (
    <div>
      <div className="bg-white rounded-3xl p-2 shadow-xl">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-4 mb-6 p-4">
            <div
              className="flex items-center justify-center rounded-full w-12 h-12"
              style={colorCategoria()}
            >
              <RiTaskLine className="text-xl text-gray-700" />
            </div>
            <div>
              {nombre_actividad.length > 18 ? (
                <h3 className="text-sm text-gray-700 font-medium">
                  {nombre_actividad}
                </h3>
              ) : (
                <h3 className="text-lg text-gray-700 font-medium">
                  {nombre_actividad}
                </h3>
              )}
              <p className="text-sm text-neutral-500">
                {nombre_proyecto ? nombre_proyecto : "Sin Proyecto"}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 mb-6 p-4">
            <h3 className="text-right">
              {completado ? (
                "Completado"
              ) : (
                <button
                    onClick={() => completarActividad(id_actividad)}
                 className="bg-violet-600 rounded-lg px-2 py-1 text-white hover:bg-violet-500">
                  Completar
                </button>
              )}
            </h3>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-4 mb-2 px-4">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <RiUser2Line />
            <h5 className="text-neutral-500">
              {nombre_cliente ? nombre_cliente : "Sin Cliente"}
            </h5>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 text-neutral-500">
            <RiBookmark2Line />
            <h5 className="text-neutral-600">{fecha_registro}</h5>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 text-neutral-500">
            <RiStarLine />
            <h5>{tarifa ? `$${tarifa}` : "No Facturable"}</h5>
          </div>
        </div>
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-2xl">
          <h2 className="text-xl font-medium">
            {duracion_total.horas.toString().padStart(2, "0")}h{" "}
            {duracion_total.minutos.toString().padStart(2, "0")}m{" "}
            {duracion_total.segundos.toString().padStart(2, "0")}s
          </h2>
          <button
            type="button"
            onClick={() => abrirModalActividad(id_actividad)}
            className="flex items-center font-medium gap-2 p-2 rounded-lg hover:text-violet-600 transition-colors duration-300 ease-in-out text-lg"
          >
            Ver mas <RiArrowRightSLine className="text-xl" />
          </button>
        </div>
      </div>
      {/* Modal actividad con los detalles de la actividad */}
      {/* Debe divirse en 3 secciones, contener un header y un footer */}
      {modalActividad ? (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay, show/hide based on modal state. */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            {/* Modal panel, show/hide based on modal state. */}
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-3xl w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col">
                  {/* Header */}
                  <div className="flex flex-row justify-between items-center mb-5">
                    <div className="flex flex-col">
                      <h3 className="text-2xl font-medium">
                        {nombre_actividad}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {nombre_proyecto ? nombre_proyecto : "Sin Proyecto"}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <button className="bg-red-600 p-2 rounded-lg flex-row flex items-center gap-1 text-gray-200 hover:bg-red-500 transition-colors duration-300 ease-in-out">
                        <RiDeleteBinLine />
                        Eliminar
                      </button>
                      <button className="bg-yellow-400 p-2 rounded-lg text-gray-200 hover:bg-yellow-300 flex flex-row items-center gap-1 transition-colors duration-300 ease-in-out">
                        <RiPencilLine />
                        Editar
                        </button>
    
                      <h3 className="text-right">
                        {completado ? (
                          "Completado"
                        ) : (
                          <button
                          onClick={() => completarActividad(id_actividad)}
                          className="bg-violet-600 rounded-lg px-2 py-2 text-white hover:bg-violet-500 flex flex-row gap-1 items-center transition-colors duration-300 ease-in-out">
                            <RiStarLine />
                            Completar
                          </button>
                        )}
                      </h3>
                    </div>
                  </div>
                  {/* Body */}
                  <div className="flex flex-row items-center justify-between gap-4 mb-2">
                    {/* 4 Columnas de 2 */}
                    <div className="flex flex-col">
                      <div className="flex flex-col mb-2">
                        <h6 className="font-medium text-xs ml-1">Cliente</h6>
                        <div className="flex flex-row items-center gap-1">
                          <RiUser2Line />
                          <h5 className="text-neutral-500">
                            {nombre_cliente ? nombre_cliente : "Sin Cliente"}
                          </h5>
                        </div>
                      </div>
                      <div className="flex flex-col mb-2">
                        <h6 className="font-medium text-xs ml-1">Tarifa</h6>
                        <div className="flex flex-row items-center gap-1">
                          <RiMoneyDollarCircleLine />
                          <h5 className="text-neutral-500">
                            {tarifa ? `${tarifa}$/h` : "No Facturable"}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-col mb-2">
                        <h6 className="font-medium text-xs ml-1">
                          Duracion Total
                        </h6>
                        <div className="flex flex-row items-center gap-1">
                          <RiTimeLine />
                          <h5 className="text-neutral-500">
                            {duracion_total.horas.toString().padStart(2, "0")}h{" "}
                            {duracion_total.minutos.toString().padStart(2, "0")}
                            m{" "}
                            {duracion_total.segundos
                              .toString()
                              .padStart(2, "0")}
                            s
                          </h5>
                        </div>
                      </div>
                      <div className="flex flex-col mb-2">
                        <h6 className="font-medium text-xs ml-1">
                          Tarifa Total
                        </h6>
                        <div className="flex flex-row items-center gap-1">
                          <RiMoneyDollarCircleLine />
                          <h5 className="text-neutral-500">
                            {total_tarifa
                              ? `${total_tarifa}$`
                              : "No Facturable"}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-col mb-2">
                        <h6 className="font-medium text-xs ml-1">
                          Fecha de Inicio
                        </h6>
                        <div className="flex flex-row items-center gap-1">
                          <RiCalendar2Line />
                          <h5 className="text-neutral-500">{fecha_registro}</h5>
                        </div>
                      </div>
                      <div className="flex flex-col mb-2">
                        <h6 className="font-medium text-xs ml-1">
                          Tarifa Total Bs.
                        </h6>
                        <div className="flex flex-row items-center gap-1">
                          <RiMoneyDollarBoxLine />
                          <h5 className="text-neutral-500">
                            {total_tarifa_bs
                              ? `${total_tarifa_bs}Bs.`
                              : "No Facturable"}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Registros de la actividad */}
                  <h3 className="text-xl text-center font-medium mb-2 text-violet-600">
                    Registros de Intervalos
                  </h3>
                  <div className="flex flex-col gap-2 mb-2 overflow-y-auto max-h-48">
                    {registrosTiempoObtenidos.map((registro) => (
                      <div className="flex flex-row items-center justify-between bg-gray-100 p-4 rounded-2xl my-1" key={registro.id_registro}>
                        <div className="flex flex-col">
                          <h3 className="text-xl font-medium">
                            Intervalo Registrado
                          </h3>
                          <h3 className="flex flex-row gap-1 items-center">
                            <RiCalendar2Line className="text-xl text-gray-700" />
                            {registro.fecha}
                          </h3>
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-xl font-medium">
                            Duracion Registrada
                          </h3>
                          <h3 className="flex flex-row gap-1 items-center">
                            <RiTimeLine className="text-xl text-gray-700" />
                            {registro.duracion.horas
                              .toString()
                              .padStart(2, "0")}
                            h{" "}
                            {registro.duracion.minutos
                              .toString()
                              .padStart(2, "0")}
                            m{" "}
                            {registro.duracion.segundos
                              .toString()
                              .padStart(2, "0")}
                            s
                          </h3>
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-xl font-medium">
                            Tarifa Registrada
                          </h3>
                          <h3 className="flex flex-row gap-1 items-center">
                            <RiMoneyDollarCircleLine className="text-xl text-gray-700" />
                            {registro.costo_intervalo
                              ? `$${registro.costo_intervalo}`
                              : "No Facturable"}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Footer con boton de cerrar*/}
                  <div>
                    {/* Agregar Intervalo */}
                    <div className="">
                        <h3 className="text-xl text-center font-medium mb-2 text-violet-600">
                            Agregar Intervalo
                        </h3>
                        <div className="flex justify-center items-center mb-5">
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-500">Duracion</label>
                                <div className="flex flex-row gap-2 ">
                                <input type="number" className="border border-gray-200 rounded-lg px-2 py-1 focus:outline-none" placeholder="Hora" min="0" onChange={(e) => setHoraIntervalo(e.target.value)} value={horaIntervalo}/>
                                <input type="number" className="border border-gray-200 rounded-lg px-2 py-1 focus:outline-none" placeholder="Minutos" min="0" onChange={(e) => setMinutoIntervalo(e.target.value)} value={minutoIntervalo}/>
                                <input type="number" className="border border-gray-200 rounded-lg px-2 py-1 focus:outline-none" placeholder="Segundos" min="0" onChange={(e) => setSegundoIntervalo(e.target.value)} value={segundoIntervalo}/>
                            </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <button
                                onClick={() => agregarIntervalo(id_actividad)}
                            className="bg-violet-600 rounded-lg px-4 py-2 text-white hover:bg-violet-500 transition-colors duration-300 ease-in-out">
                                Agregar Intervalo
                            </button>
                        </div>
                    </div>
                    {/* Boton de cerrar */}
                  <div className="flex flex-row justify-end mt-5">
                    <button
                      onClick={() => abrirModalActividad(id_actividad)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors duration-300 ease-in-out"
                    >
                      <h3 className="text-lg font-medium">Cerrar</h3>
                    </button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TarjetaActividad;
