import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer
  }
});

export default store;
