import { PageHeader } from "../../../../../components/ui/PageHeader/PageHeader";
import { useParams } from "react-router-dom";
import { Card } from "../../../../../components/ui/Card/Card";
import { Tabs } from "../../../../../components/ui/Tabs/Tabs";
import CourseAdminService from "../../../../../services/course/CourseAdminService";
import { CVSettingsSubpage } from "@/pages/administration/lm/course/course-view/_subpages/CVSettings.subpage";
import { CVMentorgroupsSubpage } from "@/pages/administration/lm/course/course-view/_subpages/CVMentorgroups.subpage";
import { CVUsersSubpage } from "@/pages/administration/lm/course/course-view/_subpages/CVUsers.subpage";
import { CVDangerSubpage } from "@/pages/administration/lm/course/course-view/_subpages/CVDanger.subpage";
import { CViewSettingsSkeleton } from "@/pages/administration/lm/course/_skeletons/CViewSettings.skeleton";
import React from "react";
import { RenderIf } from "@/components/conditionals/RenderIf";
import useApi from "@/utils/hooks/useApi";
import { CourseModel } from "@/models/CourseModel";
import { UserModel } from "@/models/UserModel";

const tabHeaders = ["Einstellungen", "Mentorgruppen", "Trainingstypen", "Aktionen & Bedingungen", "Teilnehmer", "Gefahrenbereich"];

export function CourseViewView() {
    const { uuid } = useParams();

    const {
        data: course,
        setData: setCourse,
        loading: loadingCourse,
    } = useApi<CourseModel>({
        url: "/administration/course/info",
        params: { uuid: uuid },
        method: "get",
    });

    const {
        data: users,
        setData: setUsers,
        loading: loadingUsers,
    } = useApi<UserModel[]>({
        url: "/administration/course/info/user",
        params: { uuid: uuid },
        method: "get",
    });

    return (
        <>
            <PageHeader title={"Kurs Verwalten"} />

            <RenderIf
                truthValue={loadingCourse || loadingUsers}
                elementTrue={
                    <Card>
                        <Tabs type={"underline"} disabled tabHeaders={tabHeaders}>
                            <CViewSettingsSkeleton />
                            <></>
                        </Tabs>
                    </Card>
                }
                elementFalse={
                    <Card>
                        <Tabs type={"underline"} tabHeaders={tabHeaders}>
                            <CVSettingsSubpage courseData={course!} setCourseData={setCourse} />
                            <CVMentorgroupsSubpage course_id={course?.id ?? -1} course_uuid={uuid} />
                            <div></div>
                            <div></div>
                            <CVUsersSubpage loading={loadingUsers} users={users ?? []} setUsers={setUsers} course={course} />
                            <CVDangerSubpage uuid={uuid} />
                        </Tabs>
                    </Card>
                }
            />
        </>
    );
}
