import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/Card/Card";
import useApi from "@/utils/hooks/useApi";
import { UserModel } from "@/models/UserModel";
import { Input } from "@/components/ui/Input/Input";
import {TbCalendar, TbCheck, TbId, TbList, TbX} from "react-icons/tb";
import React, {useState} from "react";
import dayjs from "dayjs";
import { Config } from "@/core/Config";
import { Select } from "@/components/ui/Select/Select";
import { MapArray } from "@/components/conditionals/MapArray";
import { TrainingTypeModel } from "@/models/TrainingTypeModel";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { Button } from "@/components/ui/Button/Button";
import { FaSave } from "react-icons/fa";
import { COLOR_OPTS } from "@/assets/theme.config";
import { BiSave } from "react-icons/bi";
import {CourseModel} from "@/models/CourseModel";
import {Table} from "@/components/ui/Table/Table";
import UCPRequestsTypes from "@/pages/administration/mentor/user-course-progress/view/_types/UCPRequests.types";
import UCPHistoryTypes from "@/pages/administration/mentor/user-course-progress/view/_types/UCPHistory.types";

export function UserCourseProgressView() {
    const { user_id, course_uuid } = useParams();

    const [completed, setCompleted] = useState<boolean>(false);

    const { data: user, loading: loadingUser } = useApi<UserModel>({
        url: "/administration/user-course-progress",
        method: "get",
        params: {
            course_uuid: course_uuid,
            user_id: user_id,
        },
    });

    return (
        <>
            <PageHeader title={"Kurs Fortschritt"} breadcrumbs={user_id} />

            <RenderIf
                truthValue={loadingUser || user == null}
                elementTrue={<></>}
                elementFalse={
                    <>
                        <Card header={"Allgemeine Informationen"} headerBorder>
                            <div className={"grid grid-cols-1 md:grid-cols-2 md:gap-5"}>
                                <Input
                                    label={"Benutzer"}
                                    labelSmall
                                    preIcon={<TbId size={20}/>}
                                    disabled
                                    value={`${user?.first_name} ${user?.last_name}`}
                                />

                                <Input
                                    label={"Einschreibedatum (UTC)"}
                                    labelSmall
                                    preIcon={<TbCalendar size={20} />}
                                    disabled
                                    value={dayjs.utc(user?.courses![0].UsersBelongsToCourses?.createdAt).format(Config.DATETIME_FORMAT)}
                                />

                                <Select
                                    label={"Abgeschlossen"}
                                    labelSmall
                                    preIcon={<TbCheck size={20} />}
                                    onChange={(e) => setCompleted(e == "1")}
                                    defaultValue={user?.courses![0].UsersBelongsToCourses?.completed ? "1" : "0"}>
                                    <option value="0">Nein</option>
                                    <option value="1">Ja</option>
                                </Select>

                                <Select
                                    label={"Nächstes Training"}
                                    labelSmall
                                    disabled={user?.courses![0].UsersBelongsToCourses?.completed || completed}
                                    preIcon={<TbList size={20} />}
                                    defaultValue={user?.courses![0].UsersBelongsToCourses?.next_training_type}
                                    >
                                    <MapArray
                                        data={user?.courses![0].training_types ?? []}
                                        mapFunction={(trainingType: TrainingTypeModel, index) => {
                                            return (
                                                <option key={index} value={trainingType.id}>
                                                    {trainingType.name} ({trainingType.type})
                                                </option>
                                            );
                                        }}
                                    />
                                </Select>
                            </div>

                            <Button className={"mt-5"} variant={"twoTone"} color={COLOR_OPTS.PRIMARY} icon={<BiSave size={20} />}>
                                Änderungen Speichern
                            </Button>
                        </Card>

                        <Card className={"mt-5"} headerBorder header={"Trainingsanfragen"}>
                            <Table columns={UCPRequestsTypes.getColumns()} data={user?.training_requests ?? []}/>
                        </Card>

                        <Card className={"mt-5"} header={"Trainingshistorie"}>
                            <Table paginate columns={UCPHistoryTypes.getColumns(user?.training_logs ?? [])} data={user?.training_sessions ?? []}/>
                        </Card>
                    </>
                }
            />
        </>
    );
}
