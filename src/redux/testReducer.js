import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hello: ''
}

const slice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setHello: (state, action)=>{
      state.hello = action.payload
    }
  }
});

export const {setHello} = slice.actions;

export default slice.reducer;