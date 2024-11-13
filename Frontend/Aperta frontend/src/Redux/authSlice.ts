import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SignUpFormData } from "../interfaces/interfaces";

interface AuthState {
    user: any | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
};

interface AuthResponse {
    user: any;
    token: string;
};

const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
};

interface ErrorPayload {
    message: string;
}

export const userSignUp = createAsyncThunk<AuthResponse, SignUpFormData>("auth/signUp", async(formData,thunkAPI) => {
    try {
        const response = await fetch("https://localhost:7147/api/RegisterAdminUser/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
       });
   
       const data = await response.json();
       return data;
    } 
    catch (error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
          },
    },
    extraReducers(builder) {
        builder
        .addCase(userSignUp.pending, (state) => {
            state.isLoading = true;
          })
        .addCase(userSignUp.fulfilled, ( state, action: PayloadAction<{ user: any, token: string }>) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
        .addCase(userSignUp.rejected, (state, action) => {
            state.isLoading = false;
            const errorPayload = action.payload as ErrorPayload;
            state.error = errorPayload?.message || action.error.message || 'Failed to sign up';
          })
        
    }

});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
