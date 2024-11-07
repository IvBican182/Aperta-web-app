import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userSliceReducer from "./userSlice";

//configuring redux store
const store = configureStore({
    reducer: {
      users: userSliceReducer
    
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;