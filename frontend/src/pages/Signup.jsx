import React, { useState } from 'react'
import { Heading }  from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import ButtonWarning from '../components/ButtonWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign up"}/>
          <SubHeading label={"Enter your information to create an account"}/>
          <InputBox placeholder="Jay" label={"First Name"} onChange={(e) => {
            setFirstName(e.target.value);
          }}/>
          <InputBox placeholder="Ginoya" label={"Last Name"} onChange={(e) =>{
            setLastName(e.target.value);
          }}/>
          <InputBox placeholder="jg@gmail.com" label={"Email"} onChange={(e) =>{
            setUsername(e.target.value);
          }}/>
          <InputBox placeholder="123456" label={"Password"} onChange={(e) =>{
            setPassword(e.target.value);
          }}/>
          <div className=' pt-4'>
            <Button onclick={async () =>{
              const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              firstname,
              lastname,
              password
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard");
            }} 
            label={"Sign up"}/>
          </div>
          <ButtonWarning label={"Already have an account"} buttontext={"Sign in"} to={"/signin"}/>
        </div>
      </div>
    </div>
  )
}
