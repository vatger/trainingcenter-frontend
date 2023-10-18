import { PageHeader } from "../../../../../components/ui/PageHeader/PageHeader";
import { Card } from "../../../../../components/ui/Card/Card";
import { Input } from "../../../../../components/ui/Input/Input";
import { TbUser } from "react-icons/tb";
import { useContext, useState } from "react";
import { useDebounce } from "../../../../../utils/hooks/useDebounce";
import { UserModel } from "../../../../../models/UserModel";
import { Table } from "../../../../../components/ui/Table/Table";
import { TableColumn } from "react-data-table-component";
import { getUserSearchTableColumns } from "./_types/US.types";
import { useNavigate } from "react-router-dom";
import UserService from "../../../../../services/user/UserAdminService";
import { useFilter } from "../../../../../utils/hooks/useFilter";
import { fuzzySearch } from "../../../../../utils/helper/fuzzysearch/FuzzySearchHelper";
import { getAtcRatingShort } from "../../../../../utils/helper/vatsim/AtcRatingHelper";
import authContext from "../../../../../utils/contexts/AuthContext";
import { RenderIf } from "../../../../../components/conditionals/RenderIf";
import { NetworkError } from "../../../../../components/errors/NetworkError";

const filterFunction = (user: UserModel, searchValue: string) => {
    return (
        fuzzySearch(searchValue, [user.first_name + " " + user.last_name, user.id.toString(), getAtcRatingShort(user.user_data?.rating_atc ?? -1)]).length > 0
    );
};

export function UserListView() {
    const { user, userPermissions } = useContext(authContext);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState<string>("");
    const debouncedValue = useDebounce<string>(searchQuery, 250);

    const { users, loading, loadingError } = UserService.getAllUsers();
    const filteredUsers = useFilter<UserModel>(users, searchQuery, debouncedValue, filterFunction);

    return (
        <>
            <PageHeader title={"Mitglieder Suchen"} hideBackLink />

            <RenderIf
                truthValue={loadingError != null}
                elementTrue={<NetworkError error={loadingError?.error} closeable={false} />}
                elementFalse={
                    <>
                        <Card>
                            <Input
                                placeholder={"CID, Name, Rating"}
                                label={"Suchbegriff"}
                                preIcon={<TbUser size={20} />}
                                value={searchQuery}
                                disabled={loading}
                                onChange={e => setSearchQuery(e.target.value)}
                                description={"Gebe hier den Suchbegriff ein, mit diesem das Mitglied gefunden werden soll"}
                                labelSmall></Input>
                        </Card>

                        <Card className={"mt-5"} header={"Mitglieder"} headerBorder>
                            <Table
                                paginate
                                defaultSortField={1}
                                columns={getUserSearchTableColumns(navigate, userPermissions, user)}
                                data={filteredUsers}
                                loading={loading}
                            />
                        </Card>
                    </>
                }
            />
        </>
    );
}
