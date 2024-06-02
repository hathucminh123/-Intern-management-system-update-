import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { gettest } from '../service/userService';



const TYPE_PREFIX = 'users';

const gettest1 = createAsyncThunk(
    `${TYPE_PREFIX}/test`,
    async () => {
      const result = await gettest();
      console.log('intern ne');
  
      return result;
    },
  );
  
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    test:{},
    interListLoading: true,
    testListLoading: true
    
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    
    builder.addCase(gettest1.pending, (state) => ({
        ...state,
        testListLoading: true
      }));
      builder.addCase(gettest1.fulfilled, (state, { payload }) => ({
        ...state,
        test: payload,
        testListLoading: false
      }));
      builder.addCase(gettest1.rejected, (state) => ({
        ...state,
        testListLoading: false
      }));

  }
});

export { gettest1 }
export default userSlice.reducer;