import React from 'react'
import { useState } from 'react';
//Icons
import {RiCloseLine} from "react-icons/ri"

const AlertaMala = ({ mostrarAlertaMala, alertaMala }) => {
  return (
    <div className={`absolute flex md:right-0 max-md:bottom-0 max-md:py-1 max-md:w-full transition-opacity max-w-md py-4 px-6 shadow-2xl shadow-red-800 rounded-lg bg-red-600 ${mostrarAlertaMala ? 'block' : 'hidden'}`}>
    <div className="flex flex-col">
        <div className="flex items-center">
            <RiCloseLine className='font-bold w-6 h-6'/>
            <h3 className="text-xl text-white font-semibold">Error</h3>
        </div>
        <p className="text-white">{alertaMala}</p>
    </div>
 
</div>
  )
}

export default AlertaMala