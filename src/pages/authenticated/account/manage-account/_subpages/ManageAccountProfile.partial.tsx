import { Input } from "../../../../../components/ui/Input/Input";
import { ManageAccountElementPartial } from "../_partials/ManageAccountElement.partial";
import { TbMail, TbMapPin, TbNumbers, TbPlaneDeparture, TbRss, TbUserCircle, TbWorld } from "react-icons/all";
import { useContext } from "react";
import authContext from "../../../../../utils/contexts/AuthContext";
import { getAtcRatingLong, getAtcRatingShort } from "../../../../../utils/helper/vatsim/AtcRatingHelper";
import { COLOR_OPTS } from "../../../../../assets/theme.config";
import { getPilotRatingLong, getPilotRatingShort } from "../../../../../utils/helper/vatsim/PilotRatingHelper";
import { Badge } from "../../../../../components/ui/Badge/Badge";
import { RenderIf } from "../../../../../components/conditionals/RenderIf";

const guestTag = (
    <div className={"mt-1 lg:mt-0"}>
        <Badge className={"lg:ml-3"} color={COLOR_OPTS.PRIMARY}>
            Guest
        </Badge>
    </div>
);

export function ManageAccountProfilePartial() {
    const { user } = useContext(authContext);

    return (
        <>
            <ManageAccountElementPartial
                title={"Name"}
                element={<Input disabled preIcon={<TbUserCircle size={20} />} className={"w-full"} value={user?.first_name + " " + user?.last_name} />}
            />
            <ManageAccountElementPartial
                title={"Certificate"}
                element={<Input disabled preIcon={<TbNumbers size={20} />} className={"w-full"} value={user?.id.toString()} />}
            />
            <ManageAccountElementPartial
                title={"E-Mail"}
                element={<Input disabled preIcon={<TbMail size={20} />} className={"w-full"} value={user?.email} />}
            />
            <ManageAccountElementPartial
                title={"ATC Rating"}
                element={
                    <Input
                        disabled
                        preIcon={<TbRss size={20} />}
                        className={"w-full"}
                        value={`${getAtcRatingShort(user?.user_data?.rating_atc ?? -2)} (${getAtcRatingLong(user?.user_data?.rating_atc ?? -2)})`}
                    />
                }
            />
            <ManageAccountElementPartial
                title={"Pilot Rating"}
                element={
                    <Input
                        disabled
                        preIcon={<TbPlaneDeparture size={20} />}
                        className={"w-full"}
                        value={`${getPilotRatingShort(user?.user_data?.rating_pilot ?? -2)} (${getPilotRatingLong(user?.user_data?.rating_pilot ?? -2)})`}
                    />
                }
            />
            <ManageAccountElementPartial
                title={"Region"}
                element={
                    <Input
                        disabled
                        preIcon={<TbWorld size={20} />}
                        className={"w-full"}
                        value={`${user?.user_data?.region_name} (${user?.user_data?.region_code})`}
                    />
                }
            />
            <ManageAccountElementPartial
                hideBottomBorder={user?.user_data?.subdivision_code != "GER" && user?.user_data?.subdivision_code == null}
                title={
                    <div className={"flex flex-col lg:flex-row"}>
                        Division
                        <RenderIf truthValue={user?.user_data?.subdivision_code != "GER" && user?.user_data?.subdivision_code == null} elementTrue={guestTag} />
                    </div>
                }
                element={
                    <Input
                        disabled
                        preIcon={<TbWorld size={20} />}
                        className={"w-full"}
                        value={`${user?.user_data?.division_name ?? "N/A"} (${user?.user_data?.division_code ?? "N/A"})`}
                    />
                }
            />

            {/* Render only if subdivision exists*/}
            <RenderIf
                truthValue={user?.user_data?.subdivision_code != null}
                elementTrue={
                    <ManageAccountElementPartial
                        hideBottomBorder
                        title={
                            <div className={"flex flex-col lg:flex-row"}>
                                Subdivision
                                <RenderIf
                                    truthValue={user?.user_data?.subdivision_code != "GER" && user?.user_data?.subdivision_code != null}
                                    elementTrue={guestTag}
                                />
                            </div>
                        }
                        element={
                            <Input
                                disabled
                                preIcon={<TbMapPin size={20} />}
                                className={"w-full"}
                                value={`${user?.user_data?.subdivision_name} (${user?.user_data?.subdivision_code})`}
                            />
                        }
                    />
                }
            />
        </>
    );
}
