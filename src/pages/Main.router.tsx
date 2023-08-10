import { Location, Route, Routes, useLocation } from "react-router-dom";
import { Overview } from "./authenticated/overview/Overview";
import { ManageAccountView } from "./authenticated/account/manage-account/ManageAccount.view";
import { Error403 } from "./errors/403";
import { Error404 } from "./errors/404";
import { AdministrationRouter } from "./administration/Administration.router";
import { ActiveCourseView } from "./authenticated/course/course-active-view/ActiveCourse.view";
import { ActiveCoursesListView } from "./authenticated/course/course-active-list/ActiveCoursesList.view";
import { TrainingOpenRequestListView } from "./authenticated/training/training-open-request-list/TrainingOpenRequestList.view";
import { TrainingOpenRequestViewView } from "./authenticated/training/training-open-request-view/TrainingOpenRequestView.view";
import { PlannedTrainingListView } from "./authenticated/training/training-planned-list/PlannedTrainingList.view";
import { PlannedTrainingView } from "./authenticated/training/training-planned-view/PlannedTrainingView.view";
import { CourseEnrolView } from "@/pages/authenticated/course/course-enrol/CourseEnrol.view";
import { CourseView } from "@/pages/authenticated/course/course-view/Course.view";
import { CourseListView } from "@/pages/authenticated/course/course-list/CourseList.view";

export function MainRouter() {
    const location: Location = useLocation();

    return (
        <Routes>
            <Route path={"overview"} element={<Overview />} />

            <Route path={"account"}>
                <Route path={"manage"} element={<ManageAccountView />} />
            </Route>

            <Route path={"course"}>
                <Route path={""} element={<CourseListView />} />
                <Route path={":uuid"} element={<CourseView />} />
                <Route path={":uuid/enrol"} element={<CourseEnrolView />} />

                <Route path={"active"}>
                    <Route path={""} element={<ActiveCoursesListView />} />
                    <Route path={":uuid"} element={<ActiveCourseView />} />
                </Route>
            </Route>

            <Route path={"training"}>
                <Route path={"request"}>
                    <Route path={"open"} element={<TrainingOpenRequestListView />} />
                    <Route path={":uuid"} element={<TrainingOpenRequestViewView />} />
                </Route>

                <Route path={"planned"}>
                    <Route path={""} element={<PlannedTrainingListView />} />
                    <Route path={":uuid"} element={<PlannedTrainingView />} />
                </Route>
            </Route>

            <Route path={"administration"}>
                <Route path={"*"} element={<AdministrationRouter />} />
            </Route>

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
