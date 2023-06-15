import { useParams } from "react-router-dom";
import { PageHeader } from "../../../../../components/ui/PageHeader/PageHeader";
import MentorGroupAdminService from "../../../../../services/mentor-group/MentorGroupAdminService";
import { Card } from "../../../../../components/ui/Card/Card";
import { useContext } from "react";
import authContext from "../../../../../utils/contexts/AuthContext";
import { RenderIf } from "../../../../../components/conditionals/RenderIf";
import { Tabs } from "../../../../../components/ui/Tabs/Tabs";
import { MentorGroupViewSettingsSubpage } from "./_subpages/MentorGroupViewSettings.subpage";

export function MentorGroupViewView() {
    const { id: mentor_group_id } = useParams();
    const { user } = useContext(authContext);
    const { mentorGroup, loading: loadingMentorGroup } = MentorGroupAdminService.getByID(mentor_group_id);

    return (
        <>
            <PageHeader title={"Mentorengruppe Verwalten"} />

            <RenderIf
                truthValue={loadingMentorGroup}
                elementTrue={<></>}
                elementFalse={
                    <Card>
                        <Tabs tabHeaders={["Einstellungen", "Mitglieder"]} type={"underline"}>
                            <MentorGroupViewSettingsSubpage mentorGroup={mentorGroup} loading={loadingMentorGroup} />
                            <></>
                        </Tabs>
                    </Card>
                }
            />
        </>
    );
}
