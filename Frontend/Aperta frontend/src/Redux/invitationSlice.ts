import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


interface InviteState {
    email: string;
    clubId: number | null;
    roleId: string | null;
    token: string | null;
    isUsed: boolean;
    isLoading: boolean;
    error: string | null;
    groupId: number | null;
    successMessage: string | null;
}

const initialState: InviteState = {
    email: '',
    clubId: null,
    roleId: null,
    token: null,
    isUsed: false,
    isLoading: false,
    error: null,
    groupId: null,
    successMessage: null,
};

export const verifyInviteToken = createAsyncThunk<InviteState, string>(
    "invite/verifyInviteToken",
    async (token, thunkAPI) => {
        try {
            const response = await fetch(`https://localhost:7147/api/auth/verify-invite-token?token=${token}`);
            if (!response.ok) {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData.message || "Token verification failed");
            }
            const data = await response.json();
            return data; // Contains email, clubId, roleId, isUsed
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Error verifying token");
        }
    }
);


export const sendUserInvitation = createAsyncThunk("invite/sendUserInvitation",
    async ({ email, clubId, groupId, roleId }: { email: string; clubId: number; groupId: number, roleId: string }, { rejectWithValue }) => {
        
            const response = await fetch("https://localhost:7147/api/SendInvitation/send-invite", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, clubId, groupId, roleId } ),
            });

            const responseText = await response.text(); 

            if (!response.ok) {
                return rejectWithValue(responseText);
            }

            try {
                return JSON.parse(responseText); // Try parsing as JSON
            } catch (error: any) {
                return { message: responseText}; // Fallback for plain text responses
                //return rejectWithValue(error.message || "Failed to send invitation");
            }

    
    }
)

const invitationSlice = createSlice({
    name: "invitation",
    initialState,
    reducers: {
        resetInviteState: (state) => {
            state.email = '';
            state.clubId = null;
            state.roleId = null;
            state.token = null;
            state.isUsed = false;
            state.isLoading = false;
            state.error = null;
            state.groupId = null;
            state.successMessage = null;
            
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyInviteToken.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(verifyInviteToken.fulfilled, (state: InviteState, action: PayloadAction<InviteState>) => {
                state.isLoading = false;
                state.email = action.payload.email;
                state.clubId = action.payload.clubId;
                state.groupId = action.payload.groupId;
                state.roleId = action.payload.roleId;
                state.token = action.payload.token;
                state.isUsed = action.payload.isUsed;
            })
            .addCase(verifyInviteToken.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(sendUserInvitation.fulfilled, (state) => {
                state.isLoading = false;
                state.successMessage = "Invitation sent successfully!";
            })
    },
});

export const { resetInviteState } = invitationSlice.actions;
export default invitationSlice.reducer;