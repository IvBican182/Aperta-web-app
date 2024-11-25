import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SignUpFormData } from "../interfaces/interfaces";
import { getSingleClub } from "./clubSlice";

interface AuthState {
    user: any | null;
    token: string | null;
    role: string | null;
    isLoading: boolean;
    error: string | null;
};

interface AuthResponse {
    user: any;
    token: string;
    role: string;
};

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || null,
    isLoading: false,
    error: null,
};

interface ErrorPayload {
    message: string;
}

export const userSignUp = createAsyncThunk<AuthResponse, SignUpFormData>("auth/signUp", async(formData,thunkAPI) => {
    try {
        const response = await fetch("https://localhost:7147/api/auth/auth/registerUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
       });

       const data = await response.json();

       if (!response.ok) {
        throw new Error(data.message || "Failed to sign up");
       }

       console.log(data);
       return data;
    } 
    catch (error: any){
        return thunkAPI.rejectWithValue({
            message: error.message || "An unexpected error occurred during registration",
          });
    }
});

export const userLogin = createAsyncThunk<AuthResponse, any>("auth/login", async(formData,thunkAPI) => {
    try {
        const response = await fetch("https://localhost:7147/api/auth/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
       });

       const data = await response.json();

       if (!response.ok) {
        throw new Error(data.message || "Failed to login");
       }

       console.log(data);
       return data;
    } 
    catch (error: any){
        return thunkAPI.rejectWithValue({
            message: error.message || "An unexpected error occurred during login",
          });
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("club");
          },
    },
    extraReducers(builder) {
        builder
        .addCase(userSignUp.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
        .addCase(userSignUp.fulfilled, ( state, action: PayloadAction<{ user: any, token: string, role: string }>) => {
            const { user, token, role } = action.payload;
            state.isLoading = false;
            state.user = user;
            state.token = token;
            state.role = role;

            // Save user and token to local storage
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
        })
        .addCase(userSignUp.rejected, (state, action) => {
            state.isLoading = false;
            const errorPayload = action.payload as ErrorPayload;
            state.error = errorPayload?.message || action.error.message || 'Failed to sign up';
          })
        .addCase(userLogin.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(userLogin.fulfilled, (state, action) => {
            const { user, token, role } = action.payload;
            state.isLoading = false;
            state.user = user;
            state.token = token;
            state.role = role;

            // Save user data to local storage
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            
        })
        .addCase(userLogin.rejected, (state, action) => {
            state.isLoading = false;
            const errorPayload = action.payload as ErrorPayload;
            state.error = errorPayload?.message || action.error.message || 'Failed to sign up';
          });
        
    }

});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
