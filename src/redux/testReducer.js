import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hello: ''
}

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setHello: (state, action)=>{
      state.hello = action.payload
    }
  }
});

export const {setHello} = testSlice.actions;

export default testSlice.reducer;