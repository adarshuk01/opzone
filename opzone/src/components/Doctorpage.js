import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctor } from './redux/Doctorslice';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Footer from './Footer';

const MyVerticallyCenteredModal = ({
  show, onHide, selectedDays, handleDayChange, startTime, endTime, handleTimeChange, handleConfirm,
}) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Schedule OP Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Select Days</h5>
        <Form>
          <div className="d-flex gap-2 mb-2 flex-wrap">
            {days.map((day, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={day}
                  id={`flexCheck${day}`}
                  onChange={handleDayChange}
                  checked={selectedDays.includes(day)}
                />
                <label className="form-check-label" htmlFor={`flexCheck${day}`}>{day}</label>
              </div>
            ))}
          </div>
          <h5 className="mt-4">Select Time</h5>
          <div className="d-flex gap-2">
            <Form.Group className="mb-3" controlId="startTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control type="time" value={startTime} onChange={(e) => handleTimeChange(e, 'start')} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="endTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control type="time" value={endTime} onChange={(e) => handleTimeChange(e, 'end')} />
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleConfirm}>Confirm</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

function Doctorpage() {
  const [modalShow, setModalShow] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [doctorid, setDoctorId] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [activeScheduleId, setActiveScheduleId] = useState(null);
  const [showAppointment, setShowAppointment] = useState(false);
  const [bookingData, setBookingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterSlot, setFilterSlot] = useState('');
  const [prescription, setPrescription] = useState({});
  const [showPrescriptionInput, setShowPrescriptionInput] = useState({});

  const dispatch = useDispatch();
  const { doctor, status } = useSelector((state) => state.doctor);

  const currentDateTime = new Date().toLocaleString();

  const handleDayChange = useCallback((event) => {
    const day = event.target.value;
    setSelectedDays((prevSelectedDays) =>
      event.target.checked ? [...prevSelectedDays, day] : prevSelectedDays.filter((d) => d !== day)
    );
  }, []);

  const handleTimeChange = useCallback((event, type) => {
    const value = event.target.value;
    if (type === 'start') {
      setStartTime(value);
    } else if (type === 'end') {
      setEndTime(value);
    }
  }, []);

  const fetchSchedule = useCallback(async () => {
    if (!doctorid) return;
    try {
      const response = await axios.get(`https://opzone-backend.onrender.com/schedule/${doctorid}`);
      console.log('Schedule fetched:', response.data);
      setSchedule(response.data);
      setFetchError(null);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      setFetchError('Error fetching schedule');
    }
  }, [doctorid]);

  const handleConfirm = useCallback(async () => {
    const body = { doctorid, selectedDays, startTime, endTime, currentDateTime };
    try {
      const response = await axios.post(`https://opzone-backend.onrender.com/schedule/${doctorid}`, body);
      console.log('Server response:', response.data);
      fetchSchedule();
    } catch (error) {
      console.error('Error:', error);
    }
    setModalShow(false);
  }, [doctorid, selectedDays, startTime, endTime, currentDateTime, fetchSchedule]);

  const handleStatus = useCallback(async (itemId) => {
    try {
      const newStatus = activeScheduleId === itemId ? "inactive" : "active";
      const response = await axios.post(`https://opzone-backend.onrender.com/activateschedule/${itemId}`, { scheduleStatus: newStatus, doctorid });
      console.log('Updated status:', response.data);
      fetchSchedule();
      setActiveScheduleId(newStatus === 'active' ? itemId : null);
      const inactiveSchedules = schedule.filter(item => item._id !== itemId);
      for (const scheduleItem of inactiveSchedules) {
        await axios.post(`https://opzone-backend.onrender.com/activateschedule/${scheduleItem._id}`, { scheduleStatus: 'inactive', doctorid });
      }
      fetchSchedule();
    } catch (error) {
      console.error('Error updating schedule status:', error);
    }
  }, [activeScheduleId, fetchSchedule, schedule, doctorid]);

  const handleAppointment = () => {
    setShowAppointment(true);
  };

  const doctorID = localStorage.getItem('userId');
  const fetchBookings = useCallback(async () => {
    try {
      const response = await axios.get(`https://opzone-backend.onrender.com/bookappointment/${doctorID}`);
      setBookingData(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  }, [doctorID]);

  const addPrescription = async (e, appointmentId) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://opzone-backend.onrender.com/bookings/${appointmentId}`, {
        prescription: prescription[appointmentId]
      });
      console.log('Updated booking:', response.data);
      fetchBookings();
      setShowPrescriptionInput(prevState => ({
        ...prevState,
        [appointmentId]: false
      }));
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const filteredData = bookingData.filter(item => item.appointmentDate === filterDate && item.timeSlot === filterSlot);
    setFilteredData(filteredData);
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDoctor());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (doctor.length > 0) {
      const firstDoctorId = doctor[0]?.logindetail?._id;
      if (firstDoctorId) {
        setDoctorId(firstDoctorId);
        fetchSchedule();
      }
    }
  }, [doctor, fetchSchedule]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDoctor());
    }
    if (doctor.length > 0) {
      const firstDoctorId = doctor[0]?.logindetail?._id;
      if (firstDoctorId && doctorid !== firstDoctorId) {
        setDoctorId(firstDoctorId);
        fetchSchedule();
      }
    }
  }, [doctor, doctorid, status, fetchSchedule, dispatch]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="#">OP Zone</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h2 className='text-center'>Welcome to Doctor Page</h2>

      <div>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          selectedDays={selectedDays}
          handleDayChange={handleDayChange}
          startTime={startTime}
          endTime={endTime}
          handleTimeChange={handleTimeChange}
          handleConfirm={handleConfirm}
        />
      </div>

      <div className='container'>
        <div className='d-flex justify-content-between flex-wrap mb-4 align-items-center'>
        <h3>Scheduled Appointments</h3>
        <Button variant="primary" onClick={() => setModalShow(true)}>Schedule OP Booking</Button>
        </div>
        {fetchError && <p>{fetchError}</p>}
        {schedule.length > 0 ? (
         <div className='d-flex gap-2 flex-wrap'>
            {schedule.map((item, index) => (
              <Card style={{width:'300px'}} key={index} className={`mb-3 ${item.scheduleStatus === 'active' ? 'bg-success text-light' : 'bg-light'}`}>
                <Card.Body>
                  <Card.Title>Days: {item.selectedDays.join(', ')}</Card.Title>
                  <Card.Text>
                    Time: {item.startTime} - {item.endTime}
                    <br />
                    Date: {item.currentDateTime}
                  </Card.Text>
                  <Button
                    onClick={() => handleStatus(item._id)}
                    variant={activeScheduleId === item._id ? 'danger' : 'outline-success'}
                  >
                    {activeScheduleId === item._id ? 'Deactivate' : 'Activate'}
                  </Button>
                </Card.Body>
              </Card>
            ))}
            </div>
         
        ) : (
          <p>No appointments scheduled.</p>
        )}
      </div>

<div className='container'>
      <div className='d-flex justify-content-between  align-items-center'>
          <h3>Appointments</h3>
          <Button variant="primary" onClick={handleAppointment}>Show Appointments</Button>
          </div>
      {showAppointment && (
        <div className=''>
          
          <Form onSubmit={handleFilter} className="d-flex align-items-end gap-2  mb-3">
            <Form.Group controlId="filterDate" className="me-2">
              <Form.Label>Filter by Date:</Form.Label>
              <Form.Control
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="filterSlot">
              <Form.Label>Filter by Slot:</Form.Label>
              <Form.Select
      name='timeSlot'
      aria-label='Default select example'
      onChange={(e) => setFilterSlot(e.target.value)}
    >
      <option disabled selected value="">Select Slot</option>
      <option value='9:00-10:30'>Slot-1:(9:00-10:30)</option>
      <option value='11:00-12:30'>Slot-2(11:00-12:30)</option>
      <option value='13:30-15:30'>Slot-3(13:30-15:30)</option>
      <option value='16:00-17:30'>Slot-4(16:00-17:30)</option>
    </Form.Select>
            </Form.Group>
            <Button type="submit" className="mt-3">Filter</Button>
          </Form>
          {filteredData.length > 0 ? (
            <div className='d-flex gap-4 flex-wrap'>
              {filteredData.map((item, index) => (
                <div key={index}>
                  <Card style={{width:'300px'}} className='mb-3'>
                    <Card.Body>
                      <Card.Title>Token: <b className='text-danger'>{item.token} </b> </Card.Title>
                      <Card.Text>
                      Patient: <b>{item.patientName}</b> 
                      <br />
                        Appointment Date: {item.appointmentDate}
                        <br />
                        Time Slot: {item.timeSlot}
                        <br />
                        Prescription: {item.prescription?item.prescription:"no priscription"}
                        <br />
                        health issue: {item.healthissue}
                      </Card.Text>
                      <Form onSubmit={(e) => addPrescription(e, item._id)}>
                        {showPrescriptionInput[item._id] ? (
                          <>
                            <Form.Control
                              type="text"
                              value={prescription[item._id] || ''}
                              onChange={(e) => setPrescription({
                                ...prescription,
                                [item._id]: e.target.value
                              })}
                            />
                            <Button type="submit">Submit</Button>
                          </>
                        ) : (
                          <Button onClick={() => setShowPrescriptionInput({
                            ...showPrescriptionInput,
                            [item._id]: true
                          })}>Add Prescription</Button>
                        )}
                      </Form>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <p>No bookings available.</p>
          )}
        </div>
      )}
</div>
     
    </div>
  );
}

export default Doctorpage;
