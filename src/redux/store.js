import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './roomSlice.js';

export default configureStore({
  reducer: {
    rooms: roomReducer,
  },
});
