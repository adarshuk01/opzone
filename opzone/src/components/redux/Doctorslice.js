import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch userId from localStorage inside the async thunk
export const fetchDoctor = createAsyncThunk('doctor/fetchDoctor', async () => {
  const superId = localStorage.getItem('userId'); // Fetch inside the thunk
  try {
    const response = await axios.get(`https://opzone-backend.onrender.com/getdoctor/${superId}`);
    return response.data; // Ensure this matches the structure you expect
  } catch (error) {
    throw Error('Failed to fetch doctors');
  }
});

// Create the slice
const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    doctor: [], // Ensure the state shape matches this
    status: 'idle',
    error: null,
  },
  reducers: {
    // Add reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDoctor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctor = action.payload; // Ensure payload structure matches
      })
      .addCase(fetchDoctor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch doctors';
      });
  },
});

// Export the reducer
export default doctorSlice.reducer;
