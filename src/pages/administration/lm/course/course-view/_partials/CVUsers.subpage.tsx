import { UserModel } from "../../../../../../models/UserModel";
import { Table } from "../../../../../../components/ui/Table/Table";
import CourseUsersListTypes from "../_types/CVCourseUsersList.types";
import { useNavigate } from "react-router-dom";
import { TableColumn } from "react-data-table-component";
import { Button } from "../../../../../../components/ui/Button/Button";
import { TbPlus } from "react-icons/all";
import { COLOR_OPTS } from "../../../../../../assets/theme.config";
import { Dispatch, useState } from "react";
import { CVRemoveUserModal } from "../_modals/CVRemoveUser.modal";
import { CourseModel } from "../../../../../../models/CourseModel";

type CourseViewUsersSubpageProps = {
    loading: boolean;
    users: UserModel[];
    setUsers: Dispatch<UserModel[]>;
    course?: CourseModel;
};

export function CVUsersSubpage(props: CourseViewUsersSubpageProps) {
    const navigate = useNavigate();
    const [showRemoveUserModal, setShowRemoveUserModal] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<UserModel | undefined>(undefined);

    const columns: (TableColumn<UserModel> & { searchable?: boolean })[] = CourseUsersListTypes.getColumns(navigate, setShowRemoveUserModal, setSelectedUser);

    function handleUserRemoval(user?: UserModel) {
        setShowRemoveUserModal(false);
        setSelectedUser(undefined);

        if (user == null) return;

        const newUsers: UserModel[] = props.users.filter((u: UserModel) => {
            return u.id != user.id;
        });

        props.setUsers(newUsers);
    }

    return (
        <>
            <CVRemoveUserModal show={showRemoveUserModal} onClose={handleUserRemoval} user={selectedUser} course={props.course} />

            <Table columns={columns} data={props.users} paginate searchable loading={props.loading} />

            <Button variant={"twoTone"} color={COLOR_OPTS.PRIMARY} icon={<TbPlus size={20} />}>
                Teilnehmer hinzufügen
            </Button>
        </>
    );
}
