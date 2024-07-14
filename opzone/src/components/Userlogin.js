import React, { useState } from 'react'
import Usernavbar from './Usernavbar'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'

function Userlogin() {
    const [username,setusername]=useState('')
    const [password,setpass]=useState('')
    const navigate=useNavigate()
  
      const loginauth=async(e)=>{
          e.preventDefault();
  try {
  await axios.post('http://localhost:8000/login',{username,password}).then(res => 
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
      <Usernavbar />
      <div className='container d-flex align-items-center shadow p-4 gap-1 mb-4 mt-4'>
<div className='image2 container p-2 border shadow'>
<div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://plus.unsplash.com/premium_photo-1681967103563-871828436e1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" height={450} class="d-block w-100" alt="..." />
    </div>
    <div class="carousel-item">
      <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" height={450} class="d-block w-100" alt="..." />
    </div>
    <div class="carousel-item">
      <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" height={450} class="d-block w-100" alt="..." />
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</div>
<div className='container p-2 '>
    
<Form className='container p-4' style={{ maxWidth: "450px" }} >
<h4>Log In</h4>
<Form.Group className="mb-3" controlId="formGroupUsername">
    <Form.Label>Username</Form.Label>
    <Form.Control
        name="username"
        type="text"
        placeholder="Enter username"
        onChange={(e)=>setusername(e.target.value)}
    />
</Form.Group>
<Form.Group className="mb-3" controlId="formGroupPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control
        name="password"
        type="password"
        placeholder="Password"
        onChange={(e)=>setpass(e.target.value)}
    />
</Form.Group>

<Button variant='success' onClick={loginauth} className='w-100' type="submit">Login</Button>
<p>Don't have account? <a href="/register">Register</a></p>
</Form>
</div>
      </div>
      <Footer/>
    </div>
  )
}

export default Userlogin
