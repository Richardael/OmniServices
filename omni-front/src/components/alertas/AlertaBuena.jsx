import React from 'react'
import { useState } from 'react';
//Icons
import {RiCheckLine} from "react-icons/ri"

const AlertaBuena = ({mostrarAlertaBuena, alertaBuena}) => {
  return (
<div className={`absolute flex md:right-0 md:top-0 bg-white py-4 px-6 max-w-md border-l-4 border-green-600 rounded-lg items-center gap-3 shadow-lg ${mostrarAlertaBuena ? 'block' : 'hidden'}`}>
  <div>
    <RiCheckLine
      className="h-7 w-7 text-green-600"
      onClick={() => mostrarAlertaBuena(false)}
    />
  </div>
  <div>
    <h3 className="font-semibold">Exito</h3>
    <p className="text-gray-500">{alertaBuena}</p>
  </div>
</div>
  )
}

export default AlertaBuena