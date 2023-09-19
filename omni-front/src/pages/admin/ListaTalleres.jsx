import React from 'react'
import TablasTalleres from '../../components/listas/TablasTalleres'
import axios from 'axios'
import { useState, useEffect } from 'react'
import BuscadorLista from '../../components/listas/BuscadorLista'
import { Link } from 'react-router-dom'

const ListaTalleres = () => {
  return (
<div>
    <div className='flex mb-6'>
      <BuscadorLista />
      <div className='mx-auto relative w-full'>
      <h1 className="text-3xl font-extrabold text-center text-primary-900 mb-10">
        Lista <span className="text-primary-300"> Talleres</span>
      </h1>
      <Link to="/registro-talleres" className='absolute top-14 right-0'>
      <button className='text-primary-300 rounded-md pb-8 rounded-b-none text-xl mr-5 px-2 pt-2 w-full bg-gray-50 mx-auto font-bold text-primary-900 hover:underline '>
        Registrar Talleres
      </button>
      </Link>
      </div>
      </div>
      <TablasTalleres />
    </div>
  )
}

export default ListaTalleres