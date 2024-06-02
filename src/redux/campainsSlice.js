import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getcampains } from '../service/campainsService';
import { Result } from 'antd';




const TYPE_PREFIX = 'campains';

const getCampains = createAsyncThunk(
    `${TYPE_PREFIX}`,
    async () => {
        const result = await getcampains();
        console.log("string" + result);

        return result;
    },
);

const campainsSlice = createSlice({
    name: 'campains',
    initialState: {
        campains: [],
        isAddEventVisible: false,

    },
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getCampains.pending, (state) => ({
            ...state,
            testListLoading: true
        }));
        builder.addCase(getCampains.fulfilled, (state, { payload }) => ({
            ...state,
            campains: payload,
            testListLoading: false
        }));
        builder.addCase(getCampains.rejected, (state) => ({
            ...state,
            testListLoading: false
        }));

    }
});

export { getCampains }
export default campainsSlice.reducer;
