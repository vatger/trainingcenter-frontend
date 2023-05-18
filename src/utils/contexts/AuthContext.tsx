import {UserModel, UserSettingsModel} from "../../models/User.model";
import {createContext, Dispatch, ReactElement, useEffect, useState} from "react";
import {Config} from "../../core/Config";
import {RenderIf} from "../../components/conditionals/RenderIf";
import {AuthContextLoadingView} from "./views/AuthContextLoadingView";
import LoginService from "../../services/login/Login.service";
import {PermissionModel, RoleModel} from "../../models/Permission.model";

type AuthContextProps = {
    user: UserModel | undefined;
    changeUser: (data: UserModel) => void;
    userSettings: UserSettingsModel | undefined;
    setUserSettings: Dispatch<UserSettingsModel | undefined>;
    userPermissions: string[];
};

const authContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider(props: { children: ReactElement | ReactElement[] }) {
    const [user, setUser] = useState<UserModel | undefined>(undefined);
    const [userSettings, setUserSettings] = useState<UserSettingsModel | undefined>(undefined);
    const [userPermissions, setUserPermissions] = useState<string[]>([]);

    function changeUser(user: UserModel) {
        if (Object.keys(user).length == 0) {
            window.location.replace(Config.APP_HOST + "/login");
            return;
        }

        const newPerms: string[] = [];
        user.roles?.forEach((role: RoleModel) => {
            role.permissions?.forEach((perm: PermissionModel) => {
                // Check if permission has already been assigned, if not -> add to permission list
                if (newPerms.find((permission: string) => permission.toUpperCase() == perm.name.toUpperCase()) == null) newPerms.push(perm.name.toUpperCase());
            });
        });

        if (user.user_settings != null) {
            setUserSettings(user.user_settings as UserSettingsModel);
        }

        setUser(user);
        setUserPermissions(newPerms);
    }

    useEffect(() => {
        if (window.location.href.toLowerCase().includes("login")) return;
        if (user != null) return;

        LoginService.validateSession()
            .then((user: UserModel) => {
                changeUser(user);
            })
            .catch(() => {
                window.location.replace(Config.APP_HOST + "/login");
                return;
            });
    }, []);

    return (
        <>
            <RenderIf
                truthValue={user?.id == null && !window.location.href.includes("login")}
                elementTrue={<AuthContextLoadingView/>}
                elementFalse={
                    <authContext.Provider value={{
                        user,
                        changeUser,
                        userPermissions,
                        userSettings,
                        setUserSettings
                    }}>{props.children}</authContext.Provider>
                }
            />
        </>
    );
}

export default authContext;
