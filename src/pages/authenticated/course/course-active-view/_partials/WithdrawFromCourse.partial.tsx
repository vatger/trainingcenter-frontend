import { Modal } from "../../../../../components/ui/Modal/Modal";
import { CourseModel } from "../../../../../models/CourseModel";
import { Button } from "../../../../../components/ui/Button/Button";
import { COLOR_OPTS } from "../../../../../assets/theme.config";
import React, { useState } from "react";
import CourseService from "../../../../../services/course/CourseService";
import ToastHelper from "../../../../../utils/helper/ToastHelper";
import { useNavigate } from "react-router-dom";
import { TbTrash } from "react-icons/all";

type WithdrawFromCoursePartialProps = {
    show: boolean;
    onClose: () => any;
    course?: CourseModel;
};

export function WithdrawFromCoursePartial(props: WithdrawFromCoursePartialProps) {
    const navigate = useNavigate();
    const [withdrawing, setWithdrawing] = useState<boolean>(false);

    function withdrawFromCourse() {
        setWithdrawing(true);

        CourseService.withdraw(props.course?.id)
            .then(() => {
                ToastHelper.success("Erfolgreich vom Kurs abgemeldet");
                navigate("/course/active");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Abmelden aus dem Kurs");
            })
            .finally(() => {
                setWithdrawing(false);
            });
    }

    return (
        <Modal
            show={props.show}
            onClose={props.onClose}
            title={"Vom Kurs Abmelden"}
            footer={
                <div className={"flex justify-end mt-5"}>
                    <Button loading={withdrawing} variant={"twoTone"} onClick={withdrawFromCourse} icon={<TbTrash size={20} />} color={COLOR_OPTS.DANGER}>
                        Abmelden
                    </Button>
                </div>
            }>
            <p>
                Bist du sicher, dass du dich vom Kurs <strong>{props.course?.name}</strong> abmelden möchtest? Diese Aktion lässt sich nicht rückgängig machen
                und hat zur Folge, dass dein gesamter Fortschritt in diesem gelöscht wird. Alle in diesem Kurs aktiven Trainingsanfragen verfallen. Geplante
                Trainings die in diesem Kurs stattfinden werden ebenfalls entfernt.
            </p>
        </Modal>
    );
}
