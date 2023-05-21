import { Route, Routes, useLocation, Location } from "react-router-dom";
import { Overview } from "./authenticated/overview/Overview";
import { ManageAccountView } from "./authenticated/account/manage-account/ManageAccount.view";
import { Error403 } from "./errors/403";
import { Error404 } from "./errors/404";
import { CourseSearchListView } from "./authenticated/course/course-search-list/CourseSearchList.view";
import { AdministrationRouter } from "./administration/Administration.router";
import { ActiveCourseView } from "./authenticated/course/course-active-view/ActiveCourse.view";
import { ActiveCoursesListView } from "./authenticated/course/course-active-list/ActiveCoursesList.view";
import { CourseSearchView } from "./authenticated/course/course-search-view/CourseSearch.view";
import { TrainingOpenRequestListView } from "./authenticated/training/training-open-request-list/TrainingOpenRequestList.view";
import { TrainingOpenRequestViewView } from "./authenticated/training/training-open-request-view/TrainingOpenRequestView.view";

export function MainRouter() {
    const location: Location = useLocation();

    return (
        <Routes>
            <Route path={"overview"} element={<Overview />} />

            <Route path={"account"}>
                <Route path={"manage"} element={<ManageAccountView />} />
            </Route>

            <Route path={"course"}>
                <Route path={"search"}>
                    <Route path={""} element={<CourseSearchListView />} />
                    <Route path={":uuid"} element={<CourseSearchView />} />
                </Route>

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
            </Route>

            <Route path={"administration"}>
                <Route path={"*"} element={<AdministrationRouter />} />
            </Route>

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
