import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username,setusername]=useState('')
  const [password,setpass]=useState('')
  const navigate=useNavigate()

    const loginauth=async(e)=>{
        e.preventDefault();
try {
await axios.post('https://opzone-backend.onrender.com/login',{username,password}).then(res => 
{
    console.log(res);
    if(res.data.status==="Success"){

    localStorage.setItem('userId',res.data.id)
    localStorage.setItem("token",res.data.token)
    
    if(res.data.role==="doctor"){
        alert(res.data.status)
        navigate(`/doctorpage`)
    }
    else if(res.data.role==="opstaff"){
        alert(res.data.status)
        navigate(`/opstaffhome`)
    }

    else if(res.data.role==="admin"  ){
        alert(res.data.status)
        navigate('/adminpage')
    }
    else if(res.data.role==="patient"  ){
      alert(res.data.status)
      navigate('/')
  }
    }else{
    alert(res.data.status)
    }
})
} catch (error) {
console.error(error);
}

}

  return (
    <div>
      <div className='container border p-2 shadow-lg w-75 bg-body-secondary d-flex rounded-3 container-sm mt-5   '>
<div className='image fluid container border shadow  '>
  {/* image container */}
</div>
<div className='signin container border shadow  bg-light '>
  <h4><i class="ri-admin-fill"></i> Sign In</h4>
  <Form  className='mt-3 mb-3'>
  <FloatingLabel
        controlId="floatingInput"
        label="Username"
        className="mb-3  "
        onChange={(e)=>setusername(e.target.value)}
      >
        <Form.Control type="text" placeholder="name@example.com" />
      </FloatingLabel>
      
      <FloatingLabel
        controlId="floatingInput"
        label="Password"
        className="mb-3"
        onChange={(e)=>setpass(e.target.value)}
      >
        <Form.Control type="password" placeholder="text" />
      </FloatingLabel>
      
      <Button onClick={loginauth} className='w-100 btn btn-primary'>Sign In</Button>
      </Form>
</div>
      </div>
    </div>
  )
}

export default Login
