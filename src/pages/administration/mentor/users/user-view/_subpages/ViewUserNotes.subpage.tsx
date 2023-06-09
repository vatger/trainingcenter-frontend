import { PageHeader } from "../../../../../../components/ui/PageHeader/PageHeader";
import { Card } from "../../../../../../components/ui/Card/Card";
import { Button } from "../../../../../../components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../../assets/theme.config";
import { TbEdit, TbPlus, TbTrash } from "react-icons/all";
import React, { useContext, useRef, useState } from "react";
import { UserNoteSkeleton } from "../_skeletons/UserNote.skeleton";
import { Separator } from "../../../../../../components/ui/Separator/Separator";
import { RenderIf } from "../../../../../../components/conditionals/RenderIf";
import { MapArray } from "../../../../../../components/conditionals/MapArray";
import UserNoteAdminService from "../../../../../../services/user/UserNoteAdminService";
import { useParams } from "react-router-dom";
import { UserNoteModel } from "../../../../../../models/UserNoteModel";
import moment from "moment";
import authContext from "../../../../../../utils/contexts/AuthContext";
import { UserModel } from "../../../../../../models/UserModel";
import { Input } from "../../../../../../components/ui/Input/Input";
import { Select } from "../../../../../../components/ui/Select/Select";
import UserAdminService from "../../../../../../services/user/UserAdminService";
import { CourseModel } from "../../../../../../models/CourseModel";
import { AxiosError, AxiosResponse } from "axios";
import ToastHelper from "../../../../../../utils/helper/ToastHelper";
import dayjs from "dayjs";
import { Config } from "../../../../../../core/Config";
import { CreateUserNotePartial } from "../_partials/CreateUserNote.partial";

export function ViewUserNotesView() {
    const { user_id } = useParams();
    const { user } = useContext(authContext);

    const [showCreateNoteModal, setShowCreateModal] = useState<boolean>(false);

    const { userNotes, setUserNotes, loading: loadingUserNotes } = UserNoteAdminService.getGeneralUserNotes(user_id);

    const { courses, loading: loadingUserCourses } = UserAdminService.getUserCoursesMatch(user?.id);
    const [courseNotes, setCourseNotes] = useState<UserNoteModel[]>([]);
    const [loadingCourseNotes, setLoadingCourseNotes] = useState<boolean>(false);
    const courseNoteCache = useRef<Map<string, UserNoteModel[]>>(new Map<string, UserNoteModel[]>());
    function handleCourseChange(value: string) {
        if (value == "-1") {
            setCourseNotes([]);
            return;
        }

        if (courseNoteCache.current.has(value)) {
            setCourseNotes(courseNoteCache.current.get(value) ?? []);
            return;
        }

        setLoadingCourseNotes(true);

        UserAdminService.getUserNotesByCourseID(Number(value), user?.id)
            .then((res: AxiosResponse) => {
                setCourseNotes(res.data as UserNoteModel[]);
                courseNoteCache.current.set(value, res.data as UserNoteModel[]);
            })
            .catch((err: AxiosError) => {
                ToastHelper.error("Fehler beim Laden der kursspezifischen Notizen");
            })
            .finally(() => setLoadingCourseNotes(false));
    }

    return (
        <>
            <PageHeader title={"Benutzer Notizen"} />

            <Card
                header={"Kursnotizen"}
                headerBorder
                headerExtra={
                    <Button
                        size={SIZE_OPTS.XS}
                        onClick={() => setShowCreateModal(true)}
                        variant={"twoTone"}
                        color={COLOR_OPTS.PRIMARY}
                        icon={<TbPlus size={20} />}>
                        Notiz Erstellen
                    </Button>
                }>
                <Select
                    labelSmall
                    defaultValue={"-1"}
                    onChange={handleCourseChange}
                    disabled={loadingCourseNotes}
                    label={"Kurs"}
                    description={"Wähle einen Kurs aus um dir die entsprechenden Notizen anzusehen"}>
                    <option value="-1" selected>
                        Kurs Auswählen
                    </option>
                    <MapArray
                        data={courses}
                        mapFunction={(value: CourseModel, index: number) => {
                            return (
                                <option key={index} value={value.id}>
                                    {value.name}
                                </option>
                            );
                        }}
                    />
                </Select>

                {renderCourseNotes(courseNotes, loadingCourseNotes, user)}
            </Card>

            <Card className={"mt-5"} header={"Notizen"} headerBorder>
                <RenderIf
                    truthValue={loadingUserNotes}
                    elementTrue={
                        <MapArray
                            data={Array(4).fill(0)}
                            mapFunction={(value, index) => {
                                return <UserNoteSkeleton key={index} isFirst={index == 0} />;
                            }}
                        />
                    }
                    elementFalse={renderUserNotes(userNotes, user)}
                />
            </Card>

            <CreateUserNotePartial
                show={showCreateNoteModal}
                onCreate={(userNote: UserNoteModel) => {
                    // Check if course is present
                    if (userNote.course_id != null) {
                        // Now check the cache if we have this
                        const key = userNote.course_id.toString();
                        if (courseNoteCache.current.has(key)) {
                            let notes = courseNoteCache.current.get(key);
                            courseNoteCache.current.set(key, [...(notes ?? []), userNote]);

                            if (courseNotes.length > 0 && courseNotes[0].course_id == userNote.course_id) {
                                setCourseNotes(courseNoteCache.current.get(key) ?? []);
                            }
                        }

                        return;
                    }

                    // If is has no course_id, then we can just add it to the array of things
                    setUserNotes([...userNotes, userNote]);
                }}
                onClose={() => setShowCreateModal(false)}
                courses={courses}
                user={user}
            />
        </>
    );
}

function renderCourseNotes(courseNotes: UserNoteModel[], loadingCourseNotes: boolean, user?: UserModel) {
    return (
        <>
            <RenderIf
                truthValue={loadingCourseNotes}
                elementTrue={
                    <>
                        <Separator />
                        <UserNoteSkeleton isFirst />
                    </>
                }
            />

            <RenderIf
                truthValue={courseNotes.length > 0}
                elementTrue={
                    <>
                        <Separator />

                        {renderUserNotes(courseNotes, user)}
                    </>
                }
            />
        </>
    );
}

function renderUserNotes(userNotes: UserNoteModel[], user?: UserModel) {
    return (
        <MapArray
            data={userNotes}
            mapFunction={(value: UserNoteModel, index) => {
                return (
                    <>
                        <RenderIf truthValue={index > 0} elementTrue={<Separator />} />

                        <div className={"mb-3"}>
                            <div className={"flex justify-between"}>
                                <div className={"flex flex-col"}>
                                    <h6>
                                        {value.author?.first_name + " " + value.author?.last_name} &#x2022;{" "}
                                        {dayjs.utc(value.createdAt).format(Config.DATETIME_FORMAT)}
                                    </h6>
                                    <pre className={"text-gray-400 dark:text-gray-400"}>{value.uuid}</pre>
                                </div>
                                <RenderIf
                                    truthValue={value.author?.id == user?.id}
                                    elementTrue={
                                        <div className={"flex flex-row"}>
                                            <Button
                                                size={SIZE_OPTS.SM}
                                                className={"my-auto mr-2"}
                                                icon={<TbEdit size={20} />}
                                                variant={"twoTone"}
                                                color={COLOR_OPTS.PRIMARY}></Button>
                                            <Button
                                                size={SIZE_OPTS.SM}
                                                className={"my-auto"}
                                                icon={<TbTrash size={20} />}
                                                variant={"twoTone"}
                                                color={COLOR_OPTS.DANGER}></Button>
                                        </div>
                                    }
                                />
                            </div>
                            <div className={"mt-3"}>{value.content}</div>
                        </div>
                    </>
                );
            }}
        />
    );
}
