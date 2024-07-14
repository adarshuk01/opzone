import React, { useEffect, useState } from 'react';
import { Button, FormGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Adminnavbar from './Adminnav';
import { useSelector, useDispatch } from 'react-redux';
import { fetchopstaff } from './redux/OpstaffSlice';
// import { fetchdoctor } from './Doctorslice';
import uuid from 'react-uuid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Adddoctor() {
  const dispatch = useDispatch();
  const { opstaff, status, error } = useSelector((state) => state.opstaff);

  console.log(opstaff);

  const [id] = useState(uuid().slice(0, 4));
  const [fullname, setFullname] = useState('');
  const [photo, setPhoto] = useState(null);
  const [dateofbirth, setDateofbirth] = useState('');
  const [gender, setGender] = useState('');
  const [hospitalname, setHospitalname] = useState('');
  const [qualification, setQualification] = useState('');
  const [institute, setInstitute] = useState('');
  const [Specialization, setSpecialization] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [exp, setExp] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [hospitalid,sethospitalid]=useState('')
  const navigate = useNavigate();

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  }

  const handleCertificate = (e) => {
    setCertificate(e.target.files[0]);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('fullname', fullname);
    formData.append('photo', photo);
    formData.append('dateofbirth', dateofbirth);
    formData.append('gender', gender);
    formData.append('hospitalname', hospitalname);
    formData.append('qualification', qualification);
    formData.append('institute', institute);
    formData.append('email', email);
    formData.append('certificate', certificate);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('Specialization', Specialization);
    formData.append('exp', exp);

    try {
      const res = await axios.post('http://localhost:8000/doctordetails', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.status === "user already exists") {
        alert("User already exists");

      } else {
        alert("Register success");
        // navigate('/');
        console.log(Specialization);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchopstaff());
      
    }
  }, [status, dispatch]);

  return (
    <div>
      <Adminnavbar />
      <div className='reg-doctor img-fluid p-2'>
        <h2 className='text-center text-light mt-4'><span className="material-symbols-outlined">stethoscope_arrow</span> Doctor Registration</h2>
      </div>
      <div className='container bg-light shadow d-flex p-2 flex-wrap justify-content-center gap-3' style={{ marginTop: "-250px" }}>
        <div className='shadow bg-light p-4 overflow-scroll' style={{ width: "420px" }}>
          <h4 className='text-success mb-2'> <i className="ri-user-fill"></i> Personal Details</h4>
          <Form>
            <Form.Group className="mb-3" controlId="photo">
              <Form.Label>Profile</Form.Label>
              <Form.Control onChange={handlePhoto} type="file" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="fullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control onChange={(e) => setFullname(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dateofbirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control onChange={(e) => setDateofbirth(e.target.value)} type="date" />
            </Form.Group>
            <FormGroup className='mb-3' controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Select onChange={(e) => setGender(e.target.value)}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </FormGroup>
            <FormGroup className='mb-3' controlId="hospitalname">
  <Form.Label>Hospital / Clinic Name</Form.Label>
  <Form.Select onChange={(e) => setHospitalname(e.target.value)} required>
    <option value="" selected disabled>Select hospital</option>
    {opstaff.map((item) => (
      <option key={`${item.hospitalname},${item.city}`} value={`${item.hospitalname},${item.city}`}>
        {`${item.hospitalname}, ${item.city}`}
      </option>
    ))}
  </Form.Select>
</FormGroup>
          </Form>
        </div>
        <div className='shadow p-4 bg-light' style={{ width: "420px" }}>
          <h4 className='text-danger mb-2'><i className="ri-graduation-cap-fill"></i> Qualification Details</h4>
          <Form>
            <Form.Group className="mb-3" controlId="qualification">
              <Form.Label>Qualification</Form.Label>
              <Form.Control onChange={(e) => setQualification(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="institute">
              <Form.Label>Medical School/Institution</Form.Label>
              <Form.Control onChange={(e) => setInstitute(e.target.value)} type="text" />
            </Form.Group>
            <FormGroup className='mb-3' controlId="specialization">
              <Form.Label>Specialization</Form.Label>
              <Form.Select onChange={(e) => setSpecialization(e.target.value)}>
                <option value="">Select specialization</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="General Medicine">General Medicine</option>
              </Form.Select>
            </FormGroup>
            <Form.Group className="mb-3" controlId="exp">
              <Form.Label>Experience</Form.Label>
              <Form.Control onChange={(e) => setExp(e.target.value)} type="number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="certificate">
              <Form.Label>Certificate</Form.Label>
              <Form.Control onChange={handleCertificate} type="file" />
            </Form.Group>
          </Form>
        </div>
        <div className='shadow p-4 bg-light' style={{ width: "420px" }}>
          <h4 className='text-muted mb-2'><i className="ri-key-2-fill"></i> Login Credentials</h4>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={(e) => setUsername(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" />
            </Form.Group>
          </Form>
          <div className='d-flex gap-2'>
            <Button className='w-50' onClick={submitForm}>Register</Button>
            <Button variant='outline-primary' className='w-50'>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adddoctor;
