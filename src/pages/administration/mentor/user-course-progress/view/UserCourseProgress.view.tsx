import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/Card/Card";
import useApi from "@/utils/hooks/useApi";
import { UserModel } from "@/models/UserModel";
import { Input } from "@/components/ui/Input/Input";
import { TbCalendar, TbCheck, TbList, TbX } from "react-icons/tb";
import React from "react";
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

export function UserCourseProgressView() {
    const { user_id, course_uuid } = useParams();

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
                truthValue={loadingUser}
                elementTrue={<></>}
                elementFalse={
                    <>
                        <Card header={"Allgemeine Informationen"} headerBorder>
                            <div className={"grid grid-cols-1 md:grid-cols-2 md:gap-5"}>
                                <Input
                                    label={"Einschreibedatum (UTC)"}
                                    labelSmall
                                    preIcon={<TbCalendar size={20} />}
                                    disabled
                                    value={dayjs.utc(user?.courses?.[0].UsersBelongsToCourses?.createdAt).format(Config.DATETIME_FORMAT)}
                                />

                                <Input
                                    label={"Abgeschlossen"}
                                    labelSmall
                                    preIcon={user!.courses![0].UsersBelongsToCourses!.completed ? <TbCheck size={20} /> : <TbX size={20} />}
                                    disabled
                                    value={user!.courses![0].UsersBelongsToCourses!.completed ? "Ja" : "Nein"}
                                />

                                <Select
                                    label={"Nächstes Training"}
                                    labelSmall
                                    preIcon={<TbList size={20} />}
                                    defaultValue={user!.courses![0].UsersBelongsToCourses?.next_training_type}>
                                    <MapArray
                                        data={user!.courses![0].training_types ?? []}
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

                        <Card className={"mt-5"} header={"Trainingsanfragen"}>
                            <ul>
                                <li>Evtl. Liste der aktuellen Trainingsanfragen (vielleicht auch nur grobe Infos)</li>
                            </ul>
                        </Card>

                        <Card className={"mt-5"} header={"Trainingshistorie"}>
                            <ul>
                                <li>
                                    Liste der Trainingshistorie. Button mit link auf log, damit es schnell gefunden werden kann. (Anderes Design als für den
                                    Benutzer, einfach eine langweilige Liste)
                                </li>
                            </ul>
                        </Card>
                    </>
                }
            />
        </>
    );
}
