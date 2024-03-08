import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";
import { UsersRouter } from "@/routers/administration/Users.router";
import { TrainingRequestRouter } from "@/routers/administration/TrainingRequest.router";
import { TrainingSessionRouter } from "@/routers/administration/TrainingSession.router";
import { CourseRouter } from "@/routers/administration/Course.router";
import { MentorGroupRouter } from "@/routers/administration/MentorGroup.router";
import { TrainingTypeRouter } from "@/routers/administration/TrainingType.router";
import { SysLogRouter } from "@/routers/administration/SysLog.router";
import { PermissionRouter } from "@/routers/administration/Permission.router";
import { LogTemplateRouter } from "@/routers/administration/LogTemplate.router";
import { TrainingStationRouter } from "@/routers/administration/TrainingStation.router";
import { ActionRequirementRouter } from "@/routers/administration/ActionRequirement.router";
import { EndorsementGroupRouter } from "@/routers/administration/EndorsementGroup.router";
import { UserCourseProgressRouter } from "@/routers/administration/UserCourseProgress.router";
import { ATDExaminerRouter } from "@/routers/administration/ATDExaminer.router";
import { MentorCPTRouter } from "@/routers/administration/MentorCPT.router";
import { FastTrackRouter } from "@/routers/administration/FastTrack.router";
import { JobLogRouter } from "@/routers/administration/JobLog.router";

export function AdministrationRouter() {
    const location = useLocation();

    return (
        <Routes>
            <Route path={"users/*"} element={<UsersRouter />} />
            <Route path={"course/*"} element={<CourseRouter />} />
            <Route path={"user-course-progress/*"} element={<UserCourseProgressRouter />} />
            <Route path={"training-request/*"} element={<TrainingRequestRouter />} />
            <Route path={"cpt/*"} element={<MentorCPTRouter />} />
            <Route path={"training-session/*"} element={<TrainingSessionRouter />} />
            <Route path={"mentor-group/*"} element={<MentorGroupRouter />} />
            <Route path={"training-type/*"} element={<TrainingTypeRouter />} />
            <Route path={"log-template/*"} element={<LogTemplateRouter />} />
            <Route path={"training-station/*"} element={<TrainingStationRouter />} />
            <Route path={"action-requirement/*"} element={<ActionRequirementRouter />} />
            <Route path={"endorsement-group/*"} element={<EndorsementGroupRouter />} />
            <Route path={"atd-examiner/*"} element={<ATDExaminerRouter />} />
            <Route path={"fast-track/*"} element={<FastTrackRouter />} />

            <Route path={"syslog/*"} element={<SysLogRouter />} />
            <Route path={"joblog/*"} element={<JobLogRouter />} />
            <Route path={"permission/*"} element={<PermissionRouter />} />

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
