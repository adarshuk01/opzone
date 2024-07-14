import React, { useEffect, useState } from 'react';
import Usernavbar from './Usernavbar';
import { fetchDoctor } from './redux/Doctorslice';
import { fetchopstaff } from './redux/OpstaffSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function OpstaffHome() {
  const dispatch = useDispatch();
  const { doctor, status: doctorStatus } = useSelector((state) => state.doctor);
  const { opstaff, status: opstaffStatus, error } = useSelector((state) => state.opstaff);
  const [currentOpStaff, setCurrentOpStaff] = useState('');
  const[doctorsdel,setdoctorsdel]= useState([]);
const navigate=useNavigate()
  const opstaffID = localStorage.getItem('userId');

//   fetch doctor details by hospital name
// const 
useEffect(() => {
    const fetchdoctordel = async () => {
      if (currentOpStaff && currentOpStaff.hospitalname) {
        try {
          const response = await axios.get(`http://localhost:8000/getdoctorhospital/${currentOpStaff.hospitalname},${currentOpStaff.city}`);
          console.log(response.data);
          setdoctorsdel(response.data)
        } catch (error) {
          console.error("Error fetching doctor details:", error);
        }
      }
    };

    fetchdoctordel();
  }, [currentOpStaff]);

// console.log(currentOpStaff.hospitalname);

  useEffect(() => {
    if (doctorStatus === 'idle') {
      dispatch(fetchDoctor());
    }
  }, [doctorStatus, dispatch]);

  useEffect(() => {
    if (opstaffStatus === 'idle') {
      dispatch(fetchopstaff());
    }
  }, [opstaffStatus, dispatch]);

  useEffect(() => {
    if (opstaffStatus === 'succeeded' && opstaff) {
      const filteredOpStaff = opstaff
        .filter(item => item.logindetail && item.logindetail._id === opstaffID);
      setCurrentOpStaff(filteredOpStaff.length > 0 ? filteredOpStaff[0] : null);
    }
  }, [opstaffStatus, opstaff, opstaffID]);

  // Log the logindetail._id for each opstaff
  useEffect(() => {
    if (opstaffStatus === 'succeeded' && opstaff) {
      const logindetailIds = opstaff
        .filter(item => item.logindetail && item.logindetail._id)
        .map(item => item.logindetail._id);
      console.log('Logindetail IDs:', logindetailIds);
    }
  }, [opstaffStatus, opstaff]);

  const handleBookNowClick = (doctorId,doctorname,Specialization) => {
    localStorage.setItem('bookedDoctorId', doctorId);
    localStorage.setItem('DoctorName', doctorname);
    localStorage.setItem('Specialization', Specialization);


    // You can also navigate to another page or perform any other action here
    opstaffID?navigate('/doctorappointments'):navigate('/login')
  };

  return (
    <div>
      <Usernavbar />
<div className='' style={{background:`linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)),url(http://localhost:8000/uploads/${currentOpStaff.staffpic}) fixed `,backgroundSize:"cover",backgroundPosition:"top" ,width:"100%",height:'250px'}}>

</div>
<div>
<div style={{  marginTop: '-50px' }} className='d-flex gap-2 align-items-end  p-2'>
            <img
                className='profile-img shadow border bg-light rounded'
                src={`http://localhost:8000/uploads/${currentOpStaff.profilepic}`}
                height={150}
                width={150}
                alt='Doctor'
            />
            <div>
                <h4 className='p-0 m-0 text-danger'>{currentOpStaff.staffname}</h4>
                <p className='p-0 m-0 text-muted'>
                    <b> {currentOpStaff.hospitalname},{currentOpStaff.city}</b>
                </p>
                
                <p className='p-0 m-0'>
                    <span>
                        {' '}
                        Email: <b className='text-danger'>{currentOpStaff.email}</b>
                    </span>
                </p>
            </div>
        </div>
</div>
      {!currentOpStaff && opstaffStatus === 'succeeded' && <p>No matching opstaff found.</p>}
      {opstaffStatus === 'loading' && <p>Loading...</p>}
      {opstaffStatus === 'failed' && <p>Error: {error}</p>}
<div className=' bg-light mt-4 p-3'>
    <div className='d-flex justify-content-between'>
    <h4>Registered Doctors</h4>
    <Form className='d-flex justify-content-center gap-2'>
    <Form.Group className="" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="Type Name...." />
      </Form.Group >

      <Button><i class="ri-search-line"></i></Button>
    </Form>
    </div>
      <div className='d-flex gap-2 m-auto mt-2 flex-wrap '>
{doctorsdel.map(items=>(
    <div style={{width:"350px"}} className='d-flex gap-2 shadow-sm rounded align-items-center p-2 bg-white '>
        <img className='rounded' src={`http://localhost:8000/uploads/${items.photo}`} height={150} width={150} alt="" />
        <div>
       <h5 className='p-0 m-0 '>{items.fullname}</h5> 
       <p className='pb-2 m-0' >{items.Specialization}</p> 
       <a href='' onClick={() => handleBookNowClick(items.logindetail._id,items.fullname,items.Specialization)} className='p-2 mt-3 bg-light'><u> View OP Bookings</u> </a>
       </div>     
 </div>
))}
</div>
</div>
    </div>
  );
}

export default OpstaffHome;
