import { ManageAccountElementPartial } from "../../../../../authenticated/account/manage-account/_partials/ManageAccountElement.partial";
import { Button } from "../../../../../../components/ui/Button/Button";
import { TbRepeat, TbTrash } from "react-icons/all";
import { COLOR_OPTS } from "../../../../../../configs/theme/theme.config";
import { useState } from "react";

export function CourseViewDangerSubpage(props: { uuid?: string }) {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isResetting, setIsResetting] = useState<boolean>(false);

    function deleteCourse() {
        alert("Deleting course, uuid: " + props.uuid);
    }

    function resetCourse() {
        alert("Resetting course, uuid: " + props.uuid);
    }

    return (
        <>
            <p>
                Viele der hier vorhandenen Einstellungen können gefährlich sein und eventuell zum Datenverlust führen. Sie können sich negativ auf die
                Ausbildungen anderer Mitglieder auswirken und benötigen deshalb immer eine weitere Bestätigung. Diese Aktionen können eventuell{" "}
                <strong className={"underline"}>nicht</strong> rückgängig gemacht werden.
            </p>

            <ManageAccountElementPartial
                title={
                    <>
                        Kurs Löschen
                        <span className={"text-danger flex text-xs mt-1.5"}>
                            Der gesamte Kurs wird gelöscht. Dazu zählen auch alle Trainingslogs, Trainingsanfragen, usw. die mit diesem Kurs in Verbindung
                            hängen. Der Kurs kann widerhergestellt werden, die vorhandenen und gelöschten Daten jedoch nicht!
                        </span>
                    </>
                }
                element={
                    <Button
                        className={"ml-auto float-right"}
                        loading={isDeleting}
                        onClick={() => deleteCourse()}
                        icon={<TbTrash size={20} />}
                        variant={"twoTone"}
                        color={COLOR_OPTS.DANGER}>
                        Löschen
                    </Button>
                }
            />

            <ManageAccountElementPartial
                className={"pb-0"}
                title={
                    <>
                        Kurs Zurücksetzen
                        <span className={"text-danger flex text-xs mt-1.5"}>
                            Der Kurs wird zurückgesetzt. Das heißt, dass alle mit diesem Kurs verbundenen Daten (vergangene Trainings, usw.) gelöscht werden,
                            der Kurs wird jedoch nicht verändert.
                        </span>
                    </>
                }
                hideBottomBorder
                element={
                    <Button
                        className={"ml-auto float-right"}
                        loading={isResetting}
                        onClick={() => resetCourse()}
                        icon={<TbRepeat size={20} />}
                        variant={"twoTone"}
                        color={COLOR_OPTS.DANGER}>
                        Zurücksetzen
                    </Button>
                }
            />
        </>
    );
}
