import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import settingsReducer from "./features/settingsSlice";
import {getLoginLanguage, trySignIn} from "@/app/boot";

export const store = configureStore({
    reducer: {
        authReducer,
        settingsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

trySignIn();
if (window.location.href.includes("/login")) {
    getLoginLanguage();
}
