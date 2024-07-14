import React, { useEffect, useState } from 'react';
import Adminnavbar from './Adminnav';
import { Button, FormGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import uuid from 'react-uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  { fetchDoctor } from './redux/Doctorslice';
import { useSelector, useDispatch } from 'react-redux';


function Opstaff() {

    

    const [id] = useState(uuid().slice(0, 4));
    const [staffname, setstaffname] = useState('');
    const [photo, setphoto] = useState('');
    const [dateofbirth, setdateofbirth] = useState('');
    const [gender, setgender] = useState('');
    const [hospitalname, sethospitalname] = useState('');
    const [city, setcity] = useState('');
    const [address, setaddress] = useState('');
    const [email, setemail] = useState('');
    const [profile, setprofile] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();

    const handlePhoto = (e) => {
        setphoto(e.target.files[0]);
    }

    const handleprofile = (e) => {
        setprofile(e.target.files[0]);
    }

    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', id);
        formData.append('staffname', staffname);
        formData.append('photo', photo);
        formData.append('dateofbirth', dateofbirth);
        formData.append('gender', gender);
        formData.append('hospitalname', hospitalname);
        formData.append('city', city);
        formData.append('address', address);
        formData.append('email', email);
        formData.append('profile', profile);
        formData.append('username', username);
        formData.append('password', password);

        axios.post('http://localhost:8000/hospitaldetails', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res);
            if (res.data.status === "user already exists") {
                alert("User already exists");
            } else {
                alert("Register success");
                // navigate('/');
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    

    return (
        <div>
            <Adminnavbar />
            <div className='reg-opstaff img-fluid p-2'>
                <h2 className='text-center mt-4 text-shadow text-light'><span className="material-symbols-outlined">stethoscope_arrow</span> Op-Staff Registration</h2>
            </div>
            <div className='container bg-light shadow d-flex p-2 flex-wrap justify-content-center gap-3' style={{ marginTop: "-250px" }}>
                <div className='shadow bg-light p-4 overflow-scroll' style={{ width: "420px" }}>
                    <h4 className='text-success mb-2'><i className="ri-user-fill"></i> Staff Details</h4>

                    <Form onSubmit={submitForm}>
                        <Form.Group className="mb-3" controlId="profile">
                            <Form.Label>Profile</Form.Label>
                            <Form.Control onChange={handleprofile} type="file" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="fullname">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control onChange={(e) => setstaffname(e.target.value)} type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="dob">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control onChange={(e) => setdateofbirth(e.target.value)} type="date" />
                        </Form.Group>

                        <FormGroup className='mb-3'>
                            <Form.Label>Gender</Form.Label>
                            <Form.Select onChange={(e) => setgender(e.target.value)} aria-label="Default select example">
                                <option>Open this select menu</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Form.Select>
                        </FormGroup>
                    </Form>
                </div>

                <div className='shadow p-4 bg-light' style={{ width: "420px" }}>
                    <h4 className='text-danger mb-2'><i className="ri-hospital-fill"></i> Hospital Details</h4>
                    <Form>
                        <Form.Group className="mb-3" controlId="hospitalname">
                            <Form.Label>Hospital Name</Form.Label>
                            <Form.Control onChange={(e) => sethospitalname(e.target.value)} type="text" />
                        </Form.Group>

                        <FormGroup className='mb-3'>
                            <Form.Label>City</Form.Label>
                            <Form.Select onChange={(e) => setcity(e.target.value)} aria-label="Default select example">
                                <option>Open this select menu</option>
                                <option value="Kannur">Kannur</option>
                                <option value="Taliparamba">Taliparamba</option>
                                <option value="Payyanur">Payyanur</option>
                                <option value="Thalaserry">Thalaserry</option>
                                <option value="Kozhikode">Kozhikode</option>

                            </Form.Select>
                        </FormGroup>

                        <Form.Group className="mb-3" controlId="photo">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control onChange={handlePhoto} type="file" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control onChange={(e) => setaddress(e.target.value)} as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </div>

                <div className='shadow p-4 bg-light' style={{ width: "420px" }}>
                    <h4 className='text-muted mb-2'><i className="ri-key-2-fill"></i> Login Credentials</h4>
                    <Form>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={(e) => setusername(e.target.value)} type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Mail ID</Form.Label>
                            <Form.Control onChange={(e) => setemail(e.target.value)} type="email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => setpassword(e.target.value)} type="password" />
                        </Form.Group>
                    </Form>
                    <div className='d-flex gap-2'>
                        <Button type="submit" onClick={submitForm} className='w-50'>Register</Button>
                        <Button variant='outline-primary' className='w-50'>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Opstaff;
