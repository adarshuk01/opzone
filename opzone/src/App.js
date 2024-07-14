import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
// import 'antd/dist/antd.css'; // Import Ant Design styles
import { Route, Routes } from 'react-router-dom';
import Adminpage from './components/Adminpage';
import Adddoctor from './components/Adddoctor';
import Opstaff from './components/Opstaff';
import Doctorpage from './components/Doctorpage';
import Home from './components/Home';
import Regispatient from './components/Regispatient';
import Userlogin from './components/Userlogin';
import Footer from './components/Footer';
import BookOp from './components/BookOp';
import OpstaffHome from './components/OpstaffHome';
import Appointments from './components/Appointments';

function App() {
  return (
    <div className="App">
      <div className="content">
        <Routes>
          <Route path='/admin' element={<Login />} ></Route>
          <Route path='/adminpage' element={<Adminpage />} ></Route>
          <Route path='/adddoctor' element={<Adddoctor />} ></Route>
          <Route path='/addopstaff' element={<Opstaff />} ></Route>
          <Route path='/doctorpage' element={<Doctorpage />} ></Route>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/register' element={<Regispatient />} ></Route>
          <Route path='/login' element={<Userlogin />} ></Route>
          <Route path='/bookop' element={<BookOp />} ></Route>
          <Route path='/opstaffhome' element={<OpstaffHome />} ></Route>
          <Route path='/doctorappointments' element={<Appointments />} ></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
