import React from 'react'
import TarjetaServicios from '../../components/servicios/TarjetaServicios'
import GaleriaServiciosOpen from '../../components/servicios/GaleriaServiciosOpen'
import BarraDeBusquedaOpen from '../../components/servicios/BarraDeBusquedaOpen'

const ServiciosOpen = () => {
  return (
    <div>
    <BarraDeBusquedaOpen />
    <GaleriaServiciosOpen />
    </div>
  )
}

export default ServiciosOpen