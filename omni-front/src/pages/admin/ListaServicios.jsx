import React from 'react'
import TablasServicios from '../../components/listas/TablasServicios'



const ListaServicios = () => {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-center text-primary-900 mb-5">
        Lista <span className="text-primary-300"> Servicios</span>
      </h1>
      <TablasServicios />
    </div>
  )
}

export default ListaServicios