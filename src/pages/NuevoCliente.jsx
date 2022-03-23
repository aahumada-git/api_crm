import Formulario from '../components/Formulario'

const NuevoCliente = () => {
  return (
    <>
      <h1 className='font-black text-2xl text-blue-900 '>Nuevo Cliente</h1>
      <p className='mt-3'>A continuacion llena los datos del <span className='font-bold text-indigo-600 '>nuevo cliente</span> </p>

      <Formulario />
    </>

  )
}

export default NuevoCliente