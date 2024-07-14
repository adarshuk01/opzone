// OpstaffSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk
export const fetchopstaff = createAsyncThunk('projects/fetchopstaff', async () => {
  const response = await axios.get('http://localhost:8000/gethospital');
  return response.data; // Ensure this matches the structure you expect
});

// Create the slice
const opstaffSlice = createSlice({
  name: 'opstaff',
  initialState: {
    opstaff: [], // Make sure the state shape matches this
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchopstaff.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchopstaff.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.opstaff = action.payload; // Ensure payload structure matches
      })
      .addCase(fetchopstaff.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

// Export the reducer
export default opstaffSlice.reducer;
