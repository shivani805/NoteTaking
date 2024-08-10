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
    editNote: (state, action) => {
      console.log(action.payload, 'ssks');
      const index = state.notes.findIndex(sta => sta.id === action.payload.id);
      state.notes[index].title = action.payload.title;
      state.notes[index].description = action.payload.description;
      state.notes[index].reminder = action.payload.reminder;

      console.log(state.notes[index], 'red');
      return state;
    },
    openAppFromNotification: (state, action) => {
      const idx = state.notes.findIndex(not => not.id === action.payload);
      // navigation.navigate('NoteDetails', {id: notification?.id});
      return state;
    },
  },
});

export const {addNotes, deleteNote, editNote, openAppFromNotification} =
  reduxSlice.actions;
export default reduxSlice.reducer;
