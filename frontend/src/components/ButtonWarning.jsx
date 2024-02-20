import React from 'react'
import { Link } from 'react-router-dom'

const ButtonWarning = ({label, buttontext, to}) => {
  return (
    <div className=' flex py-2 justify-center text-sm'>
        <div>
            {label}
        </div>
        <Link className=' pointer underline cursor-pointer pl-1' to={to}>
            {buttontext}
        </Link>
    </div>
  )
}

export default ButtonWarning