import { Location, Route, Routes, useLocation } from "react-router-dom";
import { UserListView } from "./mentor/users/user-search/UserList.view";
import { UserViewView } from "./mentor/users/user-view/UserView.view";
import { RequestFastTrackView } from "./mentor/users/user-view/_partials/UVRequestFastTrack.subpage";
import { AdminCourseListView } from "./lm/course/course-list/CourseList.view";
import { CourseCreateView } from "./lm/course/course-create/CourseCreate.view";
import { CourseViewView } from "./lm/course/course-view/CourseView.view";
import { TrainingTypeListView } from "./lm/training-type/training-type-list/TrainingTypeList.view";
import { TrainingTypeCreateView } from "./lm/training-type/training-type-create/TrainingTypeCreate.view";
import { SyslogListView } from "./tech/syslog/syslog-list/SyslogList.view";
import { PermissionListView } from "./tech/permission/permission-list/PermissionList.view";
import { Error403 } from "../errors/403";
import { Error404 } from "../errors/404";
import { RoleViewView } from "./tech/permission/role-view/RoleView.view";
import { LogTemplateCreateView } from "./atd/log-template/log-template-create/LogTemplateCreate.view";
import { MentorGroupCreateView } from "./lm/mentor-group/mentor-group-create/MentorGroupCreate.view";
import { MentorGroupListView } from "./lm/mentor-group/mentor-group-list/MentorGroupList.view";
import { SyslogViewView } from "./tech/syslog/syslog-view/SyslogView.view";
import { TrainingTypeViewView } from "./lm/training-type/training-type-view/TrainingTypeView.view";
import { MentorGroupViewView } from "./lm/mentor-group/mentor-group-view/MentorGroupView.view";
import { ViewUserNotesView } from "./mentor/users/user-view/_partials/UVViewUserNotes.subpage";
import { OpenTrainingRequestList } from "./mentor/request/open-training-request-list/OpenTrainingRequestList";
import { OpenTrainingRequestView } from "./mentor/request/open-training-request-view/OpenTrainingRequest.view";
import { TrainingSessionCreateFromRequestView } from "@/pages/administration/mentor/training-session/training-session-create/TrainingSessionCreateFromRequest.view";
import { MentorTrainingListView } from "@/pages/administration/mentor/training-session/trainining-planned-list/MentorTrainingList.view";
import { MentorTrainingView } from "@/pages/administration/mentor/training-session/training-planned-view/MentorTraining.view";
import { TrainingSessionLogsCreateView } from "@/pages/administration/mentor/training-session/training-session-logs-create/TrainingSessionLogsCreate.view";
import { TrainingSessionCreateView } from "@/pages/administration/mentor/training-session/training-session-create/TrainingSessionCreate.view";

export function AdministrationRouter() {
    const location: Location = useLocation();

    return (
        <Routes>
            <Route path={"users"}>
                <Route path={"search"} element={<UserListView />} />

                <Route path={":user_id"}>
                    <Route path={""} element={<UserViewView />} />
                    <Route path={"fast-track"} element={<RequestFastTrackView />} />
                    <Route path={"notes"} element={<ViewUserNotesView />} />
                </Route>
            </Route>

            <Route path={"training-request"}>
                <Route path={"open"}>
                    <Route path={""} element={<OpenTrainingRequestList />} />
                    <Route path={":uuid"} element={<OpenTrainingRequestView />} />
                </Route>

                <Route path={"planned"}>
                    <Route path={""} element={<MentorTrainingListView />} />
                    <Route path={":uuid"} element={<MentorTrainingView />} />
                    <Route path={":uuid/logs-create"} element={<TrainingSessionLogsCreateView />} />
                </Route>
            </Route>

            <Route path={"training-session"}>
                <Route path={"create"} element={<TrainingSessionCreateView />} />
                <Route path={"create/:uuid"} element={<TrainingSessionCreateFromRequestView />} />
            </Route>

            <Route path={"course"}>
                <Route path={""} element={<AdminCourseListView />} />
                <Route path={"create"} element={<CourseCreateView />} />
                <Route path={":uuid"} element={<CourseViewView />} />
            </Route>

            <Route path={"mentor-group"}>
                <Route path={""} element={<MentorGroupListView />} />
                <Route path={"create"} element={<MentorGroupCreateView />} />
                <Route path={":id"} element={<MentorGroupViewView />} />
            </Route>

            <Route path={"training-type"}>
                <Route path={""} element={<TrainingTypeListView />} />
                <Route path={"create"} element={<TrainingTypeCreateView />} />
                <Route path={":id"} element={<TrainingTypeViewView />} />
            </Route>

            <Route path={"log-template"}>
                <Route path={""} element={<> </>} />
                <Route path={"create"} element={<LogTemplateCreateView />} />
            </Route>

            <Route path={"syslog"}>
                <Route path={""} element={<SyslogListView />} />
                <Route path={":id"} element={<SyslogViewView />} />
            </Route>

            <Route path={"permission"}>
                <Route path={""} element={<PermissionListView />} />
                <Route path={"roles/:role_id"} element={<RoleViewView />} />
            </Route>

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
