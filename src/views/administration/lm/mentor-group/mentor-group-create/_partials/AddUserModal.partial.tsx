import { Modal } from "../../../../../../components/ui/Modal/Modal";
import { Input } from "../../../../../../components/ui/Input/Input";
import { TbCircleCheck, TbCircleX, TbSearch } from "react-icons/all";
import { useContext, useState } from "react";
import { TrainingTypeModel } from "../../../../../../models/TrainingType.model";
import TrainingTypeService from "../../../../../../services/training-type/TrainingType.admin.service";
import { useDebounce } from "../../../../../../utils/hooks/useDebounce";
import { MapArray } from "../../../../../../components/conditionals/MapArray";
import { RenderIf } from "../../../../../../components/conditionals/RenderIf";
import { Separator } from "../../../../../../components/ui/Separator/Separator";
import { Badge } from "../../../../../../components/ui/Badge/Badge";
import { useFilter } from "../../../../../../utils/hooks/useFilter";
import { fuzzySearch } from "../../../../../../utils/helper/fuzzysearch/FuzzySearchHelper";
import { UserModel } from "../../../../../../models/User.model";
import UserAdministrationService from "../../../../../../services/user/User.admin.service";
import { UserInMentorGroupT } from "../MentorGroupCreate.view";
import authContext from "../../../../../../utils/contexts/AuthContext";
import { NetworkError } from "../../../../../../components/errors/NetworkError";

const filterTrainingTypeFunction = (logTemplate: UserModel, searchValue: string) => {
    return fuzzySearch(searchValue, [logTemplate.id.toString(), logTemplate.first_name, logTemplate.last_name]).length > 0;
};

export function AddUserModalPartial(props: {
    open: boolean;
    onClose: () => any;
    onAddUser: (user: UserModel) => any;
    onRemoveUser: (user: UserModel) => any;
    users: UserInMentorGroupT[];
}) {
    const { user } = useContext(authContext);

    const [searchQuery, setSearchQuery] = useState<string>("");
    const debouncedValue = useDebounce<string>(searchQuery, 250);

    const { users, loading, loadingError } = UserAdministrationService.getAllUsersMinimalData();
    const filteredTrainingTypes = useFilter<UserModel>(users, searchQuery, debouncedValue, filterTrainingTypeFunction, true);

    return (
        <Modal show={props.open} onClose={props.onClose} title={"Benutzer Suchen"}>
            <RenderIf
                truthValue={loadingError != null}
                elementTrue={
                    <NetworkError
                        error={loadingError?.error}
                        closeable={false}
                        custom_message={"Es ist ein Fehler beim Laden der Benutzer aufgetreten. Versuche bitte die Seite neuzuladen."}
                    />
                }
                elementFalse={
                    <>
                        <Input
                            className={"mb-3"}
                            type={"text"}
                            label={"Name oder CID"}
                            labelSmall
                            value={searchQuery}
                            loading={loading}
                            onChange={e => setSearchQuery(e.target.value)}
                            preIcon={<TbSearch size={20} />}
                            placeholder={"1373921"}
                        />

                        <RenderIf
                            truthValue={filteredTrainingTypes.length > 0}
                            elementTrue={
                                <>
                                    <span>
                                        Die Suche ergab <strong>{filteredTrainingTypes.length}</strong> Treffer.
                                    </span>
                                    <Separator className={"mt-1"} />
                                </>
                            }
                        />

                        <div className={"max-h-[35vh] side-nav-hide-scrollbar overflow-y-auto"}>
                            <MapArray
                                data={filteredTrainingTypes}
                                mapFunction={(value: UserModel, index) => {
                                    // Check if user is NOT a part of this group yet, then allow addition!
                                    if (props.users.find(u => u.user.id == value.id) == null) {
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => props.onAddUser(value)}
                                                className={
                                                    "flex mt-2 justify-between flex-row rounded border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 transition-all border hover:shadow-sm p-3 cursor-pointer"
                                                }>
                                                <span className={"flex"}>{`${value.id} - ${value.first_name + " " + value.last_name}`} </span>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                if (value.id == user?.id) return;

                                                props.onRemoveUser(value);
                                            }}
                                            className={
                                                "flex mt-2 justify-between flex-row rounded border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 transition-all border hover:shadow-sm p-3 cursor-pointer"
                                            }>
                                            <span className={"flex"}>{`${value.id} - ${value.first_name + " " + value.last_name}`} </span>
                                            <span>
                                                <TbCircleCheck size={20} className={"text-success"} />
                                            </span>
                                        </div>
                                    );
                                }}
                            />
                        </div>
                    </>
                }
            />
        </Modal>
    );
}
