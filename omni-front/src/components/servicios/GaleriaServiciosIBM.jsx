import React, { useState,useEffect } from 'react'
import axios from 'axios'
import TarjetaServicios from './TarjetaServicios'
//Quiero obtener los servicios filtrados por IBM desde mi barra de Busqueda IBM y mostrarlos en mi galeria de servicios IBM

const GaleriaServiciosIBM = ({servicios, categoria, busqueda}) => {
 // Filtra los servicios basados en la categoría seleccionada
 const serviciosFiltrados = categoria
 ? servicios.filter((servicio) => servicio.categoria === categoria)
 : servicios;
  // Filtra los servicios basados en la búsqueda
  const serviciosFiltradosPorBusqueda = serviciosFiltrados.filter((servicio) => {
    return servicio.nombre_servicio.toLowerCase().includes(busqueda.toLowerCase());
  });

  return (
    <div>
            {/* Si Hay servicios */}
            {/* Quiero que muestre los servicios filtrados */}
            {serviciosFiltradosPorBusqueda.length ? (
        <>
          <div className='grid grid-cols-4 gap-4 max-sm:grid-cols-1'>
          {serviciosFiltradosPorBusqueda.map((servicio) => (
              <TarjetaServicios key={servicio.id } {...servicio} />
            ))}
            </div>
        </>
      )
       : (
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