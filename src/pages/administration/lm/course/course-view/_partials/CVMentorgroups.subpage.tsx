import { UserModel } from "../../../../../../models/UserModel";
import { Table } from "../../../../../../components/ui/Table/Table";
import { useNavigate } from "react-router-dom";
import { TableColumn } from "react-data-table-component";
import { Button } from "../../../../../../components/ui/Button/Button";
import { TbPlus } from "react-icons/all";
import { COLOR_OPTS } from "../../../../../../assets/theme.config";
import { MentorGroupModel } from "../../../../../../models/MentorGroupModel";
import CourseMentorGroupsListTypes from "../_types/CVMentorGroupsList.types";
import { Dispatch, useState } from "react";
import { CVMentorGroupMembersPartial } from "./CVMentorGroupMembers.partial";

export type MentorGroupMembersModalT = {
    show: boolean;
    users: UserModel[];
    mentorGroup: MentorGroupModel | undefined;
};

export function CVMentorgroupsSubpage(props: {
    loading: boolean;
    course_id: number;
    mentorGroups: MentorGroupModel[];
    setMentorGroups: Dispatch<MentorGroupModel[]>;
}) {
    const [viewMentorGroupMembersModal, setViewMentorGroupMembersModal] = useState<MentorGroupMembersModalT>({
        show: false,
        users: [],
        mentorGroup: undefined,
    });

    const navigate = useNavigate();
    const columns: (TableColumn<MentorGroupModel> & { searchable?: boolean })[] = CourseMentorGroupsListTypes.getColumns(
        navigate,
        props.course_id,
        props.mentorGroups,
        props.setMentorGroups,
        setViewMentorGroupMembersModal
    );

    return (
        <>
            <Table columns={columns} data={props.mentorGroups} searchable loading={props.loading} />

            <Button variant={"twoTone"} color={COLOR_OPTS.PRIMARY} icon={<TbPlus size={20} />}>
                Mentorgruppe hinzufügen
            </Button>

            <CVMentorGroupMembersPartial
                users={viewMentorGroupMembersModal.users}
                mentorGroup={viewMentorGroupMembersModal.mentorGroup}
                show={viewMentorGroupMembersModal.show}
                onClose={() => setViewMentorGroupMembersModal({ ...viewMentorGroupMembersModal, show: false })}
            />
        </>
    );
}
