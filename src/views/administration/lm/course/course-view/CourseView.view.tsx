import { PageHeader } from "../../../../../components/ui/PageHeader/PageHeader";
import { useParams } from "react-router-dom";
import { Card } from "../../../../../components/ui/Card/Card";
import { Tabs } from "../../../../../components/ui/Tabs/Tabs";
import { CourseViewSettingsSubpage } from "./_subpages/CourseViewSettings.subpage";
import { CourseViewUsersSubpage } from "./_subpages/CourseViewUsers.subpage";
import CourseAdminService from "../../../../../services/course/Course.admin.service";
import { CourseViewMentorgroupsSubpage } from "./_subpages/CourseViewMentorgroups.subpage";
import { CourseViewDangerSubpage } from "./_subpages/CourseViewDanger.subpage";

const tabHeaders = ["Einstellungen", "Mentorgruppen", "Aktionen & Bedingungen", "Teilnehmer", "Gefahrenbereich"];

export function CourseViewView() {
    const { uuid } = useParams();

    const { course, setCourse, loading: loadingCourse } = CourseAdminService.getInformationByUUID(uuid);
    const { users, setUsers, loading: loadingUsers } = CourseAdminService.getUsersByUUID(uuid);
    const { mentorGroups, setMentorGroups, loading: loadingMentorGroups } = CourseAdminService.getMentorGroupsByUUID(uuid);

    return (
        <>
            <PageHeader title={"Kurs Verwalten"} />

            <Card>
                <Tabs type={"underline"} tabHeaders={tabHeaders}>
                    <CourseViewSettingsSubpage loading={loadingCourse} courseData={course} setCourseData={setCourse} />
                    <CourseViewMentorgroupsSubpage
                        loading={loadingMentorGroups}
                        course_id={course?.id ?? -1}
                        mentorGroups={mentorGroups}
                        setMentorGroups={setMentorGroups}
                    />
                    <div></div>
                    <CourseViewUsersSubpage loading={loadingUsers} users={users} setUsers={setUsers} course={course} />
                    <CourseViewDangerSubpage uuid={uuid} />
                </Tabs>
            </Card>
        </>
    );
}
