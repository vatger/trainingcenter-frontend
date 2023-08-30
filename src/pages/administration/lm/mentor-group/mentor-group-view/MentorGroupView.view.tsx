import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import MentorGroupAdminService from "../../../../../services/mentor-group/MentorGroupAdminService";
import { Card } from "@/components/ui/Card/Card";
import { useContext } from "react";
import authContext from "../../../../../utils/contexts/AuthContext";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import { MGVSettingsSubpage } from "./_subpages/MGVSettings.subpage";
import { MGVDangerSubpage } from "@/pages/administration/lm/mentor-group/mentor-group-view/_subpages/MGVDanger.subpage";
import { MGVUsersSubpage } from "@/pages/administration/lm/mentor-group/mentor-group-view/_subpages/MGVUsers.subpage";
import useApi from "@/utils/hooks/useApi";
import { MentorGroupModel } from "@/models/MentorGroupModel";

export function MentorGroupViewView() {
    const { id: mentor_group_id } = useParams();

    return (
        <>
            <PageHeader title={"Mentorengruppe Verwalten"} />

            <Card>
                <Tabs tabHeaders={["Einstellungen", "Mitglieder", "Gefahrenbereich"]} type={"underline"}>
                    <MGVSettingsSubpage mentorGroupID={mentor_group_id} />
                    <MGVUsersSubpage mentorGroupID={mentor_group_id} />
                    <MGVDangerSubpage />
                </Tabs>
            </Card>
        </>
    );
}
