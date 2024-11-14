import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface groupState {
    groups: any[];
    group: any;
    isLoading: boolean;
    error: string | null;
};

const initialState : groupState = {
    groups: [],
    group: {},
    isLoading: false,
    error: null,
};

export const getAllGroups = createAsyncThunk("admin/getAllGroups", async() => {
    const response = await fetch("https://localhost:7147/api/Groups");
    const data = await response.json();
    console.log(data);
    return data;
})


export const createGroup = createAsyncThunk('admin/createGroup', async (groupName: string) => {
    const response = await fetch('https://localhost:7147/api/Groups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: groupName } ),
    });

    const data = await response.json();
    return data; // return the newly created group
});

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
    }
});

export default groupSlice.reducer;