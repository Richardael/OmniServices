import React from 'react'
import TablasServicios from '../../components/listas/TablasServicios'
import BuscadorLista from '../../components/listas/BuscadorLista'



const ListaServicios = () => {
  return (
    <div>
    <div className='flex'>
      <BuscadorLista />
      <h1 className="text-3xl font-extrabold mx-auto text-primary-900 mb-5">
        Lista <span className="text-primary-300"> Servicios</span>
      </h1>
      </div>
      <TablasServicios />
    </div>
  )
}

export default ListaServicios