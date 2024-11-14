import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Club } from "../interfaces/clubInterface/clubInterface";
import { ErrorPayload } from "../interfaces/interfaces";

interface clubState {
    club: Club | null;
    isLoading: boolean;
    error: string | null;

}

const initialState : clubState = {
    club: null,
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
        console.log(data);
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
    reducers: {},
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
            })
            

            }
    }
        
);

export default clubSlice.reducer;