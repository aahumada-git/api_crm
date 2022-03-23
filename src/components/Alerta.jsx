import React from 'react'

const Alerta = ({ children }) => {
    return (
        <div className='text-red-500 font-thin '>
            {children}
        </div>
    )
}

export default Alerta