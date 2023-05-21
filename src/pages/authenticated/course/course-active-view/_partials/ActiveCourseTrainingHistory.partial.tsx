import { RenderIf } from "../../../../../components/conditionals/RenderIf";
import { Alert } from "../../../../../components/ui/Alert/Alert";
import { COLOR_OPTS, SIZE_OPTS, TYPE_OPTS } from "../../../../../assets/theme.config";
import { TimeLine, TimeLineItem } from "../../../../../components/ui/Timeline/TimeLine";
import { MapArray } from "../../../../../components/conditionals/MapArray";
import { TrainingSessionModel } from "../../../../../models/TrainingSessionModel";
import { TbClipboardList, TbX } from "react-icons/all";
import moment from "moment";
import { TrainingLogModel } from "../../../../../models/TrainingSessionBelongsToUser.model";
import { Link } from "react-router-dom";
import { Button } from "../../../../../components/ui/Button/Button";
import { Card } from "../../../../../components/ui/Card/Card";
import React from "react";

type ActiveCourseTrainingHistoryPartialProps = {
    trainingData: TrainingSessionModel[];
};

export function ActiveCourseTrainingHistoryPartial(props: ActiveCourseTrainingHistoryPartialProps) {
    return (
        <Card header={"Trainingshistorie"} headerBorder className={"mt-5"}>
            <RenderIf
                truthValue={props.trainingData.length == 0}
                elementTrue={
                    <Alert type={TYPE_OPTS.DANGER} rounded showIcon>
                        Du hast in diesem Kurs noch kein abgeschlossenes Training. Beantrage mit dem Knopf oben dein erstes Training!
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
                                        color={"bg-emerald-500"}
                                        avatarIcon={<TbX className={"m-[5px]"} size={19} />}
                                        showConnectionLine={props.trainingData.length > 0 && index != props.trainingData.length - 1}>
                                        <div className={"flex justify-between w-full"}>
                                            <p className="my-1 flex items-center">
                                                <span className="font-semibold text-gray-900 dark:text-gray-100">
                                                    {`${value.training_type?.name} (${value.training_type?.type ?? "lesson"})`}
                                                </span>
                                            </p>
                                            <p className={"items-center mt-1"}>
                                                <span>{moment(value.date).utc().format("DD.MM.YYYY")}</span>
                                            </p>
                                        </div>
                                        <div className="card mt-4 card-border">
                                            <div className="card-body">
                                                <p>{value.training_type?.training_stations?.toString()}</p>
                                            </div>
                                        </div>
                                        <RenderIf
                                            truthValue={value.training_logs?.find((log: TrainingLogModel) => log.log_public) != null}
                                            elementTrue={
                                                <Link to={`/log/${value.training_logs?.find((log: TrainingLogModel) => log.log_public)?.uuid ?? "undefined"}`}>
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
