import { RenderIf } from "../../../../../components/conditionals/RenderIf";
import { Alert } from "../../../../../components/ui/Alert/Alert";
import { COLOR_OPTS, SIZE_OPTS, TYPE_OPTS } from "../../../../../assets/theme.config";
import { TimeLine, TimeLineItem } from "../../../../../components/ui/Timeline/TimeLine";
import { MapArray } from "../../../../../components/conditionals/MapArray";
import { TrainingSessionModel } from "../../../../../models/TrainingSessionModel";
import { TbCalendar, TbCalendarStats, TbCheck, TbClipboardList, TbX } from "react-icons/all";
import { TrainingLogModel } from "../../../../../models/TrainingSessionBelongsToUser.model";
import { Link } from "react-router-dom";
import { Button } from "../../../../../components/ui/Button/Button";
import { Card } from "../../../../../components/ui/Card/Card";
import React, { ReactElement } from "react";
import dayjs from "dayjs";
import { Config } from "../../../../../core/Config";
import StringHelper from "../../../../../utils/helper/StringHelper";

type ActiveCourseTrainingHistoryPartialProps = {
    trainingData: TrainingSessionModel[];
};

function getStatusColor(t: TrainingSessionModel): string {
    if (t.TrainingSessionBelongsToUsers?.passed == null) {
        return "bg-gray-500";
    }

    if (t.TrainingSessionBelongsToUsers?.passed == true) {
        return "bg-emerald-500";
    } else {
        return "bg-red-500";
    }
}

function getStatusBadge(t: TrainingSessionModel): ReactElement {
    if (t.TrainingSessionBelongsToUsers?.passed == null) {
        return <TbCalendar className={"m-[5px]"} size={19} />;
    }

    if (t.TrainingSessionBelongsToUsers?.passed == true) {
        return <TbCheck className={"m-[5px]"} size={19} />;
    } else {
        return <TbX className={"m-[5px]"} size={19} />;
    }
}

export function CAVTrainingHistoryPartial(props: ActiveCourseTrainingHistoryPartialProps) {
    return (
        <Card header={"Trainingshistorie"} headerBorder className={"mt-5"}>
            <RenderIf
                truthValue={props.trainingData.length == 0}
                elementTrue={
                    <Alert type={TYPE_OPTS.WARNING} rounded showIcon>
                        Du hast in diesem Kurs noch kein abgeschlossenes oder geplantes Training.
                    </Alert>
                }
                elementFalse={
                    <TimeLine>
                        <MapArray
                            data={props.trainingData}
                            mapFunction={(value: TrainingSessionModel, index: number) => {
                                return (
                                    <TimeLineItem
                                        key={index}
                                        color={getStatusColor(value)}
                                        avatarIcon={getStatusBadge(value)}
                                        showConnectionLine={props.trainingData.length > 0 && index != props.trainingData.length - 1}>
                                        <div className={"flex justify-between w-full"}>
                                            <p className="my-1 flex items-center">
                                                <span className="font-semibold text-gray-900 dark:text-gray-100">
                                                    {`${value.training_type?.name} (${StringHelper.capitalize(value.training_type?.type) ?? "N/A"})`}
                                                </span>
                                            </p>
                                            <p className={"items-center mt-1"}>
                                                <span>{dayjs.utc(value.date).format(Config.DATETIME_FORMAT)}z</span>
                                            </p>
                                        </div>

                                        <RenderIf
                                            truthValue={value.TrainingSessionBelongsToUsers?.passed != null}
                                            elementTrue={
                                                <RenderIf
                                                    truthValue={value.TrainingSessionBelongsToUsers?.passed == true}
                                                    elementTrue={<p>Bestanden</p>}
                                                    elementFalse={<p>Nicht bestanden</p>}
                                                />
                                            }
                                        />

                                        <Button
                                            variant={"twoTone"}
                                            className={"mt-4 mr-2"}
                                            icon={<TbCalendarStats size={20} />}
                                            color={COLOR_OPTS.PRIMARY}
                                            size={SIZE_OPTS.SM}>
                                            Session Ansehen
                                        </Button>
                                        <RenderIf
                                            truthValue={value.training_logs?.find((log: TrainingLogModel) => log.log_public) != null}
                                            elementTrue={
                                                <Link
                                                    to={`/training/log/${
                                                        value.training_logs?.find(
                                                            (log: TrainingLogModel) => log.log_public && value.TrainingSessionBelongsToUsers?.log_id == log.id
                                                        )?.uuid ?? "-1"
                                                    }`}>
                                                    <Button
                                                        variant={"twoTone"}
                                                        className={"mt-4"}
                                                        icon={<TbClipboardList size={20} />}
                                                        color={COLOR_OPTS.PRIMARY}
                                                        size={SIZE_OPTS.SM}>
                                                        Log Ansehen
                                                    </Button>
                                                </Link>
                                            }
                                        />
                                    </TimeLineItem>
                                );
                            }}
                        />
                    </TimeLine>
                }
            />
        </Card>
    );
}
