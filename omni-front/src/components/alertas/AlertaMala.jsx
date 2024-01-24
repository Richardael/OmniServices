import React from 'react'
import { useState } from 'react';
//Icons
import {RiCloseLine} from "react-icons/ri"

const AlertaMala = ({ mostrarAlertaMala, alertaMala }) => {
  return (
<div className={`absolute flex z-[9999] md:right-0 md:top-0 bg-white py-4 px-6 max-w-md border-l-4 border-red-600 rounded-lg items-center gap-3 shadow-lg ${mostrarAlertaMala ? 'block' : 'hidden'}`}>
  <div>
    <RiCloseLine
      className="h-7 w-7 text-red-600"
      onClick={() => mostrarAlertaMala(false)}
    />
  </div>
  <div>
    <h3 className="font-semibold">Error</h3>
    <p className="text-gray-500">{alertaMala}</p>
  </div>
</div>

  )
}

export default AlertaMala