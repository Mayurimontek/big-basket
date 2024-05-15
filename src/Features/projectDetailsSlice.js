import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createProject = createAsyncThunk("createProject", async (data, { rejectWithValue }) => {
    try {
        const response = await fetch('https://onlinetestapi.gerasim.in/api/Glitch/CreateProject', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});
export const updateProject = createAsyncThunk("updateProject", async (data, { rejectWithValue }) => {
    
    try {
        const response = await fetch('https://onlinetestapi.gerasim.in/api/Glitch/UpdateProject', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});
export const deleteProject = createAsyncThunk("deleteProject", async (projectId, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://onlinetestapi.gerasim.in/api/Glitch/DeleteProjectById?id=${projectId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});
export const showProject = createAsyncThunk("showProject", async (_, { rejectWithValue }) => {
    
        const response = await fetch("https://onlinetestapi.gerasim.in/api/Glitch/GetAllProject");
        try{
            
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});
export const getProjectById = createAsyncThunk("getProjectById", async (projectId, { rejectWithValue }) => {
    
    try {
        const response = await fetch(`https://onlinetestapi.gerasim.in/api/Glitch/GetProjectById?id=${projectId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const result = await response.json();
        
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const projectDetails = createSlice({
    name: "projectDetails",
    initialState: {
        projects: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProject.pending, (state) => {
                state.loading = true; // Using Immer produce function
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.loading = false;
                state.projects.push(action.payload);
            })
            .addCase(createProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(showProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(showProject.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(showProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProjectById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProjectById.fulfilled, (state, action) => {
                
                state.loading = false;
                state.projects = action.payload; 
            })
            .addCase(getProjectById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                
                state.loading = false;
                state.projects = action.payload; 
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default projectDetails.reducer;
