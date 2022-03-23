import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

import Alerta from './Alerta'

const Formulario = ({ cliente }) => {

    const [editar, setEditar] = useState(Object.keys(cliente).length === 0 ? false : true)

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, 'El nombre es muy corto')
            .max(40, 'El nombre es muy largo')
            .required('El nombre del cliente es obligatorio'),
        
        empresa: Yup.string()
            .required('El nombre de la empresa es obligatorio'),
        
        email: Yup.string()
            .email('Email no valido')
            .required('El email del cliente es obligatorio'),
        
        telefono: Yup.number()
            .integer('El numero no es valido')
            .positive('El numero no es valido')
            .typeError('El telefono no es valido'),
    })
    
    const handleSubmit = async (values) => {
        try {
            const url = editar 
                            ? `http://localhost:4000/clientes/${cliente.id}`
                            : 'http://localhost:4000/clientes'

            const respuesta = await fetch( url, {
                method: editar ? 'PUT' : 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const resultado = await respuesta.json()
            // console.log(resultado)
            navigate('/clientes')
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-4/5 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center '>
                {editar ? 'Editar Cliente': 'Agregar Cliente'} 
            </h1>
            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? ''
                }}
                enableReinitialize={true}
                onSubmit={ async (values, { resetForm }) => { await handleSubmit(values); resetForm() }}
                validationSchema={nuevoClienteSchema}
            >
                {({ errors, touched }) => {
                    // console.log(errors)
                    return (
                        <Form
                            className='mt-5'
                        >
                            <div className='mt-5'>
                                <label
                                    className='text-grey-800 '
                                    htmlFor='nombre'>
                                    Nombre:
                                </label>
                                <Field
                                    id="nombre"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 "
                                    placeholder='Nombre del Cliente'
                                    name='nombre'
                                />
                                {errors.nombre && touched.nombre ? (<Alerta>{errors.nombre}</Alerta>) : null}
                            </div>

                            <div className='mt-5'>
                                <label
                                    className='text-grey-800 '
                                    htmlFor='empresa'>
                                    Empresa:
                                </label>
                                <Field
                                    id="empresa"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 "
                                    placeholder='Empresa del Cliente'
                                    name='empresa'
                                />
                                {errors.empresa && touched.empresa ? (<Alerta>{errors.empresa}</Alerta>) : null}
                            </div>

                            <div className='mt-5'>
                                <label
                                    className='text-grey-800 '
                                    htmlFor='email'>
                                    E-Mail:
                                </label>
                                <Field
                                    id="email"
                                    type="email"
                                    className="mt-2 block w-full p-3 bg-gray-50 "
                                    placeholder='E-mail del Cliente'
                                    name='email'
                                />
                                {errors.email && touched.email ? (<Alerta>{errors.email}</Alerta>) : null}
                            </div>

                            <div className='mt-5'>
                                <label
                                    className='text-grey-800 '
                                    htmlFor='telefono'>
                                    Telefono:
                                </label>
                                <Field
                                    id="telefono"
                                    type="tel"
                                    className="mt-2 block w-full p-3 bg-gray-50 "
                                    placeholder='Telefono del Cliente'
                                    name='telefono'
                                />
                                {errors.telefono && touched.telefono ? (<Alerta>{errors.telefono}</Alerta>) : null}
                            </div>

                            <div className='mt-5'>
                                <label
                                    className='text-grey-800 '
                                    htmlFor='notas'>
                                    Notas:
                                </label>
                                <Field
                                    as="textarea"
                                    id="notas"
                                    type="tel"
                                    className="mt-2 block w-full p-3 bg-gray-50 h-40 "
                                    placeholder='Notas del Cliente'
                                    name='notas'
                                />
                            </div>

                            <input
                                type="submit"
                                value={editar ? 'Editar Cliente': 'Agregar Cliente'}
                                className='mt-5 w-full bg-blue-800 hover:bg-blue-900 hover:cursor-pointer p-3 text-white uppercase font-bold text-lg'
                            />

                        </Form>
                    )
                }}
            </Formik>

        </div>
    )
}

Formulario.defaultProps = {
    cliente: {}
}

export default Formulario