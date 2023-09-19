import React from 'react'

const BuscadorLista = () => {
  return (
    <div className="mb-4">
      <form className="w-[100vh] relative" action="">
        <input
        className="w-full px-4 py-3 rounded-lg ring-1 focus:outline-none focus:ring-1 ring-gray-300 focus:ring-primary-300"
        type="text" placeholder="Buscar" />
        <button className="absolute bg-primary-300 ring-1 ring-primary-300 text-secondary-100 rounded-r-md py-3 px-4 right-0">Buscar</button>
      </form>
    </div>
  )
}

export default BuscadorLista