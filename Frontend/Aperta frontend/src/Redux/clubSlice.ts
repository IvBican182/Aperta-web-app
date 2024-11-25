import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Club } from "../interfaces/clubInterface/clubInterface";
import { ErrorPayload } from "../interfaces/interfaces";

interface clubState {
    club: Club | null;
    isLoading: boolean;
    error: string | null;

}

const initialState : clubState = {
    club: JSON.parse(localStorage.getItem("club") || "null"), 
    isLoading: false,
    error: null
};

interface ClubResponse {
    club: any;
    
};

interface UpdateBillingPayload {
    clubId: number;
    
}

export const getSingleClub = createAsyncThunk<ClubResponse, number | null>("club/getClub", async(clubId:number | null) => {
    try {
        const response = await fetch(`https://localhost:7147/api/Clubs/${clubId}`);
        const data = await response.json();
        console.log("club fetched: " + data);
        return data;
    } catch (error) {
        throw new Error("failed to fetch a club");

    }
});

export const updateClubBilling = createAsyncThunk<UpdateBillingPayload, UpdateBillingPayload>("club/updateBilling", async({ clubId }) => {
    try {
        const response = await fetch(`https://localhost:7147/api/Clubs/${clubId}/billingInfo`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( true )
        });
        const data = await response.json();
        return data;
    } catch(error) {
        throw new Error("failed to update billing info");
    }

});

export const clubSlice = createSlice({
    name: "club",
    initialState,
    reducers: {
        clearClubState: (state) => {
            state.club = null;
            localStorage.removeItem("club");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSingleClub.rejected, (state, action) => {
                state.club = null;
                state.isLoading = false;
                const errorPayload = action.payload as ErrorPayload;
                state.error = errorPayload?.message || action.error.message || 'Failed to sign up';
            })
            .addCase(getSingleClub.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleClub.fulfilled, (state:any, action) => {
                state.club = action.payload
                localStorage.setItem("club", JSON.stringify(state.club));
            })
            .addCase("auth/logout", (state) => { // Clear club state on logout
                state.club = null;
                state.isLoading = false;
                state.error = null;
                localStorage.removeItem("club");
            });
            

            }
    }
        
);

export default clubSlice.reducer;