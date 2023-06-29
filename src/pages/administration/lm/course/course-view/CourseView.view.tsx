import { PageHeader } from "../../../../../components/ui/PageHeader/PageHeader";
import { useParams } from "react-router-dom";
import { Card } from "../../../../../components/ui/Card/Card";
import { Tabs } from "../../../../../components/ui/Tabs/Tabs";
import { CVSettingsSubpage } from "./_partials/CVSettings.subpage";
import { CVUsersSubpage } from "./_partials/CVUsers.subpage";
import CourseAdminService from "../../../../../services/course/CourseAdminService";
import { CVMentorgroupsSubpage } from "./_partials/CVMentorgroups.subpage";
import { CVDangerSubpage } from "./_partials/CVDanger.subpage";

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
                    <CVSettingsSubpage loading={loadingCourse} courseData={course} setCourseData={setCourse} />
                    <CVMentorgroupsSubpage
                        loading={loadingMentorGroups}
                        course_id={course?.id ?? -1}
                        mentorGroups={mentorGroups}
                        setMentorGroups={setMentorGroups}
                    />
                    <div></div>
                    <CVUsersSubpage loading={loadingUsers} users={users} setUsers={setUsers} course={course} />
                    <CVDangerSubpage uuid={uuid} />
                </Tabs>
            </Card>
        </>
    );
}
