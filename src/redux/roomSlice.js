import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [
    { id: 1, name: 'room họp 1', description: 'Description 1' },
    { id: 2, name: 'room họp 2', description: 'Description 2' },
    { id: 3, name: 'room họp 3', description: 'Description 3' },
  ],
  selectedRoomId: null,
  messages: {},
  isAddRoomVisible: false,
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    addRoom(state, action) {
      state.rooms.push(action.payload);
    },
    setSelectedRoomId(state, action) {
      state.selectedRoomId = action.payload;
    },
    addMessage(state, action) {
      const { roomId, message } = action.payload;
      if (!state.messages[roomId]) {
        state.messages[roomId] = [];
      }
      state.messages[roomId].push(message);
    },
    setIsAddRoomVisible(state, action) {
      state.isAddRoomVisible = action.payload;
    },
  },
});

export const { addRoom, setSelectedRoomId, addMessage, setIsAddRoomVisible } = roomSlice.actions;

export default roomSlice.reducer;
