import React from 'react';
import TablasTalleres from '../../components/listas/TablasTalleres';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ListaTalleres = () => {
  const [talleress, setTalleress] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [updateCount, setUpdateCount] = useState(0);
  const [talleresFiltrados, setTalleresFiltrados] = useState([]);

  useEffect(() => {
    // Obtengo los servicios desde mi backend y los almaceno en mi estado de servicios
    const obtenerTalleres = async () => {
      const { data } = await axios.get('http://192.168.1.50:8000/lista/talleres');
      setTalleress(data);
    };
    obtenerTalleres();
  }, [updateCount]);

  const talleres = talleress.map((talleres) => {
    return {
      id: talleres._id,
      tipo_plataforma: talleres.tipo_plataforma,
      categoria: talleres.categoria,
      nombre_taller: talleres.nombre_taller,
      descripcion_taller: talleres.descripcion_taller,
      publico_taller: talleres.publico_taller,
      pre_conocimientos: talleres.pre_conocimientos,
      temario_taller: talleres.temario_taller,
      obj_general: talleres.obj_general,
      duracion_taller: talleres.duracion_taller,
      modalidad_taller: talleres.modalidad_taller,
      cantidad_participantes: talleres.cantidad_participantes,
    };
  });

  // Usare mi barra de búsqueda para filtrar talleres por lo que debo importar mi componente BuscadorLista y mi

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
  };

  useEffect(() => {
    // Filtra los talleres cuando cambia la búsqueda
    const talleresFiltrados = talleress.filter((taller) => {
      return taller.nombre_taller.toLowerCase().includes(busqueda.toLowerCase());
    });
    setTalleresFiltrados(talleresFiltrados);
  }, [busqueda, talleress]);

  return (
    <div>
      <div className='flex mb-6'>
        <div className="mb-4">
          <form className="w-[100vh] relative" action="">
            <input
              className="w-full px-4 py-3 rounded-lg ring-1 focus:outline-none focus:ring-1 ring-gray-300 focus:ring-primary-300"
              onChange={handleInputChange}
              type="text"
              placeholder="Buscar"
            />
            <button className="absolute bg-primary-300 ring-1 ring-primary-300 text-secondary-100 rounded-r-md py-3 px-4 right-0">Buscar</button>
          </form>
        </div>
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
      <TablasTalleres talleres={talleresFiltrados} updateCount={updateCount} setUpdateCount={setUpdateCount} />
    </div>
  );
};

export default ListaTalleres;
