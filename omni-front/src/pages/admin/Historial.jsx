import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Historial = () => {
    const [historial, setHistorial] = useState([])
    const [tipoRegistro, setTipoRegistro] = useState('')
    const obtenerHistorial = async () => {
        const response = await axios.get('https://omniservices.onrender.com/historial/historial')
        const historial = response.data
        console.log(historial)
        setHistorial(historial)
    }
    useEffect(() => {
        obtenerHistorial()
    }, [])
  return (
<div className="relative overflow-x-auto sm:rounded-lg">
    <h1 className='text-3xl text-center mb-10 text-secondary-300 font-bold'> <span className='text-primary-300' >Historial</span> de Cambios</h1>
      <table className="w-full text-sm text-left text-secondary-500">
        <thead className='text-xs text-secondary-200 uppercase bg-primary-300 shadow-2xl'>
            <tr>
                <th className="px-1 py-3">ID de la Accion</th>
                <th className="px-1 py-3">User</th>
                <th className="px-1 py-3">Accion</th>
                <th className="px-1 py-3">Tipo de Documento</th>
                <th className="px-1 py-3">Id Documento</th>
                <th className="px-1 py-3">Nombre del Documento</th>
                <th className="px-1 py-3">Mensaje</th>
                <th className="px-1 py-3">Fecha y Hora</th>
            </tr>
        </thead>
        <tbody className="bg-white">
            {historial.map((historial) => {
                return (
                    <tr key={historial._id}>
                        <td className="px-1 py-3 border">
                            <div className="flex items-center">
                                <div>
                                    <p className="font-semibold">{historial._id}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-1 py-3 text-sm border">
                            {historial.usuario}
                        </td>
                        <td className="px-1 py-3 text-xs border">
                            {historial.accion}
                        </td>
                        <td className="px-1 py-3 text-xs border">
                            {historial.tipoDocumento}
                        </td>
                        <td className="px-1 py-3 text-xs border">
                            {historial.documentoAfectado}
                        </td>
                        <td className="px-1 py-3 text-xs border">
                            {historial.nombreDocumento}
                        </td>
                        <td className="px-1 py-3 text-xs border">
                            {historial.detalles}
                        </td>
                        <td className="px-1 py-3 text-xs border">
                            {historial.fechaHora}
                        </td>
                    </tr>
                )
            })}
        </tbody>
        </table>


    </div>
  )
}

export default Historial