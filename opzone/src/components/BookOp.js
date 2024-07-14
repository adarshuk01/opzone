import React, { useEffect, useState } from 'react';
import Usernavbar from './Usernavbar';
import Footer from './Footer';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function BookOp() {
    const [doctordata, setDoctorData] = useState({});
    const [scheduledata, setScheduleData] = useState({});
    const [bookingdata, setBookingData] = useState([]);
    const [patientName, setPatientName] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [healthissue, setHealthIssue] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [confirmation, setConfirmation] = useState(null);
    


    const doctorid = localStorage.getItem('bookedDoctorId');
    const patientid = localStorage.getItem('userId');

    const navigate = useNavigate();

    const opbooking = async (e) => {
        e.preventDefault();
        const doctorName = doctordata.fullname;
        const body = {
            patientid,
            doctorid,
            patientName,
            doctorName,
            appointmentDate,
            timeSlot,
            healthissue,
            age,
            email,
            phone,
            gender
        };

        try {
            const response = await axios.post('https://opzone-backend.onrender.com/bookappointment', body);
            alert('Appointment booked successfully');
            
            setConfirmation(response.data);
            window.location.reload();
            // Clear form fields or reset relevant state variables here
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Error booking appointment. Please try again later.');
            navigate('/login')
        }
    };

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`https://opzone-backend.onrender.com/bookappointment/${patientid}/${doctorid}`);
            setBookingData(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`https://opzone-backend.onrender.com/getdoctor/${doctorid}`);
                setDoctorData(response.data[0]);
            } catch (error) {
                console.error('Error fetching doctor details:', error);
            }
        };

        const fetchSchedule = async () => {
            try {
                const response = await axios.get(`https://opzone-backend.onrender.com/schedule/${doctorid}`);
                const activeSchedules = response.data.filter(schedule => schedule.scheduleStatus === 'active');
                setScheduleData(activeSchedules[0]);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };

        fetchDoctors();
        fetchSchedule();
        fetchBookings();
    }, [doctorid, patientid]);

    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    // Calculate the date 5 days from today
    const fiveDaysFromToday = new Date(today);
    fiveDaysFromToday.setDate(fiveDaysFromToday.getDate() + 5);
    const formattedFiveDaysFromToday = fiveDaysFromToday.toISOString().split('T')[0];

    console.log(bookingdata);

    return (
        <div className=''>
            <Usernavbar />
            <div className='booking-bg sticky-top' style={{ width: '100%', height: '250px', zIndex: '-1000',marginTop:'-55px' }}></div>
            <div className='bg-white d-flex gap-4 flex-wrap justify-content-center align-items-center'>
                <div className=''>
                    <div className='d-flex p-4 bg-white rounded justify-content-left gap-2 flex-wrap'>
                        <div className='d-flex gap-2 align-items-center bg-light border p-2'>
                            <img
                                className='profile-img shadow border bg-light rounded'
                                src={`http://localhost:8000/uploads/${doctordata.photo}`}
                                style={{ width: '170px', height: '170px', marginTop: '-80px' }}
                                alt='Doctor'
                            />
                            <div>
                                <h4 className='p-0 m-0 text-danger'>{doctordata.fullname}</h4>
                                <p className='p-0 m-0 text-muted'>
                                    <b> {doctordata.Specialization}</b>
                                </p>
                                <p className='p-0 m-0'>
                                    Working at: <b className='text-danger'>{doctordata.hospitalname}</b>
                                </p>
                                <p className='p-0 m-0'>
                                    <span>
                                        {' '}
                                        Email: <b className='text-danger'>{doctordata.email}</b>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className='bg-light border rounded p-4 '>
                            <h4>OP Schedule</h4>
                            <p className='p-0 m-0'>
                                Timing: <b className='text-danger'>{scheduledata.startTime}-{scheduledata.endTime}</b>{' '}
                            </p>
                            <p className='p-0 m-0'>
                                Available Days :{' '}
                                <b className='text-danger'>
                                    {scheduledata.selectedDays && scheduledata.selectedDays.join(' ')}
                                </b>
                            </p>
                        </div>
                    </div>
                    <div className='bg-white d-flex gap-3 flex-wrap justify-content-left '>
                        <Form
                            onSubmit={opbooking}
                            className=' border p-2 bg-light m-3 mb-4 p-4'
                            style={{ maxWidth: '750px' }}
                        >
                            <h3>Book Appointment</h3>
                            <div className='row'>
                                <Form.Group className='col-12 col-md-6 mb-3' controlId='formGroupName'>
                                    <Form.Label>Patient Name</Form.Label>
                                    <Form.Control
                                        name='fullname'
                                        type='text'
                                        placeholder='Enter name'
                                        onChange={(e) => setPatientName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className='col-12 col-md-6 mb-3' controlId='formGroupEmail'>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        name='email'
                                        type='email'
                                        placeholder='Enter email'
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                            </div>
                            <div className='row'>
                                <Form.Group className='col-12 col-md-6 mb-3' controlId='formGroupPhone'>
                                    <Form.Label>Phone number</Form.Label>
                                    <Form.Control
                                        name='phoneno'
                                        type='tel'
                                        placeholder='Enter phone no.'
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className='col-12 col-md-3 mb-3' controlId='formGroupDob'>
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        name='dateofbirth'
                                        type='number'
                                        placeholder='Enter Age'
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className='col-12 col-md-3 mb-3' controlId='formGroupGender'>
                                    <Form.Label> Gender</Form.Label>
                                    <Form.Select
                                        name='gender'
                                        aria-label='Default select example'
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option disabled selected>Select Gender</option>
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className='row'>
                                <Form.Group className='col-12 col-md-6 mb-3' controlId='exampleForm.ControlTextarea1'>
                                    <Form.Label>Health Issue</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        rows={3}
                                        placeholder='Enter Health issue'
                                        onChange={(e) => setHealthIssue(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className='col-12 col-md-3 mb-3' controlId='formGroupPlace'>
                                <Form.Label>Select Booking Date</Form.Label>
                                <Form.Control
                                    name='place'
                                    type='date'
                                    placeholder='Enter Place'
                                    min={formattedToday}
                                    max={formattedFiveDaysFromToday}
                                    onChange={(e) => setAppointmentDate(e.target.value)}
                                />
                            </Form.Group>
                                <Form.Group className='col-12 col-md-3 mb-3' controlId='formGroupCity'>
                                    <Form.Label>Select Slot</Form.Label>
                                    <Form.Select
                                        name='city'
                                        aria-label='Default select example'
                                        onChange={(e) => setTimeSlot(e.target.value)}
                                    >
                                        <option disabled selected>Select Time slot</option>
                                        <option value='9:00-10:30'>Slot-1:(9:00-10:30)</option>
                                        <option value='11:00-12:30'>Slot-2(11:00-12:30)</option>
                                        <option value='13:30-15:30'>Slot-3(13:30-15:30)</option>
                                        <option value='16:00-17:30'>Slot-4(16:00-17:30)</option>

                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <Button variant='success' type='submit'>
                                Book
                            </Button>

                            {confirmation && (
                                <div className='mt-4'>
                                    <h4>Appointment Confirmed</h4>
                                    <p>Token Number: {confirmation.token}</p>
                                </div>
                            )}
                        </Form>
                        <div className='bookings bg-light p-3 m-2 border  rounded' style={{ maxWidth: '450px', height: 'fit-content' }}>
<h3>Your Bookings</h3>
{bookingdata.length > 0 ? (
    bookingdata.map((item, index) => (
        <div key={index}>
            <Card
bg={'light'}

text={'dark'}
style={{ width: '18rem' }}
className="mb-2 bg-white shadow"
>
<Card.Header className='bg-danger text-white'>Sheduled: <b>{item.appointmentDate}</b>  at <b> {item.timeSlot}</b></Card.Header>
<Card.Body>
<Card.Title style={{width:'fit-content'}} className='text-dark border bg-body-secondary rounded-2 border p-2 '> Token: <span className='text-danger '><b>{item.token}</b> </span>   </Card.Title>
<Card.Text>
<p className='p-0 m-0'>Patient Name: <span className='text-success'><b> {item.patientName}</b> </span></p>
<p className='p-0 m-0'>Doctor Name: <span className='text-success'><b>{item.doctorName}</b> </span></p>
<p className='p-0 m-0'>TimeSlot : <span className='text-success'><b> {item.timeSlot}</b> </span></p>
<p className='p-0 m-0'>Health issue : <span className='text-success'><b> {item.healthissue}</b> </span></p>
<p className='p-0 m-0'>
  Status : 
  <span className={item.status === "Booked" ? "text-primary" : "text-danger"}>
    <b>{item.status}</b>
  </span>
</p>
{item.prescription?<p className='p-2 bg-body-secondary rounded-2 border m-0'>Priscription/Medicine : <span className='d-flex justify-content-between'> <span className='text-success'><b> {item.prescription}</b> </span><i class="ri-file-copy-line"></i> </span> <a href=''><u>Check Availability</u> </a> </p>:" "
}

</Card.Text>
</Card.Body>
</Card>
        </div>
    ))
) : (
    <p className='text-danger'> <b>No bookings yet.</b> </p>
)}
</div>
                    </div>
                </div>


            </div>
         
        </div>
    );
}

export default BookOp;
