import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Spinner from '../components/Spinner'
import Formulario from '../components/Formulario'
import Alerta from '../components/Alerta'

const EditarCliente = () => {

  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        // console.log(resultado)
        setCliente(resultado)
      } catch (error) {
        console.log(error)
      }
      setCargando(false)
    }

    obtenerCliente()
  }, [])

  return (
    <>
      <h1 className='font-black text-2xl text-blue-900 '>Editar Cliente</h1>
      <p className='mt-3'>A continuacion edita los datos del <span className='font-bold text-indigo-600 '>cliente</span> </p>

      {cargando ? <Spinner /> : !cliente?.id ? <Alerta>Cliente ID:{id} no valido</Alerta> : <Formulario cliente={cliente} />}
    </>
  )
}

export default EditarCliente