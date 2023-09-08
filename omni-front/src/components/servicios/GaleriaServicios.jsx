import React, { useEffect } from 'react'
import TarjetaServicios from './TarjetaServicios'
//Quiero que mi galeria de Servicios muestre todos los servicios que tengo en mi base de datos estoy usando Mysql
//Para eso voy a usar un hook de react que se llama useEffect
//useEffect me permite ejecutar codigo de manera condicional
//useEffect recibe dos parametros, el primero es una funcion anonima y el segundo es un arreglo de dependencias
//Si el arreglo de dependencias esta vacio, la funcion anonima se ejecuta una sola vez cuando el componente se renderiza por primera vez
//Si el arreglo de dependencias tiene elementos, la funcion anonima se ejecuta cada vez que alguno de los elementos del arreglo de dependencias cambia
//Si el arreglo de dependencias no existe, la funcion anonima se ejecuta cada vez que el componente se renderiza


const GaleriaServicios = () => {
    
  return (
    <div className='grid grid-cols-4 gap-4'>
        <TarjetaServicios />
        <TarjetaServicios />
        <TarjetaServicios />
        <TarjetaServicios />
        <TarjetaServicios />
        <TarjetaServicios />
        <TarjetaServicios />
        <TarjetaServicios />
    </div>
  )
}

export default GaleriaServicios