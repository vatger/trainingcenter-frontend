import {PageHeader} from "../../../../../components/ui/PageHeader/PageHeader";
import {Card} from "../../../../../components/ui/Card/Card";
import {Input} from "../../../../../components/ui/Input/Input";
import {TbCirclePlus, TbFilePlus, TbId, TbMap2} from "react-icons/all";
import {Button} from "../../../../../components/ui/Button/Button";
import {COLOR_OPTS, SIZE_OPTS} from "../../../../../assets/theme.config";
import {Separator} from "../../../../../components/ui/Separator/Separator";
import {FormEvent, useContext, useState} from "react";
import FormHelper from "../../../../../utils/helper/FormHelper";
import {AddUserModalPartial} from "./_partials/AddUserModal.partial";
import {UserModel} from "../../../../../models/User.model";
import {TableColumn} from "react-data-table-component";
import MentorGroupUsersTableTypes from "../_types/MentorGroupUsersTable.types";
import {Table} from "../../../../../components/ui/Table/Table";
import authContext from "../../../../../utils/contexts/AuthContext";
import MentorGroupAdministrationService from "../../../../../services/mentor-group/MentorGroup.admin.service";
import {MentorGroupModel} from "../../../../../models/MentorGroup.model";
import ToastHelper from "../../../../../utils/helper/ToastHelper";
import {useNavigate} from "react-router-dom";
import {Select} from "../../../../../components/ui/Select/Select";

export type UserInMentorGroupT = {
    user: UserModel;
    admin: boolean;
    can_manage: boolean;
};

export function MentorGroupCreateView() {
    const navigate = useNavigate();
    const { user } = useContext(authContext);

    const [addUserModalOpen, setAddUserModalOpen] = useState<boolean>(false);
    const [users, setUsers] = useState<UserInMentorGroupT[]>([
        { user: { id: user?.id, first_name: user?.first_name, last_name: user?.last_name } as UserModel, admin: true, can_manage: true },
    ]);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const mentorGroupUsersColumns: TableColumn<UserInMentorGroupT>[] = MentorGroupUsersTableTypes.getColumns(user?.id ?? -1, users, setUsers);

    function handleCreate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);

        let data = FormHelper.getEntries(e.target);
        data["users"] = users;

        MentorGroupAdministrationService.create(data)
            .then((res: MentorGroupModel) => {
                navigate("/administration/mentor-group/" + res.id + "?r");
                ToastHelper.success("Mentorengruppe erfolgreich erstellt");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Erstellen der Mentorengruppe");
            })
            .finally(() => setSubmitting(false));
    }

    function addUser(user: UserModel) {
        const newUser = {
            user: user,
            admin: false,
            can_manage: false,
        };
        setUsers([...users, newUser]);
    }

    function removeUser(user: UserModel) {
        const newUsers = users.filter(u => {
            return u.user.id != user.id;
        });

        setUsers(newUsers);
    }

    return (
        <>
            <PageHeader title={"Mentorengruppe Erstellen"} hideBackLink />

            <Card header={"Informationen"} headerBorder>
                <form onSubmit={e => handleCreate(e)}>
                    <Input
                        name={"name"}
                        type={"text"}
                        maxLength={70}
                        description={"Name der Mentorengruppe"}
                        labelSmall
                        placeholder={"Frankfurt Tower Mentoren"}
                        label={"Name"}
                        required
                        regex={RegExp("^(?!\\s*$).+")}
                        regexMatchEmpty
                        regexCheckInitial
                        preIcon={<TbId size={20} />}
                    />

                    <Select
                        name={"fir"}
                        label={"FIR"}
                        preIcon={<TbMap2 size={20} />}
                        className={"mt-5"}
                        description={"FIR der Mentorengruppe"}
                        labelSmall
                        defaultValue={""}>
                        <option value={""}>N/A</option>
                        <option value={"edww"}>EDWW</option>
                        <option value={"edgg"}>EDGG</option>
                        <option value={"edmm"}>EDMM</option>
                    </Select>

                    <Separator />
                    <div className={"mb-1 flex justify-between"}>
                        <h6 className={"text-sm"}>Mitglieder ({users.length})</h6>
                    </div>
                    <p className="mb-3 text-xs">
                        Du bist automatisch als Gruppenadministrator und Kursverwalter in dieser Mentorengruppe. Falls dies nicht erwünscht sein sollte, kann
                        dies im Nachinein über die Verwaltung der Mentorengruppen angepasst werden. Wenn Du allerdings diese Berechtigungen nicht mehr besitzt,
                        kannst Du auch keine Änderungen mehr an der Mentorengruppe vornehmen um bspw. Mitglieder hinzuzufügen oder zu entfernen!
                    </p>

                    <Table columns={mentorGroupUsersColumns} data={users} />

                    <Button
                        disabled={submitting}
                        icon={<TbCirclePlus size={20} />}
                        type={"button"}
                        variant={"default"}
                        size={SIZE_OPTS.SM}
                        onClick={() => setAddUserModalOpen(true)}>
                        Benutzer Hinzufügen
                    </Button>

                    <Separator />

                    <Button type={"submit"} loading={submitting} icon={<TbFilePlus size={20} />} variant={"twoTone"} color={COLOR_OPTS.PRIMARY}>
                        Mentorengruppe Erstellen
                    </Button>
                </form>
            </Card>

            <AddUserModalPartial
                open={addUserModalOpen}
                onClose={() => setAddUserModalOpen(false)}
                onAddUser={addUser}
                onRemoveUser={removeUser}
                users={users}
            />
        </>
    );
}
