import React from 'react'
import TarjetaTalleres from './TarjetaTalleres'

const GaleriaTalleresIBM = ({talleres, categoria}) => {
   // Filtra los talleres basados en la categoría seleccionada
 const talleresFiltrados = categoria
 ? talleres.filter((taller) => taller.categoria === categoria)
 : talleres;

  return (
    <div>
            {/* Si Hay talleres */}
            {/* Quiero que muestre los talleres filtrados */}
            {talleresFiltrados.length ? (
        <>
          <div className='grid grid-cols-4 gap-4 max-sm:grid-cols-1'>
          {talleresFiltrados.map((taller) => (
              <TarjetaTalleres key={taller.id} {...taller} />
            ))}
            </div>
        </>
      ) : (
        <>
        <div>
        <h2 className="font-black text-4xl text-center grid col-span-4">
            No tienes ningun taller registrado
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Registra tus {""}
            <span className="text-primary-300 font-bold">
              talleres IBM
            </span>
          </p>
        </div>
        </>
      )}
    </div>
  )
}

export default GaleriaTalleresIBM