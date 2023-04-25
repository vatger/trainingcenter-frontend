import { Dispatch, useEffect, useState } from "react";
import { APIResponseError } from "../../exceptions/APIResponseError";
import { PermissionModel } from "../../models/Permission.model";
import { axiosInstance } from "../../utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";

export const enum PermissionCreateEnum {
    OK,
    ERR_UNK,
    ERR_VAL,
    ERR_DUP,
}

/**
 * Retrieve all permissions from the API
 * Provides indicators to the loading status (loading, loadingError) shown in the return type
 * Provides the data in permissions
 * Provides a creation function
 *
 * @return - Returns the values of ResponseType (PermissionModel[], (PermissionModel) => any, boolean, APIResponseError)
 */
type GetPermissionT = { permissions: PermissionModel[]; setPermissions: Dispatch<PermissionModel[]>; loading: boolean; loadingError: APIResponseError };
function getPermissions(): GetPermissionT {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [permissions, setPermissions] = useState<PermissionModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/administration/permission")
            .then((res: AxiosResponse) => {
                setPermissions(res.data as PermissionModel[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_PERM_LOAD",
                        message: "Failed to load permissions",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return { permissions, setPermissions, loading, loadingError };
}

/**
 *
 * @param permissionName
 */
async function create(permissionName: string): Promise<PermissionModel> {
    return axiosInstance
        .put("/administration/permission", {
            name: permissionName,
        })
        .then((res: AxiosResponse) => {
            return res.data as PermissionModel;
        })
        .catch((err: AxiosError) => {
            const err_code = (err.response?.data as any).code;

            switch (err_code?.toLowerCase()) {
                case "val_err":
                    throw PermissionCreateEnum.ERR_VAL;

                case "dup_entry":
                    throw PermissionCreateEnum.ERR_DUP;

                default:
                    throw PermissionCreateEnum.ERR_UNK;
            }
        });
}

export default {
    getPermissions,
    create,
};
