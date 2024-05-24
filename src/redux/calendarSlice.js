import { createSlice } from '@reduxjs/toolkit';

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [],
    isAddEventVisible: false,
  },
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    setIsAddEventVisible: (state, action) => {
      state.isAddEventVisible = action.payload;
    },
  },
});

export const { addEvent, removeEvent, setIsAddEventVisible } = calendarSlice.actions;
export default calendarSlice.reducer;
