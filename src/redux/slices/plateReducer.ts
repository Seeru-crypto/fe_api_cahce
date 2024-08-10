import {createAsyncThunk, createSlice, isPending, isRejected} from '@reduxjs/toolkit';
import {IPlate} from "../../models/IPlate.ts";
import api from "../../middleware/axiosConfig.ts";
import {successOption, toastManager} from "../../toastManager.ts";

interface IPlateReducer {
    loading: boolean;
    plates: IPlate[];
}

const initialState: IPlateReducer = {
    loading: false,
    plates: [],
};

export const getPlates = createAsyncThunk('getPlates', async () => {
    return (await api.get<IPlate[]>("/plates")).data
    //return (await axios.get<ProductDto[]>(PRODUCT_PATH)).data;
});

export const savePlate = createAsyncThunk('savePlate', async (payload: IPlate, thunkApi) => {
    const result = await api.post("/plates", payload)
    void thunkApi.dispatch(getPlates());
    return result.data;
});

export const deletePlate = createAsyncThunk('deletePlate', async (plateId: number, thunkApi) => {
    return await (api.delete(`/plates/${plateId}`)).then(() => thunkApi.dispatch(getPlates()))
});

export const plateSlice = createSlice({
    name: 'plate',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getPlates.fulfilled, (state, action) => {
                state.loading = false;
                // console.log("data ", action.payload.data)
                state.plates = action.payload;
            })
            .addCase(savePlate.fulfilled, (state) => {
                state.loading = false;
                toastManager.notify('Plate created', successOption);
            })
            .addCase(deletePlate.fulfilled, (state) => {
                state.loading = false;
                toastManager.notify('Plate deleted', successOption);
            })
            .addMatcher(isPending(getPlates, deletePlate, savePlate), (state) => {
                state.loading = true;
            })
            .addMatcher(isRejected(getPlates, deletePlate, savePlate), (state) => {
                console.log("is rejected")
                state.loading = false
            });
    },
});
// export const {  toggleFlowEditMode } = plateSlice.actions;

export default plateSlice.reducer;
