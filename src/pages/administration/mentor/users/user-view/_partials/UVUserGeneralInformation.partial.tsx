import { UserModel } from "../../../../../../models/UserModel";
import { Badge } from "../../../../../../components/ui/Badge/Badge";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../../assets/theme.config";
import { Input } from "../../../../../../components/ui/Input/Input";
import { getAtcRatingLong, getAtcRatingShort } from "../../../../../../utils/helper/vatsim/AtcRatingHelper";
import { Button } from "../../../../../../components/ui/Button/Button";
import { TbChevronsRight, TbNote } from "react-icons/tb";
import { Card } from "../../../../../../components/ui/Card/Card";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getPilotRatingLong, getPilotRatingShort } from "../../../../../../utils/helper/vatsim/PilotRatingHelper";

export function UVUserGeneralInformationPartial(props: { user: UserModel | null }) {
    const navigate = useNavigate();
    let userData = props.user as UserModel;

    return (
        <Card
            header={"Allgemeine Informationen"}
            headerBorder
            headerExtra={userData?.user_data?.subdivision_code?.toLowerCase() !== "ger" ? <Badge color={COLOR_OPTS.PRIMARY}>Gast</Badge> : <></>}>
            <div className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"}>
                <Input label={"Name"} disabled value={`${userData?.first_name} ${userData?.last_name} (${userData.id})`} />

                <Input
                    label={"ATC Rating"}
                    disabled
                    value={`${getAtcRatingShort(userData?.user_data?.rating_atc ?? -1)} (${getAtcRatingLong(userData?.user_data?.rating_atc ?? -1)})`}
                />

                <Input
                    label={"Piloten Rating"}
                    disabled
                    value={`${getPilotRatingShort(userData?.user_data?.rating_pilot ?? -1)} (${getPilotRatingLong(userData?.user_data?.rating_pilot ?? -1)})`}
                />

                <Input label={"Region"} disabled value={`${userData?.user_data?.region_name} (${userData?.user_data?.region_code})`} />

                <Input label={"Division"} disabled value={`${userData?.user_data?.division_name} (${userData?.user_data?.division_code})`} />

                <Input
                    label={"Subdivision"}
                    disabled
                    value={
                        userData?.user_data?.subdivision_code ? `${userData?.user_data?.subdivision_name} (${userData?.user_data?.subdivision_code})` : "N/A"
                    }
                />
            </div>

            <div className={"flex flex-col lg:flex-row mt-7"}>
                <Button
                    icon={<TbChevronsRight size={20} />}
                    size={SIZE_OPTS.SM}
                    onClick={() => navigate("fast-track")}
                    variant={"twoTone"}
                    color={COLOR_OPTS.PRIMARY}>
                    Fast-Track Beantragen
                </Button>

                <Button
                    className={"mt-3 lg:mt-0 lg:ml-3"}
                    icon={<TbNote size={20} />}
                    size={SIZE_OPTS.SM}
                    onClick={() => navigate("notes")}
                    variant={"twoTone"}
                    color={COLOR_OPTS.PRIMARY}>
                    Notizen
                </Button>
            </div>
        </Card>
    );
}
