import React from 'react'

const Button = ({label, onclick}) => {
  return (
        <button onClick={onclick} type='button' className=' w-full text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'> {label} </button>
  )
}

export default Button