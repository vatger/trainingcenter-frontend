import { Modal } from "../../../../../../components/ui/Modal/Modal";
import { UserModel } from "../../../../../../models/User.model";
import { CourseModel } from "../../../../../../models/Course.model";
import { Button } from "../../../../../../components/ui/Button/Button";
import { COLOR_OPTS } from "../../../../../../configs/theme/theme.config";
import React, { useState } from "react";
import CourseAdminService from "../../../../../../services/course/Course.admin.service";
import ToastHelper from "../../../../../../utils/helper/ToastHelper";

type RemoveUserModalPartialProps = {
    show: boolean;
    onClose: (user: UserModel | undefined) => any;
    user?: UserModel;
    course?: CourseModel;
};

export function RemoveUserModalPartial(props: RemoveUserModalPartialProps) {
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
                    <Button loading={removingUser} variant={"twoTone"} onClick={() => handleRemove(props.user)} color={COLOR_OPTS.DANGER}>
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
