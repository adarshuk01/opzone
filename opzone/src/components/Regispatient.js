import React, { useState } from 'react'
import Usernavbar from './Usernavbar'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function Regispatient() {

    const [fullname, setFullname] = useState('');
    const [dateofbirth, setDateofbirth] = useState('');
    const [gender, setGender] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [address, setAddress] = useState('');
    const [place, setPlace] = useState('');
    const [city, setCity] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate=useNavigate()

   // Function to handle form submission
   const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    const body = { fullname, email, dateofbirth, gender, phoneno, address, place, city, username, password };
    console.log(gender);
    try {
        const res = await axios.post('https://opzone-backend.onrender.com/patientreg', body);
        if (res.data.status === "user already exists") {
            alert("User already exists");
        } else {
            alert("Registration successful");
            console.log(res.data.details._id);
            navigate('/')
            localStorage.setItem('userId',res.data.details._id)
        }
    } catch (error) {
        console.error(error);
        alert("Registration failed");
    }
};

  return (
    <div>
        <Usernavbar />
      <div className='container d-flex'>
        <div className='image2 container border text-center  p-2 mt-4 mb-4 gap-4'>
  <img src="https://plus.unsplash.com/premium_photo-1673958771843-12c73b278bd0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" height={550} width={600} alt="" />
        </div>
      <Form className='container shadow  mt-4 mb-4 p-4' onSubmit={onSubmit} style={{ maxWidth: "750px" }}>
    <h4>Patient Registration</h4>
    <div className='row'>
        <Form.Group className="col-12 col-md-6 mb-3" controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control
                name="fullname"
                type="text"
                placeholder="Enter name"
                onChange={(e) => setFullname(e.target.value)}
            />
        </Form.Group>
        <Form.Group className="col-12 col-md-6 mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
            />
        </Form.Group>
    </div>
    <div className='row'>
        <Form.Group className="col-12 col-md-6 mb-3" controlId="formGroupPhone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
                name="phoneno"
                type="number"
                placeholder="Enter phone no."
                onChange={(e) => setPhoneno(e.target.value)}
            />
        </Form.Group>
        <Form.Group className="col-12 col-md-3 mb-3" controlId="formGroupDob">
            <Form.Label>Date of birth</Form.Label>
            <Form.Control
                name="dateofbirth"
                type="date"
                onChange={(e) => setDateofbirth(e.target.value)}
            />
        </Form.Group>
        <Form.Group className="col-12 col-md-3 mb-3" controlId="formGroupGender">
            <Form.Label>Select Gender</Form.Label>
            <Form.Select
                name="gender"
                aria-label="Default select example"
                onChange={(e) => setGender(e.target.value)}
            >
                <option disabled selected>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </Form.Select>
        </Form.Group>
    </div>
    <div className='row'>
        <Form.Group className="col-12 col-md-6 mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Address</Form.Label>
        <Form.Control as="textarea" rows={3}  onChange={(e) => setAddress(e.target.value)}/>
      </Form.Group>
        <Form.Group className="col-12 col-md-3 mb-3" controlId="formGroupPlace">
            <Form.Label>Place</Form.Label>
            <Form.Control
                name="place"
                type="text"
                placeholder="Enter Place"
                onChange={(e) => setPlace(e.target.value)}
            />
        </Form.Group>
        <Form.Group className="col-12 col-md-3 mb-3" controlId="formGroupCity">
            <Form.Label>Select City</Form.Label>
            <Form.Select
                name="city"
                aria-label="Default select example"
                onChange={(e) => setCity(e.target.value)}
            >
                <option selected disabled>Select city</option>
                <option value="kannur">Kannur</option>
                <option value="calicut">Calicut</option>
            </Form.Select>
        </Form.Group>
    </div>
    <div className='row'>
        <Form.Group className="col-12 col-md-6 mb-3" controlId="formGroupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
                name="username"
                type="text"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
            />
        </Form.Group>
        <Form.Group className="col-12 col-md-6 mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
        </Form.Group>
    </div>
    <Button variant='success' type="submit">Register</Button>
    <div className='mt-2'>
        <p className='p-0 m-0'>Already Registered?<a href="/login">Login</a></p>
        <p className='p-0 m-0'>Employee?<a href="/admin">Login</a></p>
    </div>
</Form>

      </div>
      <Footer />
    </div>
  )
}

export default Regispatient
