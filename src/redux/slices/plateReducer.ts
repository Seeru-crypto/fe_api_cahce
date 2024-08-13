import {createAsyncThunk, createSlice, isPending, isRejected} from '@reduxjs/toolkit';
import {IPlate} from "../../models/IPlate.ts";
import api from "../../middleware/axiosConfig.ts";
import {successOption, toastManager, warningOption} from "../../utils/toastManager.ts";

interface IPlateReducer {
    isLoading: boolean;
    plates: IPlate[];
}

const initialState: IPlateReducer = {
    isLoading: false,
    plates: [],
};

export const getPlates = createAsyncThunk('getPlates', async () => {
    let url = "/plates?_sort=-createdAt";
    return (await api.get<IPlate[]>(url)).data
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
                state.isLoading = false;
                state.plates = action.payload;
            })
            .addCase(savePlate.fulfilled, (state) => {
                state.isLoading = false;
                toastManager.notify('Plate created', successOption);
            })
            .addCase(deletePlate.fulfilled, (state) => {
                state.isLoading = false;
                toastManager.notify('Plate deleted', successOption);
            })
            .addMatcher(isPending(getPlates, deletePlate, savePlate), (state) => {
                state.isLoading = true;
            })
            .addMatcher(isRejected(getPlates, deletePlate, savePlate), (state, action) => {
                storeRequestMessage(action)
                state.isLoading = false
            });
    },
});
// export const {  toggleFlowEditMode } = plateSlice.actions;

type TRequest = "savePlate" | "deletePlate" | "getPlates"

// Optimized function to store request messages
function storeRequestMessage(action: any) {
    const {message} = action.error;
    if (message === "Request stored offline") {
        const type = action.type.split('/')[0] as TRequest;

        const notificationMessages: Record<TRequest, string> = {
            savePlate: "save request stored",
            deletePlate: "delete request stored",
            getPlates: "", // No notification for getPlates
        };

        if (notificationMessages[type]) {
            toastManager.notify(notificationMessages[type], warningOption);
        } else {
            console.error("unknown type: ", type);
        }
    }
}

export default plateSlice.reducer;
