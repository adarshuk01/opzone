const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const login=require('./modals/login')
const server = express();
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const hospitaldel=require('./modals/Hospitaldel')
const multer = require('multer');
const path = require('path');
const doctordel=require('./modals/Doctordetails')
const doctorShedule=require('./modals/DoctorShedule')
const patientdel=require('./modals/Patientreg')
const bookOp=require('./modals/BookAppointment')
// const { MongoClient, ObjectId } = require('mongodb');
const { ObjectId } = require('bson');
const { log } = require('console');


mongoose.connect('mongodb://localhost:27017/opzone');

server.use(cors({
    origin: "http://localhost:3000"
}));

server.use(express.json());


server.listen(process.env.PORT || 8000, () => {
    console.log("Server is running on port 8000");
});

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const upload = multer({ storage: storage });

const multipleUpload = upload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
    { name: 'certificate', maxCount: 1 },
    { name: 'planpic', maxCount: 1 }
]);


// login
server.post('/login',(req,res)=>{
const {username,password}=req.body
login.login.findOne({username}).then(user=>{
if(user){
bcrypt.compare(password,user.password,(error,response)=>{
    if(response){
        const token=jwt.sign({username:user.username,role:user.role},"jsontoken",{
            expiresIn:"1d"
        })
        return res.json({status:"Success",id:user._id, role:user.role,username:user.username,token:token})
    }else{
        return res.json({status:"Password is incorrect"})
        
    }
})
}else{
return res.json({status:"user not exist"})
}
})

})

// Register Hospital  Details

server.post('/hospitaldetails',multipleUpload,async(req,res)=>{
  const {id,staffname,dateofbirth,gender,hospitalname,city,place,address,email,username,password}=req.body
  const staffpic = req.files['photo'] ? req.files['photo'][0].filename : null;
  const profilepic = req.files['profile'] ? req.files['profile'][0].filename : null;
  const role="opstaff"
  console.log(id);
  console.log(staffpic);
  console.log(profilepic);
  console.log(role);
  try {
    const existingUser = await login.login.findOne({ username });
    if (existingUser) {
        return res.json({
            status: "user already exists"
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const commonData = await login.login.create({
        username, password: hashedPassword,id,role,email
    });
    await hospitaldel.hospital.create({
        logindetail: commonData._id, id,staffname,staffpic,dateofbirth,gender,hospitalname,city,place,address,email,profilepic     
    });
    return res.json({
        status: "Register Success"
    });
} catch (error) {
    console.log(error.message);
    res.status(500).json("error occurred");
}
})

// get hospital details
server.get('/gethospital', async (req, res) => {
    try {
      const hospitals = await hospitaldel.hospital.find({}).populate('logindetail');
  
      if (hospitals.length > 0) {
        return res.json(hospitals);
      } else {
        return res.status(404).json({ message: "No hospital data available" });
      }
    } catch (error) {
      console.error("Error fetching hospital details:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });




  // Register doctor  Details

server.post('/doctordetails',multipleUpload,async(req,res)=>{
    const {id,fullname,dateofbirth,gender,hospitalname,Qualification,institute,Specialization,exp,email,username,password}=req.body
    const photo = req.files['photo'] ? req.files['photo'][0].filename : null;
    const certificate = req.files['certificate'] ? req.files['certificate'][0].filename : null;
    const role="doctor"
    // console.log(id);
    // console.log(photo);
    // console.log(certificate);
    // console.log(role);
    console.log(Specialization);
    try {
      const existingUser = await login.login.findOne({ username });
      if (existingUser) {
          return res.json({
              status: "user already exists"
          });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const commonData = await login.login.create({
          username, password: hashedPassword,id,role,email
      });
      await doctordel.doctor.create({
          logindetail: commonData._id, id,fullname,dateofbirth,gender,hospitalname,Qualification,institute,Specialization,exp,email,certificate,photo  
      });
      return res.json({
          status: "Register Success"
      });
  } catch (error) {
      console.log(error.message);
      res.status(500).json("error occurred");
  }
  })

// get doctor details by id
  server.get('/getdoctor/:id', async (req, res) => {
    try {
      const id = req.params.id;
  
      // Validate if id is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ObjectId' });
      }
  
      const objectId = new ObjectId(id);
  
      // console.log(objectId); // Log to verify the objectId
  
      // Use the objectId to find doctors
      const doctors = await doctordel.doctor.find({ logindetail: objectId }).populate('logindetail');
  
      if (doctors.length > 0) {
        return res.json(doctors);
      } else {
        return res.status(404).json({ message: 'No doctor data available' });
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });


  server.get(`/getdoctorhospital/:hospitalname`, async (req, res) => {
    try {
      const { hospitalname } = req.params;
      console.log(hospitalname); // Log to verify the hospitalname
  
      // Use the hospitalname to find doctors
      const doctors = await doctordel.doctor.find({hospitalname:hospitalname  }).populate('logindetail');
  
      if (doctors.length > 0) {
        return res.json(doctors);
      } else {
        return res.status(404).json({ message: 'No doctor data available' });
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  

// Register doctor schedule

  server.post('/schedule/:id',async(req,res)=>{
    const id=req.params
    // console.log(id);
    const {selectedDays,startTime,endTime,currentDateTime,doctorid,scheduleStatus}=req.body
    console.log(selectedDays);
try {
    await doctorShedule.schedule.create({
       doctorid,selectedDays,startTime,endTime,currentDateTime,
    })
    return res.json({
        status: "status ok"
    });
} catch (error) {
    console.log(error.message);
        res.status(500).json("error occurred");
}
  })


// get Schedule

  server.get('/schedule/:id', async (req, res) => {
    const { id } = req.params;
  
    // Validate if id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }
  
    try {
      const objectId = new ObjectId(id);
      console.log(objectId);
  
      const schedule = await doctorShedule.schedule.find({ doctorid: objectId });
  
      if (!schedule) {
        return res.status(404).json({ error: 'Schedule not found' });
      }
  
      return res.json(schedule);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


//   update schedule 

server.post('/activateschedule/:id', async (req, res) => {
  const { id } = req.params;
  const { scheduleStatus, doctorid } = req.body;

  // console.log(id);
  // console.log(scheduleStatus);
  // console.log(doctorid);

  if (!ObjectId.isValid(id) || !ObjectId.isValid(doctorid)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const filter = { _id: new ObjectId(id) };
    const update = {
      $set: { scheduleStatus }
    };

    const result = await doctorShedule.schedule.updateOne(filter, update);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    // If the schedule is being activated, deactivate all other schedules of the same doctor
    if (scheduleStatus === 'active') {
      const deactivateFilter = {
        _id: { $ne: new ObjectId(id) },
        doctorid: new ObjectId(doctorid)
      };
      const deactivateUpdate = {
        $set: { scheduleStatus: 'inactive' }
      };
      await doctorShedule.schedule.updateMany(deactivateFilter, deactivateUpdate);
    }

    res.json({
      status: 'success',
      modifiedCount: result.modifiedCount,
      scheduleStatus
    });
  } catch (error) {
    console.error('Error updating Schedule:', error.message);
    res.status(500).json({ error: 'An error occurred while updating the schedule' });
  }
});

  
// Register Patient
server.post('/patientreg', async (req, res) => {
  const { id, fullname, dateofbirth, gender, phoneno, address, place, city, username, password, email } = req.body;
  // console.log(fullname);
  // console.log(dateofbirth);
  // console.log(gender);
  const role = "patient";
  try {
    const existingUser = await login.login.findOne({ username });
    if (existingUser) {
      return res.json({ status: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const commonData = await login.login.create({
      username, password: hashedPassword, id, role, email
    });
    await patientdel.patient.create({
      logindetail: commonData._id, id, fullname, dateofbirth, gender, phoneno, address, place, city, email
    });
    return res.json({ status: "Register Success", details:commonData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("error occurred");
  }
});

// get Active  doctor details
server.get('/activedoctor',async(req,res)=>{
   const {Specialization,city,gender}=req.body
  //  console.log(Specialization);
   try {
   const doctorfilter=await doctordel.doctor.find()
   return res.json({doctorfilter});
   } catch (error) {
    // console.log(error.message);
    // res.status(500).json("error occurred");
   }
})


// get Active  schedule details
server.get('/activeschedule',async(req,res)=>{
  const {Specialization,city,gender}=req.body
  // console.log(Specialization);
  try {
  const schedulefilter=await doctorShedule.schedule.find({scheduleStatus:"active"})
  return res.json({schedulefilter});
  } catch (error) {
    // console.log(error.message);
    // res.status(500).json("error occurred");
  }
})

// server.get('/activedoctor', async (req, res) => {
//   const { Specialization, city, gender } = req.body;
//   console.log(Specialization);
//   console.log(city); // For debugging purposes

//   try {
//     // Assuming 'doctordel' is your mongoose model for doctors
//     const doctorfilter = await doctordel.doctor.find({
//       Specialization: Specialization,
//       hospitalname: city,
//       gender: gender
//     });

//     return res.json({ doctorfilter });
//   } catch (error) {
//     console.error("Error fetching doctors:", error);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });



// register Booking and Generate token

let dailyTokenCounter = {};
const getMonthAbbreviation = (dateString) => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const date = new Date(dateString);
    return months[date.getUTCMonth()];
};

const generateToken = (doctorid, timeSlot, dateString) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const monthAbbreviation = getMonthAbbreviation(dateString);
    const key = `${doctorid}-${timeSlot}-${day}${monthAbbreviation}`;
    if (!dailyTokenCounter[key]) {
        dailyTokenCounter[key] = 1;
    }
    const tokenNumber = `${day}${monthAbbreviation}-${String(dailyTokenCounter[key]).padStart(2, '0')}`;
    dailyTokenCounter[key]++;
    return tokenNumber;
};

// generate tokens
server.post('/bookappointment', async (req, res) => {
    const { patientid, doctorid, patientName, doctorName, appointmentDate, timeSlot, healthissue, age, email, phone, gender } = req.body;
    const token = generateToken(doctorid, timeSlot, appointmentDate);
    const existingUser = await bookOp.book.findOne({ timeSlot,patientName,appointmentDate,age });

    try {
      if (existingUser) {
        return res.json({ status: "Patient already booked" });
      }else{
        const booking = await bookOp.book.create({
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
          gender,
          token,
          status: 'Booked'
      });
      res.status(201).json(booking);
      }
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json("An error occurred");
    }
});


// Get bookings by doctorID and patient id
server.get('/bookappointment/:id/:id2', async (req, res) => {
  const { id, id2 } = req.params;
  const patid = new ObjectId(id);
  const docid = new ObjectId(id2);

  try {
    // Assuming bookOp.book is your MongoDB collection
    const appointments = await bookOp.book.find({ patientid: patid, doctorid: docid });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching appointments' });
  }
});



// get booking details by doctorID
server.get('/bookappointment/:id', async (req, res) => {
  const { id } = req.params;
  const docid = new ObjectId(id);
console.log(docid);
  try {
    // Assuming bookOp.book is your MongoDB collection
    const appointments = await bookOp.book.find({  doctorid: docid });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching appointments' });
  }
});



// update to add prescription and status
server.put('/bookings/:id', async (req, res) => {
  const { id } = req.params;
  const docid = new ObjectId(id);
  const { prescription } = req.body;

  console.log('Prescription:', prescription);
  console.log('Booking ID:', docid);

  try {
      const updatedBooking = await bookOp.book.findByIdAndUpdate(
        docid,
          { status: 'Expired', prescription },
          { new: true }
      );
      if (!updatedBooking) {
          return res.status(404).json({ error: 'Booking not found' });
      }
      res.status(200).json(updatedBooking);
  } catch (error) {
      console.error('Error updating booking:', error.message);
      res.status(500).json({ error: 'An error occurred while updating the booking' });
  }
});







