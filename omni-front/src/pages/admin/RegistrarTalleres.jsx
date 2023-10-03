import React from 'react'
import FormRegistroTalleres from '../../components/talleres/FormRegistroTalleres'

const RegistrarTalleres = () => {
  return (
    <div>
              <h1 className="text-3xl font-extrabold text-center text-primary-900">
        Registrar <span className="text-primary-300"> Talleres</span>
      </h1>
      <FormRegistroTalleres/>
    </div>
  )
}

export default RegistrarTalleres