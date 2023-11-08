import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { constants } from "../Constants/apiAddress";
import axios from 'axios';

const initialState = {
    classes: {},
    specificClass: null,
    isLoading: false,
    error: null
}

export const getAllClasses = createAsyncThunk(
    'class/allClasses',
    async() => {
        try{
            const response = await axios.get(`${constants.DND_5E_API}classes/`);
            return response.data.results
        }
        catch(error) {
            throw rejectWithValue(error.response.results);
        }
    }
)

export const classSlice = createSlice({
    name: 'class',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getAllClasses.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(getAllClasses.fulfilled, (state, action) => {
            state.isLoading = false;
            state.classes = action.payload;
          })
          .addCase(getAllClasses.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
          });
      },
})

export default classSlice.reducer;