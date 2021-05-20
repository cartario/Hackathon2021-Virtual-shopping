import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hello: '',
  currentProductId: '',
  currentSelectedIdInCart: ''
}

const slice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setHello: (state, action)=>{
      state.hello = action.payload
    },
    setCurrentProductId: (state, action) => {
      state.currentProductId = action.payload
    },
    setCurrentSelectedIdInCart: (state, action) => {
      state.currentSelectedIdInCart = action.payload
    }
  }
});

export const {setHello, setCurrentProductId, setCurrentSelectedIdInCart} = slice.actions;

export default slice.reducer;