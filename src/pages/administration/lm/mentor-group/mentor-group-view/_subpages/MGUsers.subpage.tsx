import useApi from "@/utils/hooks/useApi";
import { UserMentorGroupThrough, UserModel } from "@/models/UserModel";
import { Table } from "@/components/ui/Table/Table";
import MGViewUsersTypes from "@/pages/administration/lm/mentor-group/mentor-group-view/_types/MGVUsers.types";
import { Input } from "@/components/ui/Input/Input";
import { TbUser } from "react-icons/all";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { Separator } from "@/components/ui/Separator/Separator";
import React, { FormEvent, useState } from "react";
import { CommonConstants, CommonRegexp } from "@/core/Config";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";
import FormHelper from "@/utils/helper/FormHelper";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import { AxiosResponse } from "axios";
import ToastHelper from "@/utils/helper/ToastHelper";

export function MGUsersSubpage({ mentorGroupID }: { mentorGroupID: string | undefined }) {
    const {
        data: users,
        setData: setUsers,
        loading: loadingUsers,
    } = useApi<UserModel[]>({
        url: "/administration/mentor-group/members",
        params: { mentor_group_id: mentorGroupID },
        method: "get",
    });

    const [newUserID, setNewUserID] = useState<string | undefined>(undefined);
    const [addingUser, setAddingUser] = useState<boolean>(false);

    function addUser(e: FormEvent<HTMLFormElement>) {
        e?.preventDefault();

        if (newUserID == null || isNaN(Number(newUserID))) {
            return;
        }

        setAddingUser(true);
        const data = FormHelper.getEntries(e.target);

        axiosInstance
            .put("/administration/mentor-group/member", {
                mentor_group_id: mentorGroupID,
                user_id: data["cid"],
                group_admin: data["group_admin"] == "on",
                can_manage_course: data["can_manage_course"] == "on",
            })
            .then((res: AxiosResponse) => {
                let user = res.data as UserModel;
                user.UserBelongToMentorGroups = {} as UserMentorGroupThrough;
                user.UserBelongToMentorGroups.group_admin = data["group_admin"] == "on";
                user.UserBelongToMentorGroups.can_manage_course = data["can_manage_course"] == "on";

                setUsers([...(users ?? []), user]);
                ToastHelper.success("Benutzer erfolgreich hinzugefügt");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Hinzufügen des Benutzers");
            })
            .finally(() => setAddingUser(false));
    }

    return (
        <>
            <form onSubmit={addUser}>
                <Input
                    onChange={e => {
                        setNewUserID(e.target.value);
                    }}
                    label={"Benutzer Hinzufügen"}
                    name={"cid"}
                    labelSmall
                    maxLength={CommonConstants.CID_MAX_LEN}
                    regex={CommonRegexp.CID}
                    preIcon={<TbUser size={20} />}
                    placeholder={"1373921"}
                />

                <div className={"flex flex-col mt-3"}>
                    <Checkbox name={"group_admin"}>Gruppenadministrator</Checkbox>
                    <Checkbox name={"can_manage_course"} className={"mt-3"}>
                        Kursverwaltung
                    </Checkbox>
                </div>

                <Button size={SIZE_OPTS.SM} color={COLOR_OPTS.PRIMARY} loading={addingUser} variant={"twoTone"} className={"mt-5"} type={"submit"}>
                    Hinzufügen
                </Button>
            </form>

            <Separator />

            <Table paginate columns={MGViewUsersTypes.getColumns(users, setUsers, mentorGroupID)} data={users ?? []} loading={loadingUsers} />
        </>
    );
}
