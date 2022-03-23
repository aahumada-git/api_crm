import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

const VerCliente = () => {

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

    return ( cargando ? <Spinner /> : Object.keys(cliente).length === 0 ? <p>Cliente no existe</p> : (
        <div>
            <h1 className='font-black text-2xl text-blue-900 '>Ver Cliente</h1>
            <p className='mt-3'>Informacion del <span className='font-bold text-indigo-600 '>cliente</span> </p>

            <p className='text-xl mt-3 text-gray-800'>
                <span className='text-gray-700 uppercase font-bold'>ID:</span>
                {cliente.id}
            </p>
            <p className='text-xl mt-3 text-gray-800'>
                <span className='text-gray-700 uppercase font-bold'>Nombre:</span>
                {cliente.nombre}
            </p>

            <p className='text-xl mt-3 text-gray-800'>
                <span className='text-gray-700 uppercase font-bold'>Empresa:</span>
                {cliente.empresa}
            </p>

            <p className='text-xl mt-3 text-gray-800'>
                <span className='text-gray-700 uppercase font-bold'>e-Mail:</span>
                {cliente.email}
            </p>

            <p className='text-xl mt-3 text-gray-800'>
                <span className='text-gray-700 uppercase font-bold'>Telefono:</span>
                {cliente.telefono}
            </p>

            <p className='text-xl mt-3 text-gray-800'>
                <span className='text-gray-700 uppercase font-bold'>Notas:</span>
                {cliente.notas}
            </p>

        </div>
    )) 
}

export default VerCliente