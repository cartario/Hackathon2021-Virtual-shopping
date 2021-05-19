import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hello: '',
  currentProductId: ''
}

const slice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setHello: (state, action)=>{
      state.hello = action.payload
    },
    setCurrentProductId: (state, action)=>{
      state.currentProductId = action.payload
    }
  }
});

export const {setHello, setCurrentProductId} = slice.actions;

export default slice.reducer;