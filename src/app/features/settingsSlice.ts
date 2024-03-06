import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "@/app/hooks";
import { store } from "@/app/store";

export type TLanguage = "de" | "en";
export type TColorScheme = "dark" | "light";

interface SettingsState {
    language: TLanguage;
    colorScheme: TColorScheme;
}

const initialState: SettingsState = {
    language: "de",
    colorScheme: "light",
};

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setColorScheme: (state, action: PayloadAction<TColorScheme>) => {
            state.colorScheme = action.payload;
        },
        setLanguage: (state, action: PayloadAction<TLanguage>) => {
            state.language = action.payload;
        },
    },
});

export const useSettingsSelector = () => useAppSelector(store => store.settingsReducer);

export const { setColorScheme, setLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;
