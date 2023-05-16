import {axiosInstance} from "../../utils/network/AxiosInstance";
import {useEffect, useState} from "react";
import {RoleModel} from "../../models/Permission.model";
import {AxiosError, AxiosResponse} from "axios";
import {APIResponseError} from "../../exceptions/APIResponseError";

/**
 * Retrieve all roles from the API
 * @return - Returns the values of ResponseType (RoleModel[], (RoleModel) => any, boolean, APIResponseError)
 */
function getRoles() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [roles, setRoles] = useState<RoleModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/administration/role")
            .then((res: AxiosResponse) => {
                setRoles(res.data as RoleModel[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_ROLE_LOAD",
                        message: "Failed to load roles",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return { roles, setRoles, loading, loadingError };
}

/**
 * Gets a role's information (such as associated
 * @param role_id
 */
function getRoleInformation(role_id: string | number | undefined) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [roleData, setRoleData] = useState<RoleModel | undefined>(undefined);

    useEffect(() => {
        axiosInstance
            .get("/administration/role/" + (role_id ?? -1))
            .then((res: AxiosResponse) => {
                setRoleData(res.data as RoleModel);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_ROLE_INF_LOAD",
                        message: `Failed to load Information of Role: ${role_id}`,
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return { roleData, setRoleData, loading, loadingError };
}

/**
 * Updates a role with the supplied data
 * @param role_id
 * @param data
 */
async function update(role_id: string | number | undefined, data: object): Promise<RoleModel> {
    return axiosInstance
        .patch("/administration/role/" + (role_id ?? -1), {
            data: data,
        })
        .then((res: AxiosResponse) => {
            return res.data as RoleModel;
        })
        .catch((err: AxiosError) => {
            throw {
                error: err,
                custom: {
                    code: "ERR_API_ROLE_UPDATE_TYPE_CREATE",
                    message: "Failed to update role",
                },
            };
        });
}

/**
 * Adds specific permission to role
 * @param role_id
 * @param permission_id
 */
async function addPermission(role_id: number, permission_id: number): Promise<boolean> {
    return axiosInstance
        .put("/administration/role/perm/" + role_id, {
            permission_id: permission_id,
        })
        .then((res: AxiosResponse) => {
            return true;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

/**
 * Removes the provided permission from the provided role
 * @param role_id
 * @param permission_id
 */
async function removePermission(role_id: number, permission_id: number): Promise<boolean> {
    return axiosInstance
        .delete("/administration/role/perm/" + role_id, {
            data: {
                permission_id: permission_id,
            },
        })
        .then((res: AxiosResponse) => {
            return true;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

export default {
    getRoles,
    getRoleInformation,
    update,
    addPermission,
    removePermission,
};
