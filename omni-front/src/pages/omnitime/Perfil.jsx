import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Perfil = () => {
const [cargo, setCargo] = useState("")
const [num_tel, setNum_tel] = useState("")
const [empresa, setEmpresa] = useState("")
const [departamento, setDepartamento] = useState("")
const [nombre, setNombre] = useState("")
const [apellido, setApellido] = useState("")
const [nombre_us, setNombre_us] = useState("")
const [email, setEmail] = useState("")

const id_usuario = localStorage.getItem('id_usuario');

//Obtener el usuario actual
const obtenerUsuario = async () => {
    try {
        const { data } = await axios.get(`https://omniservices.onrender.com/usuarios/datos-usuario/${id_usuario}`)
        setNombre(data.usuario.nombre)
        setApellido(data.usuario.apellido)
        setNombre_us(data.usuario.nombre_us)
        setEmail(data.usuario.email)
        setCargo(data.usuario.cargo)
        setNum_tel(data.usuario.num_tel)
        setEmpresa(data.usuario.empresa)
        setDepartamento(data.usuario.departamento)
    }
    catch (error) {
        console.log(error)
    }
}

//Ejecutar la funcion para obtener el usuario
useEffect(() => {
    obtenerUsuario()
}, [])

const editarPerfil = async (e) => {
    e.preventDefault()
    try {
        const { data } = await axios.put(`https://omniservices.onrender.com/usuarios/editar-usuario/${id_usuario}`, {
            nombre,
            apellido,
            nombre_us,
            email,
            cargo,
            num_tel,
            empresa,
            departamento
        })
        console.log(data)
        alert ("Perfil Editado")
        setNombre("")
        setApellido("")
        setNombre_us("")
        setEmail("")
        setCargo("")
        setNum_tel("")
        setEmpresa("")
        setDepartamento("")
    }
    catch (error) {
        console.log(error)
    }
}

  return (
    //Genera un formulario atractivo para poder editar los siguientes

    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
        <div className="text-center">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Editar Perfil
            </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={editarPerfil}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px gap-2 grid grid-cols-2">
            <div>
                <label htmlFor="nombre" className="sr-only">
                Nombre
                </label>
                <input
                id="nombre"
                name="nombre"
                type="text"
                autoComplete="nombre"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-600 focus:border-violet-600 focus:z-10 sm:text-sm"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="apellido" className="sr-only">
                Apellido
                </label>
                <input
                id="apellido"
                name="apellido"
                type="text"
                autoComplete="apellido"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-600 focus:border-violet-600 focus:z-10 sm:text-sm"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="nombre_us" className="sr-only">
                Nombre de Usuario
                </label>
                <input
                id="nombre_us"
                name="nombre_us"
                type="text"
                autoComplete="nombre_us"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-600 focus:border-violet-600 focus:z-10 sm:text-sm"
                placeholder="Nombre de Usuario"
                value={nombre_us}
                onChange={(e) => setNombre_us(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email" className="sr-only">
                Email
                </label>
                <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-600 focus:border-violet-600 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="cargo" className="sr-only">
                Cargo
                </label>
                <input
                id="cargo"
                name="cargo"
                type="text"
                autoComplete="cargo"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-600 focus:border-violet-600 focus:z-10 sm:text-sm"
                placeholder="Cargo"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="num_tel" className="sr-only">
                Numero de Telefono
                </label>
                <input
                id="num_tel"
                name="num_tel"
                type="text"
                autoComplete="num_tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-600 focus:border-violet-600 focus:z-10 sm:text-sm"
                placeholder="Numero de Telefono"
                value={num_tel}
                onChange={(e) => setNum_tel(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="empresa" className="sr-only">
                Empresa
                </label>
                <input
                id="empresa"
                name="empresa"
                type="text"
                autoComplete="empresa"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-600 focus:border-violet-600 focus:z-10 sm:text-sm"
                placeholder="Empresa"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="departamento" className="sr-only">
                Departamento
                </label>
                <input
                id="departamento"
                name="departamento"
                type="text"
                autoComplete="departamento"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-600 focus:border-violet-600 focus:z-10 sm:text-sm"
                placeholder="Departamento"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                />
            </div>
            </div>
            <div>
            <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
            >
                Editar Perfil
            </button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default Perfil