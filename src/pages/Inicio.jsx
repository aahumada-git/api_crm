import { useState, useEffect } from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {

  const [clientes, setClientes] = useState([])

  useEffect(() => {

    const obtenerClientes = async () => {
      try {
        const url = import.meta.env.VITE_API_URL

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        console.log(resultado)
        setClientes(resultado)
      } catch (error) {
        console.log(error)
      }
    }

    obtenerClientes()
  }, [])

  const handleEliminar = (cliente) => {

    const borrarCliente = async (id) => {
      try {
        const url = `http://localhost:4000/clientes/${id}`

        const respuesta = await fetch(url, { method: 'DELETE' })
        const resultado = await respuesta.json()

        const nuevoClientes = clientes.filter(cli => cli.id !== id)
        setClientes(nuevoClientes)

      } catch (error) {
        console.log(error)
      }
    }

    const confirma = confirm(`¿ Desea eliminar el cliente ${cliente.nombre} ?`)
    if ( confirma ) borrarCliente(cliente.id)
  }

  return (
    <>
      <h1 className='font-black text-2xl text-blue-900 '>Clientes</h1>
      <p className='mt-3'>Administra tus <span className='font-bold text-indigo-600 '>clientes</span> </p>

      <table className='w-full mt-5 table-auto shadow bg-white'>

        <thead className='bg-blue-800 text-white'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map(cli => (
            <Cliente
              key={cli.id}
              cliente={cli}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>

      </table>
    </>
  )
}

export default Inicio