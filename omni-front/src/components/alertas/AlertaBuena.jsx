import React from 'react'
import { useState } from 'react';
//Icons
import {RiCheckLine} from "react-icons/ri"

const AlertaBuena = ({mostrarAlertaBuena, alertaBuena}) => {
  return (
<div className={`absolute flex md:right-0 max-md:bottom-0 max-md:py-1 max-md:w-full transition-opacity max-w-md py-4 px-6 shadow-2xl shadow-green-800 rounded-lg bg-green-600 ${mostrarAlertaBuena ? 'block' : 'hidden'}`}>
<div className="flex flex-col">
        <div className="flex items-center gap-2">
            <RiCheckLine className='font-bold w-6 h-6'/>
            <h3 className="text-xl text-white font-semibold">Éxito</h3>
        </div>
        <p className="text-white">{alertaBuena}</p>
    </div>
 
</div>
  )
}

export default AlertaBuena