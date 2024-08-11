import {createAsyncThunk, createSlice, isRejected, PayloadAction} from '@reduxjs/toolkit';
import api from "../../middleware/axiosConfig.ts";
import {IApiHealth} from "../../models/IApiHealth.ts";

interface AppState {
    headerLabel?: string;
    isApiOnline: boolean
}

const initialState: AppState = {
    headerLabel: 'FANCY TITLE',
    isApiOnline: true
};

export const getApiHealth = createAsyncThunk('getApiHealth', async () => {
    return (await api.get<IApiHealth>("/health")).data
});

export const appReducer = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setHeaderLabel: (state, action: PayloadAction<string>) => {
            state.headerLabel = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getApiHealth.fulfilled, (state, action) => {
                state.isApiOnline = action.payload.status.toUpperCase() === 'OK';
            })
            .addMatcher(isRejected(getApiHealth), (state) => {
                state.isApiOnline = false
            });
    },
});

export const {
    setHeaderLabel,
} = appReducer.actions;

export default appReducer.reducer;
