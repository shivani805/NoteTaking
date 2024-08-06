import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  notes: [],
};

export const reduxSlice = createSlice({
  name: 'reduxSlice',
  initialState,
  reducers: {
    addNotes: (state, action) => {
      state.notes = [...state.notes, action.payload];
      return state;
    },
    deleteNote: (state, action) => {
      state.notes = action.payload;
      return state;
    },
  },
});

export const {addNotes, deleteNote} = reduxSlice.actions;
export default reduxSlice.reducer;
