import {UserModel} from "../../../../../../models/User.model";
import {Table} from "../../../../../../components/ui/Table/Table";
import CourseUsersListTypes from "../../_types/CourseUsersList.types";
import {useNavigate} from "react-router-dom";
import {TableColumn} from "react-data-table-component";
import {Button} from "../../../../../../components/ui/Button/Button";
import {TbPlus} from "react-icons/all";
import {COLOR_OPTS} from "../../../../../../assets/theme.config";
import {Dispatch, useState} from "react";
import {RemoveUserModalPartial} from "../_partials/RemoveUserModal.partial";
import {CourseModel} from "../../../../../../models/Course.model";

type CourseViewUsersSubpageProps = {
    loading: boolean;
    users: UserModel[];
    setUsers: Dispatch<UserModel[]>;
    course?: CourseModel;
};

export function CourseViewUsersSubpage(props: CourseViewUsersSubpageProps) {
    const navigate = useNavigate();
    const [showRemoveUserModal, setShowRemoveUserModal] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<UserModel | undefined>(undefined);

    const columns: (TableColumn<UserModel> & { searchable?: boolean })[] = CourseUsersListTypes.getColumns(navigate, setShowRemoveUserModal, setSelectedUser);

    function handleUserRemoval(user?: UserModel) {
        setShowRemoveUserModal(false);
        setSelectedUser(undefined);

        if (user == null) return;

        const newUsers = props.users.filter(u => {
            return u.id != user.id;
        });

        props.setUsers(newUsers);
    }

    return (
        <>
            <RemoveUserModalPartial show={showRemoveUserModal} onClose={handleUserRemoval} user={selectedUser} course={props.course} />

            <Table columns={columns} data={props.users} searchable loading={props.loading} />

            <Button variant={"twoTone"} color={COLOR_OPTS.PRIMARY} icon={<TbPlus size={20} />}>
                Teilnehmer hinzufügen
            </Button>
        </>
    );
}
