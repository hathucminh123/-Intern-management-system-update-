import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './roomSlice.js';
import calendarReducer from './calendarSlice.js';

export default configureStore({
  reducer: {
    rooms: roomReducer,
    calendar: calendarReducer,
  },
});
