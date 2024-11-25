import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface groupState {
    groups: any[];
    group: any;
    groupsWithUsers: any[];
    isLoading: boolean;
    error: string | null;
};

const initialState : groupState = {
    groups: [],
    group: {},
    groupsWithUsers: [],
    isLoading: false,
    error: null,
};

export const getAllGroups = createAsyncThunk("admin/getAllGroups", async(clubId: number | null) => {
    const response = await fetch(`https://localhost:7147/api/Groups/getClubGroups/${clubId}`);
    const data = await response.json();
    console.log(data);
    return data;
})


export const createGroup = createAsyncThunk('admin/createGroup', async ({ groupName, id }: { groupName: string, id: number }) => {
    const response = await fetch('https://localhost:7147/api/Groups/createClubGroup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: groupName, clubId: id } ),
    });

    const data = await response.json();
    return data; // return the newly created group
});

export const getGroupsWithUsers = createAsyncThunk(
    "admin/getGroupsWithUsers",
    async (clubId: number | null, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://localhost:7147/api/Groups/get-groups-with-users/${clubId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch groups with users");
            }
            const data = await response.json();
            console.log(data);
            return data; // Return array of groups with users
        } catch (error: any) {
            console.error(error);
            return rejectWithValue(error.message);
        }
    }
);

const groupSlice = createSlice({
    name:"group",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createGroup.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createGroup.fulfilled, (state, action) => {
            state.isLoading = false;
            state.groups.push(action.payload); // add the new group to the list of groups
        })
        .addCase(createGroup.rejected, (state, action) => {
            state.isLoading = false;
            
        })
        .addCase(getAllGroups.fulfilled, (state,action) => {
            state.groups = action.payload
        })
        .addCase(getGroupsWithUsers.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getGroupsWithUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.groupsWithUsers = action.payload; // Populate groups with users
        })
        .addCase(getGroupsWithUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string; // Handle the error
        });
    }
});

export default groupSlice.reducer;