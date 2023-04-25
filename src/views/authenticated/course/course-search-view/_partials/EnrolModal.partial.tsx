import { CourseModel } from "../../../../../models/Course.model";
import { Modal } from "../../../../../components/ui/Modal/Modal";
import { Button } from "../../../../../components/ui/Button/Button";
import { COLOR_OPTS } from "../../../../../configs/theme/theme.config";
import CourseService from "../../../../../services/course/Course.service";
import { useState } from "react";
import ToastHelper from "../../../../../utils/helper/ToastHelper";
import { useNavigate } from "react-router-dom";

type EnrollModalPartialProps = {
    course: CourseModel | undefined;
    show: boolean;
    onClose: () => any;
};

export function EnrolModalPartial(props: EnrollModalPartialProps) {
    const navigate = useNavigate();
    const [enrolling, setEnrolling] = useState<boolean>(false);

    function enrol(course_id: number, course_uuid?: string) {
        setEnrolling(true);
        CourseService.enrol(course_id)
            .then(() => {
                navigate("/course/active/" + course_uuid + "?r");
                ToastHelper.success("Du wurdest erfolgreich in diesen Kurs eingeschrieben");
            })
            .catch(() => {
                ToastHelper.error("Es ist ein Fehler beim Einschreiben aufgetreten");
            })
            .finally(() => setEnrolling(false));
    }

    const modalFooter = (
        <span className={"flex justify-end"}>
            <Button loading={enrolling} onClick={() => enrol(props.course?.id ?? -1, props.course?.uuid)} color={COLOR_OPTS.PRIMARY} variant={"twoTone"}>
                Einschreiben
            </Button>
        </span>
    );

    return (
        <Modal show={props.show} title={"Kurs Einschreibung"} footer={modalFooter} onClose={props.onClose}>
            <p>
                Bist Du sicher, dass Du Dich in den Kurs <strong>{props.course?.name}</strong> einschreiben möchtest? Diese Aktion kann jederzeit unter Kurse -
                Aktive Kurse widerrufen werden.
            </p>
        </Modal>
    );
}
