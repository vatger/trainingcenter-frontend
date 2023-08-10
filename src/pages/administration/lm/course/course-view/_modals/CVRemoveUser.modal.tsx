import { Modal } from "@/components/ui/Modal/Modal";
import { UserModel } from "@/models/UserModel";
import { CourseModel } from "@/models/CourseModel";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS } from "@/assets/theme.config";
import React, { useState } from "react";
import CourseAdminService from "../../../../../../services/course/CourseAdminService";
import ToastHelper from "../../../../../../utils/helper/ToastHelper";
import { TbTrash } from "react-icons/all";

type RemoveUserModalPartialProps = {
    show: boolean;
    onClose: (user: UserModel | undefined) => any;
    user?: UserModel;
    course?: CourseModel;
};

export function CVRemoveUserModal(props: RemoveUserModalPartialProps) {
    const [removingUser, setRemovingUser] = useState<boolean>(false);

    function handleRemove(user?: UserModel) {
        setRemovingUser(true);

        CourseAdminService.removeUserByID(props.course?.id, user?.id)
            .then(() => {
                props.onClose(user);
                ToastHelper.success("Benutzer erfolgreich aus Kurs entfernt");
            })
            .catch(() => {
                ToastHelper.error("Es ist ein Fehler beim entfernen des Benutzers aufgetreten");
            })
            .finally(() => setRemovingUser(false));
    }

    return (
        <Modal
            show={props.show}
            title={"Benutzer entfernen"}
            onClose={() => props.onClose(undefined)}
            footer={
                <div className={"flex justify-end mt-5"}>
                    <Button
                        icon={<TbTrash size={20} />}
                        loading={removingUser}
                        variant={"twoTone"}
                        onClick={() => handleRemove(props.user)}
                        color={COLOR_OPTS.DANGER}>
                        Entfernen
                    </Button>
                </div>
            }>
            <p>
                Bist du sicher, dass Du den Benutzer{" "}
                <span className={"font-bold"}>
                    {props?.user?.first_name} {props?.user?.last_name} ({props?.user?.id}){" "}
                </span>
                aus dem Kurs <span className={"font-bold"}>{props.course?.name} </span> entfernen möchtest?
            </p>
        </Modal>
    );
}
