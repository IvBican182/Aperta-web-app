import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userSliceReducer from "./userSlice";
import  invitationSliceReducer  from "./invitationSlice";
import  authSliceReducer  from "./authSlice";
import clubSliceReducer from "./clubSlice";
import groupSliceReducer from "./groupSlice";
import fetchClubMiddleware from './Middleware/fetchClubMiddleware';

//configuring redux store
const store = configureStore({
    reducer: {
      users: userSliceReducer,
      invitation: invitationSliceReducer,
      auth: authSliceReducer,
      club: clubSliceReducer,
      group: groupSliceReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(fetchClubMiddleware),
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;