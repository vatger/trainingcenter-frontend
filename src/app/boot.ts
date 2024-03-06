import { store } from "@/app/store";
import { signIn } from "@/app/features/authSlice";
import LoginService from "@/services/login/LoginService";
import { UserModel } from "@/models/UserModel";
import { Config } from "@/core/Config";

function trySignIn() {
    const user = store.getState().authReducer.user;
    if (user) return;

    LoginService.validateSession()
        .then((user: UserModel) => {
            store.dispatch(signIn(user));
        })
        .catch(() => {
            if (window.location.href.toLowerCase().includes("/login")) {
                return;
            }

            window.location.replace(Config.APP_HOST + "/login");
        });
}

export { trySignIn };
