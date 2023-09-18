import React from 'react'
import { RiArrowDropUpLine, RiArrowDropDownLine } from 'react-icons/ri';

const TablasServicios = () => {
  return (
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className='w-full text-sm text-left text-secondary-500'>
            <thead className='text-xs text-secondary-900 uppercase bg-gray-50 "'>
            <tr>
                <th scope="col" className="px-6 py-3">
                    Nombre del Servicio
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        Plataforma del Servicio
                        <RiArrowDropUpLine className="w-7 h-7 ml-1.5" />
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        Categoria Servicio
                        <RiArrowDropDownLine className="w-7 h-7 ml-1.5" />
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        Prioridad
                        <RiArrowDropDownLine className="w-7 h-7 ml-1.5" />
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Editar</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b border-secondary-300">
                <th scope="row" className="px-6 py-4 font-medium text-primary-300 whitespace-nowrap">
                    Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4 text-right">
                    <h1 href="#" className="font-medium text-primary-400  hover:underline cursor-pointer">Edit</h1>
                </td>
            </tr>
        </tbody>
        </table>
    </div>
  )
}

export default TablasServicios