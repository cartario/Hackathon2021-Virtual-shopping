import { configureStore } from '@reduxjs/toolkit'
import testReducer from './testReducer'
import cartReducer from './cartReducer'

export default configureStore({
  reducer: {
    test: testReducer,
    cart: cartReducer     
  },
})
