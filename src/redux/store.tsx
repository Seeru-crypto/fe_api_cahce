import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import appReducer from './slices/appReducer.ts';
import plateReducer from "./slices/plateReducer.ts";

const rootReducer = combineReducers({
    app: appReducer,
    plates: plateReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type TStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export type IRootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
