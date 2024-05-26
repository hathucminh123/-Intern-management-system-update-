import { createSlice } from '@reduxjs/toolkit';
import { getIntern } from '../api';
import {
  
  createAsyncThunk,
  
} from '@reduxjs/toolkit';


const initialState = {
  rooms: [
    { id: 1, name: 'room họp 1', description: 'Description 1' },
    { id: 2, name: 'room họp 2', description: 'Description 2' },
    { id: 3, name: 'room họp 3', description: 'Description 3' },
  ],
  user: {},
  selectedRoomId: null,
  messages: {},
  isAddRoomVisible: false,
  classListLoading: true,
};

const TYPE_PREFIX = 'classes';

const getListClass = createAsyncThunk(
  `${TYPE_PREFIX}`,
  async () => {
    const result = await getIntern();
    console.log('tam ne',result);

    return result;
  },
);


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
  extraReducers: (builder) => {
    builder.addCase(getListClass.pending, (state) => ({
      ...state,
      classListLoading: true
    }));
    builder.addCase(getListClass.fulfilled, (state, { payload }) => ({
      ...state,
      user: payload,
      classListLoading: false
    }));
    builder.addCase(getListClass.rejected, (state) => ({
      ...state,
      classListLoading: false
    }));

  }
});

export const { addRoom, setSelectedRoomId, addMessage, setIsAddRoomVisible } = roomSlice.actions;
export { getListClass }
export default roomSlice.reducer;
