//Registrare los servicios en mi base de datos con el siguiente formulario
//Poseera los siguientes campos para registrar en el siguiente orden : Tipo de Plataforma (Select), Tipo de Servicio (Select), Categoria (Select), Prioridad (Select)
//En la siguiente fila sera Nombre del servicio (input), disponibilidad (select), pre-requisitos (input)
//En la siguiente fila sera costos (input), tarifa (input), tiempo estimado (input)
//y en la ultima fila seran descripcion (textarea) y descripcion tecnica (textarea)
import React from "react";
import { useState } from "react";
import FormRegistro from "../../components/registrar/FormRegistro";

const RegistrarServicios = () => {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-center text-primary-900">
        Registrar <span className="text-primary-300"> Servicios</span>
      </h1>
      <FormRegistro/>
    </div>
  );
};

export default RegistrarServicios;
