import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/interfaces";

//state interface
interface userState {
    users: any[];
    user: any;
    isLoading: boolean;
    error: string | null;
};

//initial state
const initialState : userState = {
    users: [],
    user: {},
    isLoading: false,
    error: null,

};


//thunk for fetching all users from database
export const fetchUsers = createAsyncThunk<User[]>("api/users", async() => {
    const response = await fetch("http://localhost:3050/api/users");
    const data = await response.json();
    console.log(data);
    //return all users
    return data.users;

});

//fetching a single user ftrom database by user ID 
export const fetchSingleUser = createAsyncThunk<any, number>("api/singleUser", async( userId:any ) => {
    const response = await fetch(`http://localhost:3050/api/profile/${userId}`);
    const userData = await response.json();
    console.log(userData);
    //return single user
    return userData.user;


});


//user slice
export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload //sets our users as an array in our state
        })
        .addCase(fetchSingleUser.fulfilled, (state, action) => {
            state.user = action.payload //sets fetched user to user state
        })
        
    }
});

export default userSlice.reducer;