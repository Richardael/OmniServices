import React, { useEffect } from 'react'
import TarjetaServicios from './TarjetaServicios'
//Quiero que mi galeria de Servicios muestre todos los servicios que tengo en mi base de datos estoy usando Mysql
//Para eso voy a usar un hook de react que se llama useEffect
//useEffect me permite ejecutar codigo de manera condicional
//useEffect recibe dos parametros, el primero es una funcion anonima y el segundo es un arreglo de dependencias
//Si el arreglo de dependencias esta vacio, la funcion anonima se ejecuta una sola vez cuando el componente se renderiza por primera vez
//Si el arreglo de dependencias tiene elementos, la funcion anonima se ejecuta cada vez que alguno de los elementos del arreglo de dependencias cambia
//Si el arreglo de dependencias no existe, la funcion anonima se ejecuta cada vez que el componente se renderiza

const GaleriaServiciosIBM = () => {
  //Quiero que implementes ejemplos de servicios del AS/400
  //Quiero que las categorias sean: programacion, seguridad, administracion, comunicacion, administracion, base de datos y operaciones
  const servicios = [
    {
      id_servicio: 1,
      categoria: "Operaciones",
      nombre_servicio: "Respaldo Total del Sistema IBM i",
      descripcion_servicio: "Respaldo Total del Sistema IBM i, se realiza un respaldo de todo el sistema operativo, incluyendo los programas, archivos, librerias, usuarios, etc",
      tiempo_estimado: "6",
      industria_atendida: "Banca",
      prioridad_servicio: "Alta",
      costos_servicio: "?",
      pre_requisitos: "Tener un As/400, somos ProIBM no arreglamos Canaimas / Poseer Imagen ISO del Sistema Operativo IBM i",
      tarifa_servicio: "120$ hh",
      tipo_servicio: "Recuperacion del Sistema Operativo IBM i",
      tipo_plataforma: "IBM",
      descripciont_servicio: "Un respaldo de sistema operativo IBM i implica la copia de datos críticos del sistema y su configuración. Se realiza mediante herramientas como BRMS (Backup, Recovery, and Media Services) siguiendo estos pasos: Configurar una política de respaldo, Seleccionar objetos a respaldar, Definir medios de almacenamiento, Programar el respaldo, Ejecutar el respaldo, Verificar la integridad de la copia. Este proceso asegura la disponibilidad y recuperación en caso de fallos.",
      disponibilidad_servicio: "24/7"
    }
  ]
  return (
    <div>
            {/* Si Hay Servicios */}
            {servicios && servicios.length ? (
        <>
          <div className='grid grid-cols-4 gap-4 max-sm:grid-cols-1'>

          {servicios.map((servicios) => (
            //Quiero que la tarjeta reciba todos los datos de mis tarjetas de ejemplos
            <TarjetaServicios key={servicios.id} {...servicios} />
          ))}
           </div>
        </>
      ) : (
        <>
        <div>
        <h2 className="font-black text-4xl text-center grid col-span-4">
            No tienes ningun servicio registrado
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Registra tus {""}
            <span className="text-primary-300 font-bold">
              Servicios IBM
            </span>
          </p>
        </div>
        </>
      )}
    </div>
  )
}

export default GaleriaServiciosIBM