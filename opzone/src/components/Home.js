import React, { useEffect, useState } from 'react';
import Usernavbar from './Usernavbar';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Footer from './Footer';
import { Card, Row, Col } from 'react-bootstrap';
import { fetchDoctor } from './redux/Doctorslice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Home() {
  const [showDoctors, setShowDoctors] = useState(false);
  const [specialization, setSpecialization] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [datas, setDatas] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [activedoctor, setactivedoctor] = useState([]);
  const navigate=useNavigate()
  const userid = localStorage.getItem('userId');


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://opzone-backend.onrender.com/activedoctor');
        setAllDoctors(response.data.doctorfilter);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchschedule = async () => {
      try {
        const response = await axios.get('https://opzone-backend.onrender.com/activeschedule');
        setactivedoctor(response.data.schedulefilter);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
    fetchschedule()
  }, []);

  const handleSearchClick = () => {
    setShowDoctors(true);
    let filteredDoctors = [];
  
    activedoctor.forEach(item => {
      const filtered = allDoctors.filter(doctor => {
        return (
          (specialization === '' || doctor.Specialization === specialization) &&
          (gender === '' || doctor.gender === gender) &&
          (city === '' || doctor.hospitalname.includes(city)) &&
          (doctor.logindetail === item.doctorid)
        );
      }).map(doctor => ({ ...doctor, schedule: `${item.startTime}-${item.endTime}` })); // add schedule to doctor
  
      filteredDoctors = [...filteredDoctors, ...filtered];
    });
  
    setDatas(filteredDoctors);
  };
  
  const handleBookNowClick = (doctorId) => {
    localStorage.setItem('bookedDoctorId', doctorId);

    // You can also navigate to another page or perform any other action here
    userid?navigate('/bookop'):navigate('/login')
  };

 

  return (
    <div>
      <Usernavbar />
      <div className='section1 d-flex align-items-center p-4 justify-content-center'>
        <div>
          <h1 className='text-warning text-shadow text-start'>Find The Best Doctor Near <br /> By You</h1>
          <div className='container bg-light p-3 rounded' style={{ width: "fit-content" }}>
            <div className='d-flex gap-2 mb-3 flex-wrap'>
              <FloatingLabel controlId="floatingSelect" label="Specialization" className='w-100'>
                <Form.Select aria-label="Floating label select example" onChange={(e)=>setSpecialization(e.target.value)}>
                  <option selected disabled value="">Select specialization</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="General Medicine">General Medicine</option>
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel controlId="floatingSelect" label="City" className='w-100'>
                <Form.Select  aria-label="Floating label select example"  onChange={(e)=>setCity(e.target.value)}>
                  <option selected disabled>Select City</option>
                  <option value="Kannur">Kannur</option>
                  <option value="Taliparamba">Taliparamba</option>
                  <option value="Payyanur">Payyanur</option>
                  <option value="Thalaserry">Thalaserry</option>
                  <option value="Kozhikode">Kozhikode</option>

                </Form.Select>
              </FloatingLabel>
              <div className='d-flex gap-3'>
                <FloatingLabel controlId="floatingSelect" label="Gender">
                  <Form.Select onChange={(e)=>setGender(e.target.value)} aria-label="Floating label select example">
                    <option>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="floatingSelect" label="Rating/5.0">
                  <Form.Select aria-label="Floating label select example">
                    <option>Select Rating</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </FloatingLabel>
              </div>
            </div>
            <Button variant='success' onClick={handleSearchClick}>Search</Button>
          </div>
        </div>
      </div>

      <div>
      {showDoctors && (  
        <div className='search-section m-4  p-4 d-flex gap-2 flex-wrap'>
          {datas.map((items, index) => (
  <Card key={index} className="mb-3 shadow p-2" style={{ width: '450px', maxHeight: '430px' }}>
    <Row className="no-gutters">
      <Col md={4}>
        <Card.Img variant="top" className='mt-2' src={`http://localhost:8000/uploads/${items.photo}`} height={150} width={150} />
      </Col>
      <Col md={8}>
        <Card.Body>
          <Card.Title className='p-0 m-0'>{items.fullname}</Card.Title>
          <Card.Text>
            <p className='text-danger p-0 m-0'><b><u>{items.hospitalname}</u></b></p>   
            <p className='p-0 m-0'> <b>Specialization</b>: {items.Specialization}</p>
            <p  className='p-0 m-0'><b>Schedule</b>: {items.schedule}</p>
            </Card.Text>
          <Card.Text>
            <Button className='w-100' onClick={() => handleBookNowClick(items.logindetail)}>Book Now</Button>
          </Card.Text>
        </Card.Body>
      </Col>
    </Row>
  </Card>
))}
   </div>

      )}</div>

<div className='section-4 m-5 border p-3'>
        <div className='d-flex justify-content-center gap-4 flex-wrap align-items-center'>
          <div className='d-flex gap-2 align-items-center'>
            <img className='p-3' src="https://cdn-icons-png.flaticon.com/128/4149/4149678.png" alt="" width={100} height={100} />
            <div>
              <h5 className='text-success'>Work Process</h5>
              <h3>Work Process How it Works?</h3>
            </div>
          </div>
          <div>
            <p>Donec rutrum congue leo eget malesuada. <br /> Nulla porttitor accumsan tincidunt. <br /> Vestibulum ante ipsum primis.</p>
          </div>
          <div>
            <a href='/' className='btn btn-success'>Search Doctor</a>
          </div>
        </div>
        <div className='d-flex flex-wrap'>
          <div className='container p-4 rounded shadow d-flex align-items-center gap-2 mt-3' style={{ width: "450px" }}>
            <h2 className='text-success'>1</h2>
            <img className='p-3' src="https://cdn-icons-png.flaticon.com/128/2785/2785482.png" alt="" width={100} height={100} />
            <div>
              <h4 className='text-danger'>Search Best Doctors</h4>
              <p>It is a long established fact that a reader will be distracted by the readable.</p>
            </div>
          </div>
          <div className='container p-4 rounded shadow d-flex align-items-center gap-2 mt-3' style={{ width: "450px" }}>
            <h2 className='text-success'>2</h2>
            <img className='p-3' src="https://cdn-icons-png.flaticon.com/128/2460/2460875.png" alt="" width={100} height={100} />
            <div>
              <h4 className='text-danger'>Get Instant Booking</h4>
              <p>It is a long established fact that a reader will be distracted by the readable.</p>
            </div>
          </div>
          <div className='container p-4 rounded shadow d-flex align-items-center gap-2 mt-3' style={{ width: "450px" }}>
            <h2 className='text-success'>3</h2>
            <img className='p-3' src="https://cdn-icons-png.flaticon.com/128/2839/2839174.png" alt="" width={100} height={100} />
            <div>
              <h4 className='text-danger'>Leave Your Feedback</h4>
              <p>It is a long established fact that a reader will be distracted by the readable.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='section-2 mt-5 mb-5 container'>
        <div>
          <div className="container mb-4 p-2 d-flex flex-wrap gap-2">
            <div className='container bg-danger-subtle p-4 mb-3 shadow-lg border border-danger border-top-0' style={{ width: '300px' }}>
              <img src="https://cdn-icons-png.flaticon.com/128/3481/3481061.png" className='rounded-4' height={100} width={100} style={{ marginTop: '-65px' }} alt="" />
              <h5 className='m-2 text-danger'>Therapiya</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde soluta assumenda quos esse, minus, distinctio eius beatae fugiat a atque, quis odit quia! Animi, soluta?</p>
            </div>
            <div className='container bg-success-subtle p-4 mb-3 shadow-lg border border-success border-top-0' style={{ width: '300px' }}>
              <img src="https://cdn-icons-png.flaticon.com/128/5577/5577162.png" className='p-2 rounded-4' height={100} width={100} style={{ marginTop: '-65px' }} alt="" />
              <h5 className='m-2 text-success'>Dentistry</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde soluta assumenda quos esse, minus, distinctio eius beatae fugiat a atque, quis odit quia! Animi, soluta?</p>
            </div>
            <div className='container bg-primary-subtle p-4 mb-3 shadow-lg border border-dark border-top-0' style={{ width: '300px' }}>
              <img src="https://cdn-icons-png.flaticon.com/128/2904/2904287.png" className='rounded-4 p-2' height={100} width={100} style={{ marginTop: '-65px' }} alt="" />
              <h5 className='m-2 text-muted'>Virusology</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde soluta assumenda quos esse, minus, distinctio eius beatae fugiat a atque, quis odit quia! Animi, soluta?</p>
            </div>
            <div className='container bg-warning-subtle p-4 mb-3 shadow-lg border border-warning border-top-0' style={{ width: '300px' }}>
              <img src="https://cdn-icons-png.flaticon.com/128/10299/10299371.png" className='rounded-4 p-2' height={100} width={100} style={{ marginTop: '-65px' }} alt="" />
              <h5 className='m-2 text-warning'>Pharmocology</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde soluta assumenda quos esse, minus, distinctio eius beatae fugiat a atque, quis odit quia! Animi, soluta?</p>
            </div>
          </div>
        </div>
      </div>
      <div className='section-3'>
        <div className='container d-flex gap-4 flex-wrap justify-content-center align-items-center'>
          <div className='container text-white p-3' style={{ width: '550px' }}>
            <h1 className='text-warning'>Why Choose <br /> OP-Zone</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. It is a long established fact that a reader will be distracted by the readable content. Lorem ipsum dolor sit amet consectetur.</p>
            <h3 className='text-warning'> <img src="https://cdn-icons-png.flaticon.com/128/2382/2382533.png" height={50} width={50} alt="" /> Quality Control System</h3>
            <p>It is a long established fact that a reader will be distracted by the readable content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi architecto cupiditate autem ratione!</p>
            <h3 className='text-warning'> <img src="https://cdn-icons-png.flaticon.com/128/476/476863.png" height={50} width={50} alt="" /> Highly Professional Staff</h3>
            <p>It is a long established fact that a reader will be distracted by the readable content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi architecto cupiditate autem ratione!</p>
          </div>
          <div className='container d-flex gap-2 flex-wrap' style={{ width: '550px' }}>
            <img className='shadow-lg border border-warning' style={{ marginTop: '20px', marginLeft: '30px' }} src="https://images.unsplash.com/photo-1584516150909-c43483ee7932?q=80&w=2024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" height={200} width={300} /> <br />
            <img className='shadow-lg border border-warning' style={{ marginLeft: '0px', marginTop: '-40px' }} src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" height={200} width={300} />
            <img className='shadow-lg border border-warning' style={{ marginLeft: '200px', marginTop: '-290px' }} src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" height={150} width={200} />
            <img className='shadow-lg border border-warning' style={{ marginLeft: "70px", marginTop: "-180px" }} src="https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" height={150} width={250} />
          </div>
        </div>
      </div>

     
      <div>
       
      </div>
    </div>
  );
}

export default Home;

