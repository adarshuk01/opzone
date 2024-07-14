import { configureStore } from '@reduxjs/toolkit';
import opstaffReducer from './OpstaffSlice';
import doctorReducer from './redux/Doctorslice';

const store = configureStore({
  reducer: {
    opstaff: opstaffReducer,
    doctor: doctorReducer
  }
});

export default store;

