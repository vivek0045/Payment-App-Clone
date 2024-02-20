import React from 'react'

const InputBox = ({label, placeholder, onChange}) => {
  return (
    <div>
        <div className=' text-sm py-2 text-left font-medium'>
            {label}
        </div>
        <input placeholder={placeholder} onChange={onChange} className=' w-full px-1 py-2 border rounded border-slate-200'/>
    </div>
  )
}

export default InputBox