// doctorslice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk
export const fetchdoctor = createAsyncThunk('doctor/fetchdoctor', async () => {
  const response = await axios.get('https://opzone-backend.onrender.com/getdoctor');
  return response.data; // Ensure this matches the structure you expect
});

// Create the slice
const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    doctor: [], // Make sure the state shape matches this
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchdoctor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchdoctor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctor = action.payload; // Ensure payload structure matches
      })
      .addCase(fetchdoctor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch doctors';
      });
  }
});

// Export the reducer
export default doctorSlice.reducer;
