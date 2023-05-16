import {NavigateFunction} from "react-router-dom";
import {TableColumn} from "react-data-table-component";
import {Button} from "../../../../../components/ui/Button/Button";
import {COLOR_OPTS, SIZE_OPTS} from "../../../../../assets/theme.config";
import {TbEye, TbTrash, TbUsers} from "react-icons/all";
import {Badge} from "../../../../../components/ui/Badge/Badge";
import {MentorGroupModel} from "../../../../../models/MentorGroup.model";
import moment from "moment";
import {Dispatch, useState} from "react";
import CourseAdminService from "../../../../../services/course/Course.admin.service";
import ToastHelper from "../../../../../utils/helper/ToastHelper";
import {MentorGroupMembersModalT} from "../course-view/_subpages/CourseViewMentorgroups.subpage";

function getColumns(
    navigate: NavigateFunction,
    course_id: number,
    mentorGroups: MentorGroupModel[],
    setMentorGroups: Dispatch<MentorGroupModel[]>,
    setViewMentorGroupMembersModal: Dispatch<MentorGroupMembersModalT>
): (TableColumn<MentorGroupModel> & { searchable?: boolean })[] {
    const [removingMentorGroupID, setRemovingMentorGroupID] = useState<number | undefined>(undefined);

    function removeMentorGroup(id: number) {
        setRemovingMentorGroupID(id);

        CourseAdminService.removeMentorGroupByID(course_id, id)
            .then(() => {
                const newMentorGroups = mentorGroups.filter((mg: MentorGroupModel) => {
                    return mg.id != id;
                });
                setMentorGroups(newMentorGroups);
                ToastHelper.success("Mentorengruppe erfolgreich entfernt");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim entfernen der Mentorengruppe");
            })
            .finally(() => setRemovingMentorGroupID(undefined));
    }

    return [
        {
            name: "Name",
            selector: row => row.name,
            searchable: true,
        },
        {
            name: "Kurs Bearbeitung",
            cell: row => {
                return row?.MentorGroupsBelongsToCourses?.can_edit_course ? (
                    <Badge color={COLOR_OPTS.SUCCESS}>Ja</Badge>
                ) : (
                    <Badge color={COLOR_OPTS.DANGER}>Nein</Badge>
                );
            },
        },
        {
            name: "Hinzugefügt Am",
            selector: row => moment(row.MentorGroupsBelongsToCourses?.createdAt).format("DD.MM.YYYY"),
        },
        {
            name: "Aktion",
            cell: row => {
                return (
                    <div className={"flex"}>
                        <Button
                            className={"my-3"}
                            onClick={() => navigate(`/administration/mentor-group/${row.id}`)}
                            size={SIZE_OPTS.SM}
                            disabled={removingMentorGroupID != null}
                            variant={"twoTone"}
                            color={COLOR_OPTS.PRIMARY}
                            icon={<TbEye size={20} />}
                        />
                        <Button
                            className={"my-3 ml-2"}
                            size={SIZE_OPTS.SM}
                            onClick={() => {
                                setViewMentorGroupMembersModal({
                                    show: true,
                                    users: row.users ?? [],
                                    mentorGroup: row,
                                });
                            }}
                            disabled={removingMentorGroupID != null}
                            variant={"twoTone"}
                            color={COLOR_OPTS.PRIMARY}
                            icon={<TbUsers size={20} />}
                        />
                        <Button
                            className={"my-3 ml-2"}
                            onClick={() => removeMentorGroup(row.id)}
                            size={SIZE_OPTS.SM}
                            loading={removingMentorGroupID == row.id}
                            disabled={
                                removingMentorGroupID != null ||
                                (mentorGroups.filter(mg => mg.MentorGroupsBelongsToCourses?.can_edit_course == true).length <= 1 &&
                                    row.MentorGroupsBelongsToCourses?.can_edit_course == true)
                            }
                            variant={"twoTone"}
                            color={COLOR_OPTS.DANGER}
                            icon={<TbTrash size={20} />}
                        />
                    </div>
                );
            },
        },
    ];
}

export default {
    getColumns,
};
