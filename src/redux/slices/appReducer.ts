import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type PlannerPageTypes =
    | 'ProductLanding'
    | 'ProductDetail'
    | 'StationLanding'
    | 'StationDetail'
    | 'Setting'
    | undefined
    | 'OrderLanding'
    | 'OrderSettings';
export type ManagerPageTypes = 'OrderLanding' | 'OrderSettings' | undefined;
export type PageTypes = PlannerPageTypes | ManagerPageTypes;

interface AppState {
    currentPage: PageTypes;
    headerLabel?: string;
}

const initialState: AppState = {
    currentPage: undefined,
    headerLabel: 'FANCY TITLE',
};

export const appReducer = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<PageTypes>) => {
            state.currentPage = action.payload;
        },
        setHeaderLabel: (state, action: PayloadAction<string>) => {
            state.headerLabel = action.payload;
        },
    },
});

export const { setCurrentPage,
    setHeaderLabel,
} = appReducer.actions;

export default appReducer.reducer;
