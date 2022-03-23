import { useNavigate } from 'react-router-dom'

const Cliente = ({ cliente, handleEliminar }) => {

    const navigate = useNavigate()

    const { id, nombre, empresa, email, telefono, notes } = cliente

    return (
        <tr className='border-b hover:bg-gray-100 '>
            <td>{nombre}</td>
            <td>{empresa}</td>
            <td>
                <p><span className='text-grey-800 uppercase font-bold'>e-Mail:</span>{email}</p>
                <p><span className='text-grey-800 uppercase font-bold'>Telefono:</span>{telefono}</p>
            </td>
            <td>
                <button
                    type='button'
                    className='bg-green-600 hover:bg-green-700 block w-full hover:cursor-pointer rounded p-2 uppercase font-bold text-white text-xs mt-3'
                    onClick={ () => navigate(`/clientes/ver/${id}`)}
                >Ver</button>
                <button
                    type='button'
                    className='bg-blue-600 hover:bg-blue-700 block w-full hover:cursor-pointer rounded p-2 uppercase font-bold text-white text-xs mt-3'
                    onClick={ () => navigate(`/clientes/editar/${id}`)}
                >Editar</button>
                <button
                    type='button'
                    className='bg-red-600 hover:bg-red-700 block w-full hover:cursor-pointer rounded p-2 uppercase font-bold text-white text-xs mt-3'
                    onClick={ () => handleEliminar(cliente) }
                >Borrar</button>
            </td>
        </tr>
    )
}

export default Cliente