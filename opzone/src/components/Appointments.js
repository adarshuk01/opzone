import React, { useEffect, useState,useCallback } from 'react';
import Usernavbar from './Usernavbar';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button, Form } from 'react-bootstrap';
// import './Appointments.css'; // Import the CSS file

function Appointments() {
  const [bookingdata, setbookingdata] = useState([]);
  const [filteredData, setfilterbooking] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterSlot, setFilterSlot] = useState('');

  const doctorid = localStorage.getItem('bookedDoctorId');
  const doctorname = localStorage.getItem('DoctorName');
  const specialization = localStorage.getItem('Specialization');

  const fetchbookings = useCallback(async () => {
    try {
      const response = await axios.get(`https://opzone-backend.onrender.com/bookappointment/${doctorid}`);
      console.log(response.data);
      setbookingdata(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [doctorid]); 

  const handleFilter = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    const filteredData = bookingdata.filter(
      (item) => item.appointmentDate === filterDate && item.timeSlot === filterSlot 
    );
    setfilterbooking(filteredData);
    console.log(filteredData);
  };

  const handlePrint = () => {
    const printContent = document.getElementById('print-table').innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // To restore the original page state
  };

 useEffect(() => {
    fetchbookings();
  }, [fetchbookings]);

  return (
    <div>
      <Usernavbar />
      <div className=' m-4'>
        <div className='d-flex justify-content-between '>
          <div>
            <h4 className='p-0 m-0'>{doctorname}</h4>
            <p className='p-0 m-0'>{specialization}</p>
          </div>
          <div>
            <Form onSubmit={handleFilter} className='d-flex gap-2'>
              <select onChange={(e) => setFilterSlot(e.target.value)} className='p-2 rounded'>
                <option disabled selected>
                  Select Time slot
                </option>
                <option value='9:00-10:30'>Slot-1:(9:00-10:30)</option>
                <option value='11:00-12:30'>Slot-2(11:00-12:30)</option>
                <option value='13:30-15:30'>Slot-3(13:30-15:30)</option>
                <option value='16:00-17:30'>Slot-4(16:00-17:30)</option>
              </select>
              <input onChange={(e) => setFilterDate(e.target.value)} className='p-2 rounded' type='date' />
              <Button type='submit'>Filter</Button>
            </Form>
          </div>
        </div>
        <Button onClick={handlePrint} className='mt-4'>
          Print
        </Button>
        <div id='print-table'>
          <Table   className=' mt-4'    >
            <thead className='custom-thead' style={{backgroundColor: "#f0f0f0"}}>
  <tr>
    <th>Token No.</th>
    <th>Name</th>
    <th>Age</th>
    <th>Phone no.</th>
    <th>Health Issue</th>
    <th>Status</th>
  </tr>
</thead>
            {filteredData.map((items, index) => (
              <tbody key={index}>
                <tr>
                  <td className='text-danger'>
                    <b>{items.token}</b>
                  </td>
                  <td>{items.patientName}</td>
                  <td>{items.age}</td>
                  <td>{items.phone}</td>
                  <td>{items.healthissue}</td>
                  <td className={`${items.status==="Booked"?"text-success":"text-danger"}`}>
                    <b>{items.status}</b>
                  </td>
                </tr>
              </tbody>
            ))}
            <tr className=''>
                <td></td>
                <td></td>
                 <td className='' >
                 <h6 className='p-0 m-0 '><b> {doctorname}</b> </h6>
                 <p className='p-0 m-0 '>{specialization}</p>
                 </td>
                 <td></td>
                 <td>
                    <h6 className='p-0 m-0 '> <b>Sign:</b></h6>
                    <p className='p-0 m-0 '><b>Date:</b>  {filterDate}</p>
                 </td>
                 <td></td>
                </tr>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
