import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './roomSlice.js';
import calendarReducer from './calendarSlice.js';
import userReducer from './userSlice.js';


export default configureStore({
  reducer: {
    rooms: roomReducer,
    calendar: calendarReducer,
    user: userReducer
  },
});
