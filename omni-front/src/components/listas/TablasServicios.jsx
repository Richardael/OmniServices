import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { RiArrowDropUpLine, RiArrowDropDownLine } from 'react-icons/ri';

const TablasServicios = (servicios) => {
    const [plataformaServicio, setPlataformaServicio] = useState(false);
    const [categoriaServicio, setCategoriaServicio] = useState(false);
    const [prioridadServicio, setPrioridadServicio] = useState(false);
    const [modalRegistro, setModalRegistro] = useState(false);

    const ordenPlataforma = () => {
        if (plataformaServicio) {
            servicios.servicios.sort((IBM, Open) => IBM.tipo_plataforma.localeCompare(Open.tipo_plataforma));
            setPlataformaServicio(!plataformaServicio);
            setCategoriaServicio(false);
            setPrioridadServicio(false);
        } else {
            servicios.servicios.sort((IBM, Open) => Open.tipo_plataforma.localeCompare(IBM.tipo_plataforma));
            setPlataformaServicio(!plataformaServicio);
            setCategoriaServicio(false);
            setPrioridadServicio(false);
        }
    }
    const ordenCategoria = () => {
        //Quiero que se ordenen los servicios por categoria de forma ascendente y descendente
        //El Orden de las categorias debe ser abecedario
        if (categoriaServicio) {
            servicios.servicios.sort((a,b) => b.categoria.localeCompare(a.categoria));
            setCategoriaServicio(!categoriaServicio);
            setPrioridadServicio(false);
            setPlataformaServicio(false);
            } else {
            servicios.servicios.sort((a,b) => a.categoria.localeCompare(b.categoria));
            setCategoriaServicio(!categoriaServicio);
            setPrioridadServicio(false);
            setPlataformaServicio(false);
            }
    }
    const prioridadOrden = {
        'Muy Alta': 1,
        'Alta': 2,
        'Media': 3,
        'Baja': 4,
        'Muy Baja': 5,
        'Planificado': 6,
      };
    const ordenPrioridad = () => {
        if (prioridadServicio) {
          // Orden ascendente
          servicios.servicios.sort((a, b) => {
            return prioridadOrden[b.prioridad_servicio] - prioridadOrden[a.prioridad_servicio];
          });
        } else {
          // Orden descendente
          servicios.servicios.sort((a, b) => {
            return prioridadOrden[a.prioridad_servicio] - prioridadOrden[b.prioridad_servicio];
          });
        }
      
        setPrioridadServicio(!prioridadServicio);
        setCategoriaServicio(false);
        setPlataformaServicio(false);
      };

      const handleEditar = (id) => {
        axios.get(`http://192.168.1.50/lista/modificar/${id}`)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
        setModalRegistro(true)
      }
        const handleEliminar = (id) => {
            axios.delete(`http://192.168.1.50/lista/eliminar/${id}`)
            .then(res => {
              console.log(res.data)
            })
            .catch(err => {
              console.log(err)
            })
            }

      
      
      
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
                        Plataforma
                        {
                        plataformaServicio ? <RiArrowDropUpLine className="w-7 h-7 ml-1.5" onClick={ordenPlataforma} /> 
                        : 
                        <RiArrowDropDownLine className="w-7 h-7 ml-1.5" onClick={ordenPlataforma} />
                        }
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        Categoria
                        {
                        categoriaServicio ? <RiArrowDropUpLine className="w-7 h-7 ml-1.5" onClick={ordenCategoria} />
                        :
                        <RiArrowDropDownLine className="w-7 h-7 ml-1.5" onClick={ordenCategoria} />
                        }
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        Prioridad
                        {
                        prioridadServicio ? <RiArrowDropUpLine className="w-7 h-7 ml-1.5" onClick={ordenPrioridad} />
                        :
                        <RiArrowDropDownLine className="w-7 h-7 ml-1.5" onClick={ordenPrioridad} />
                        }
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Editar</span>
                </th>
            </tr>
        </thead>
        <tbody>
            {servicios.servicios.map((servicio) => (
                <tr key={servicio.id} className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    {servicio.nombre_servicio}
                                </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{servicio.tipo_plataforma}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{servicio.categoria}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{servicio.prioridad_servicio}</div>
                    </td>
                    <td className="px-6 py-4 text-semibold font-medium text-right flex">
                        <button 
                        onClick={() => handleEliminar(servicio.id)}
                        className="text-secondary-300 hover:underline mx-4">
                            Eliminar
                        </button>
                        <button 
                        onClick={() => handleEditar(servicio.id)}
                        className="text-primary-300 hover:underline mx-4">
                            Editar
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
        </table>
    </div>
  )
}

export default TablasServicios