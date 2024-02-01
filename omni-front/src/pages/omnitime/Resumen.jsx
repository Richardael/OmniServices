import React, { useState, useEffect } from "react";
import axios from "axios";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ReporteSemanal from "./reportes/ReporteSemanal";
import ReporteMensual from "./reportes/ReporteMensual";
import ReporteDiario from "./reportes/ReporteDiario";

const Resumen = () => {
  const [seleccionado, setSeleccionado] = useState("");
  const [actividadesObtenidas, setActividadesObtenidas] = useState([]);
  const [informeMensual, setInformeMensual] = useState([]); 
  const [informeSemanal, setInformeSemanal] = useState([]);
  const [informeDiario, setInformeDiario] = useState([]);
  const [gananciaPorProyecto, setGananciaPorProyecto] = useState([]);
  const fecha_inicio = //Obtener fecha del sistema
    new Date().getFullYear() +
    "-" +
   //Agregar mes con un 0 al inicio si es menor a 10
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    //Agregar dia con un 0 al inicio si es menor a 10
    ("0" + new Date().getDate()).slice(-2);

    const mes = new Date().getMonth() + 1;

    const año = new Date().getFullYear();
  //EstadoUsuario
  const id_usuario = localStorage.getItem("id_usuario");

  //Obtener Reporte Diario
  const obtenerReporteDiario = async () => {
    //Manda por metodo post la fecha actual y el usuario
    const { data } = await axios.post(
      `https://clockigenial2.onrender.com/reportes/informe-diario`,
      {
        fecha: fecha_inicio,
        id_usuario,
      }
    );
    setInformeDiario(data.informeDiaria);

    console.log(data.informeDiaria);

    alert("Reporte Diario Generado");
    setSeleccionado("diario");
  };

  //Obtener Reporte Semanal
  const obtenerReporteSemanal = async () => {
   
    //Manda por metodo post la fecha actual y el usuario
    const { data } = await axios.post(
      `https://clockigenial2.onrender.com/reportes/informe-semanal`,
      {
        fecha_inicio,
        id_usuario,
      }
    );
    setInformeSemanal(data.informeSemanal);
    setActividadesObtenidas(data.informeSemanal.actividades);
    setGananciaPorProyecto(data.informeSemanal.gananciaPorProyecto);
    console.log(data);
    console.log(data.informeSemanal);
    console.log(data.informeSemanal.actividades);
    console.log(data.informeSemanal.gananciaPorProyecto);
    alert("Reporte Semanal Generado");
    setSeleccionado("semanal");
  };

  //Obtener Reporte Mensual
  const obtenerReporteMensual = async () => {
    //Manda por metodo post la fecha actual y el usuario
    const { data } = await axios.post(
      `https://clockigenial2.onrender.com/reportes/informe-mensual`,
      {
        mes,
        año,
        id_usuario,
      }
    );
    setInformeMensual(data.informeMensual);
    console.log(data.informeMensual);
    setActividadesObtenidas(data.informeMensual.actividades);
    setGananciaPorProyecto(data.informeMensual.gananciaPorProyecto);
    console.log(data.informeMensual.actividades);
    console.log(data.informeMensual.gananciaPorProyecto);
    alert("Reporte Mensual Generado");
    setSeleccionado("mensual");
  }

  return (
    <div className="flex-1 flex flex-col">
      <h1 className="text-3xl text-center mb-5 text-secondary-300 font-bold">
        <span className="text-violet-600">Resumen</span> de Actividades
      </h1>
      { seleccionado === "" ? (
      <div className="flex flex-grow justify-center items-center flex-1 gap-4">
        <button
        onClick={obtenerReporteDiario}
        className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full">
          Obtener Reporte Diario
        </button>
        <button
          onClick={obtenerReporteSemanal}
        className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full">
          Obtener Reporte Semanal
        </button>
        <button
        onClick={obtenerReporteMensual}
        className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full">
          Obtener Reporte Mensual
        </button>
      </div>
      ) : null }
      { seleccionado === "diario" ? (
      <div className="flex flex-col items-center justify-center mt-24">
    <PDFDownloadLink document={<ReporteDiario informeDiario={informeDiario} gananciaPorProyecto={gananciaPorProyecto} actividadesObtenidas={actividadesObtenidas} />} fileName="reporte-diario.pdf">
      {({ blob, url, loading, error }) =>
        loading ? <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 text-xl rounded-full">Generando Reporte</button> : <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 text-xl rounded-full">Descargar Reporte</button>
      }
    </PDFDownloadLink>
    </div>
  ) : null}
      {seleccionado === "semanal" ? (
        <div className="flex flex-col items-center justify-center mt-24">
    <PDFDownloadLink document={<ReporteSemanal informeSemanal={informeSemanal} gananciaPorProyecto={gananciaPorProyecto} actividadesObtenidas={actividadesObtenidas} />} fileName="reporte-semanal.pdf">
      {({ blob, url, loading, error }) =>
        loading ? <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 text-xl rounded-full">Generando Reporte</button> : <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 text-xl rounded-full">Descargar Reporte</button>
      }
    </PDFDownloadLink>
    </div>
  ) : null}
  
  {seleccionado === "mensual" ? (
        <div className="flex flex-col items-center justify-center mt-24">
    <PDFDownloadLink document={<ReporteMensual informeMensual={informeMensual} gananciaPorProyecto={gananciaPorProyecto} actividadesObtenidas={actividadesObtenidas} />} fileName="reporte-mensual.pdf">
      {({ blob, url, loading, error }) =>
        loading ? <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 text-xl rounded-full">Generando Reporte</button> : <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 text-xl rounded-full">Descargar Reporte</button>
      }
    </PDFDownloadLink>
    </div>
  ) : null  
  }
    </div>
  );
};

export default Resumen;
