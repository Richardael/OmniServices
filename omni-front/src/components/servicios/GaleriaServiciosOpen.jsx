import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TarjetaServicios from './TarjetaServicios'

//Quiero que mi galeria de Servicios muestre todos los servicios que tengo en mi base de datos estoy usando Mysql
//Para eso voy a usar un hook de react que se llama useEffect
//useEffect me permite ejecutar codigo de manera condicional
//useEffect recibe dos parametros, el primero es una funcion anonima y el segundo es un arreglo de dependencias
//Si el arreglo de dependencias esta vacio, la funcion anonima se ejecuta una sola vez cuando el componente se renderiza por primera vez
//Si el arreglo de dependencias tiene elementos, la funcion anonima se ejecuta cada vez que alguno de los elementos del arreglo de dependencias cambia
//Si el arreglo de dependencias no existe, la funcion anonima se ejecuta cada vez que el componente se renderiza


const GaleriaServiciosOpen = () => {
      //UseEffect Servicios, verificando si hay servicios o no ademas de que se actualice cada vez que se agregue un servicio y estos servicios llenen los campos de mi tarjeta
     //Quiero que los servicios obtenidos de mi base de datos se muestren en mi galeria de servicios con los datos que obtengo de ellos con un array
    //Usando Axios y Metodo Pos
    //Quiero una muestra de 3 ejemplos en el array para introducir en mis tarjetas de servicios
    const [servicioss, setServicios] = useState([]);
    useEffect(() => {
      //Obtengo los servicios desde mi backend y los almaceno en mi estado de servicios
   const obtenerServicios = async () => {
       const { data } = await axios.get('http://localhost:8000/api/servicios');
       setServicios(data);
   }
   //Aca quiero exportar las categorias, nombre y descripcion en forma de un array para mis tarjetas
    obtenerServicios();
    }, [])

    //Crea un objeto de servicios de prueba usando id_servicio,categoria,nombre_servicio,descripcion_servicio,tiempo_estimado,prioridad_servicio,costos_servicio,pre_requisitos,tarifa_servicio,tipo_servicio,tipo_plataforma,descripciont_servicio
    //Quiero que sean ejemplos de servicios de distintas categorias
    const servicios = [
      {
        id_servicio: 1,
        categoria: "Programacion",
        nombre_servicio: "Desarrollo de Pagina Web",
        descripcion_servicio: "Desarrollo de una pagina web para una empresa de ventas de productos de tecnologia",
        tiempo_estimado: "2",
        prioridad_servicio: "Alta",
        costos_servicio: "1000",
        pre_requisitos: "Ninguno",
        tarifa_servicio: "100",
        tipo_servicio: "Desarrollo",
        tipo_plataforma: "Open",
        descripciont_servicio: "Desarrollo de una pagina web para una empresa de ventas de productos de tecnologia",
        disponibilidad_servicio: "24/7"      
      },{
        id_servicio: 2,
        categoria: "Hardware",
        nombre_servicio: "Mantenimiento de Computadoras",
        descripcion_servicio: "Mantenimiento de Computadoras de una empresa de ventas de productos de tecnologia",
        tiempo_estimado: "2",
        prioridad_servicio: "Alta",
        costos_servicio: "1000",
        pre_requisitos: "Ninguno",
        tarifa_servicio: "100",
        tipo_servicio: "Mantenimiento",
        tipo_plataforma: "Open",
        descripciont_servicio: "Mantenimiento de Computadoras de una empresa de ventas de productos de tecnologia, se empieza limpiando la tarjeta madre",
        disponibilidad_servicio: "24/7"     
      },{
        id_servicio: 3,
        categoria: "Software",
        nombre_servicio: "Desarrollo de Aplicacion Movil",
        descripcion_servicio: "Desarrollo de una aplicacion movil para una empresa de ventas de productos de tecnologia",
        tiempo_estimado: "2",
        prioridad_servicio: "Alta",
        costos_servicio: "1000",
        pre_requisitos: "Ninguno",
        tarifa_servicio: "100",
        tipo_servicio: "Desarrollo",
        tipo_plataforma: "Open",
        descripciont_servicio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quibusdam debitis sapiente quidem? Voluptatem corporis dolores nemo velit possimus, nostrum ratione tempore ducimus qui modi doloremque a labore! Nihil in quidem adipisci! Quasi dolores ut praesentium, harum tempora neque, eligendi id magnam modi blanditiis esse dolorum officia quo in dolor vel pariatur magni quae aperiam corrupti corporis. Sunt magni eligendi sequi architecto numquam optio voluptates doloribus mollitia quas molestias neque qui facere ipsam, quisquam quaerat ad voluptas, omnis voluptate cumque est cupiditate tempore libero eos quibusdam? Quasi facere ex omnis similique, quibusdam suscipit dolores doloremque explicabo quas recusandae beatae dignissimos sapiente. Quidem odit molestiae quis possimus velit et necessitatibus totam similique maiores libero aspernatur vero ut aperiam quisquam modi facilis, in assumenda, nam excepturi nemo incidunt? Quasi, cum rem impedit perferendis vel consequatur nesciunt? Ex quidem, tempora fugiat molestiae modi necessitatibus ad repellat distinctio, velit molestias voluptatum alias fugit aspernatur excepturi nemo ea, facere saepe. Quo accusantium ut ducimus quia, dicta molestias vero repellat quidem voluptates voluptatum placeat modi sunt doloribus? Tenetur sequi temporibus quam cupiditate iste praesentium id excepturi vel, itaque provident officia nulla, ipsum eaque, commodi repudiandae! Asperiores beatae omnis, quae suscipit officia delectus cupiditate! Voluptatum, inventore a!", 
        disponibilidad_servicio: "24/7"      
      }
  
    ]
  return (
    <div>
      {/* Si Hay Servicios */}
      {servicios && servicios.length ? (
        <>
          <div className='grid grid-cols-4 gap-4 max-sm:grid-cols-1'>

          {servicios.map((servicios) => (
            //Quiero que la tarjeta reciba todos los datos de mis tarjetas de ejemplos
            <TarjetaServicios key={servicios.id} {...servicios} />
          ))}
           </div>
        </>
      ) : (
        <>
        <div>
        <h2 className="font-black text-4xl text-center grid col-span-4">
            No tienes ningun servicio registrado
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Registra tus {""}
            <span className="text-primary-300 font-bold">
              Servicios Open
            </span>
          </p>
        </div>
        
        </>
      )}
    </div>
  );
};

export default GaleriaServiciosOpen