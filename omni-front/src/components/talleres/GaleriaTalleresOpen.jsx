import React from 'react'
import TarjetaTalleres from './TarjetaTalleres'

const GaleriaTalleresOpen = ({talleres, categoria, busqueda}) => {
     // Filtra los talleres basados en la categoría seleccionada
 const talleresFiltrados = categoria
 ? talleres.filter((taller) => taller.categoria === categoria)
 : talleres;

  // Filtra los talleres basados en la búsqueda
  const talleresFiltradosPorBusqueda = talleresFiltrados.filter((taller) => {
    return taller.nombre_taller.toLowerCase().includes(busqueda.toLowerCase());
  });
  return (
    <div>
            {/* Si Hay talleres */}
            {/* Quiero que muestre los talleres filtrados */}
            {talleresFiltradosPorBusqueda.length ? (
        <>
          <div className='grid grid-cols-4 gap-4 max-sm:grid-cols-1'>
          {talleresFiltradosPorBusqueda.map((taller) => (
              <TarjetaTalleres key={taller.id } {...taller} />
            ))}
            </div>
        </>
      )
       : (
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

export default GaleriaTalleresOpen