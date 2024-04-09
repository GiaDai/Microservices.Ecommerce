import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface Lead {
    // Define the properties of a Lead here
}

interface LeadsState {
    isLoading: boolean;
    leads: Lead[];
}

const initialState: LeadsState = {
    isLoading: false,
    leads: [],
}

export const getLeadsContent = createAsyncThunk<Lead[], void>('/leads/content', async () => {
    const response = await axios.get<Lead[]>('/api/users?page=2', {})
    return response.data;
})

export const leadsSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {
        addNewLead: (state, action: PayloadAction<{newLeadObj: Lead}>) => {
            state.leads = [...state.leads, action.payload.newLeadObj]
        },
        deleteLead: (state, action: PayloadAction<{index: number}>) => {
            state.leads.splice(action.payload.index, 1)
        }
    },
    extraReducers: builder => {
        builder.addCase(getLeadsContent.pending, state => {
            state.isLoading = true
        })
        builder.addCase(getLeadsContent.fulfilled, (state, action: PayloadAction<Lead[]>) => {
            state.leads = action.payload
            state.isLoading = false
        })
        builder.addCase(getLeadsContent.rejected, state => {
            state.isLoading = false
        })
    }
})

export const { addNewLead, deleteLead } = leadsSlice.actions

export default leadsSlice.reducer