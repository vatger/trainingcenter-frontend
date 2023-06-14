import { Card } from "../../../../../components/ui/Card/Card";
import { Table } from "../../../../../components/ui/Table/Table";
import React from "react";
import { TrainingRequestModel } from "../../../../../models/TrainingRequestModel";
import ActiveCourseTrainingRequestListTypes from "../_types/ActiveCourseTrainingRequestList.types";
import { useNavigate } from "react-router-dom";

type ActiveCourseTrainingRequestsPartialProps = {
    trainingRequests: TrainingRequestModel[];
    loadingTrainingRequests: boolean;
};

export function ActiveCourseTrainingRequestsPartial(props: ActiveCourseTrainingRequestsPartialProps) {
    const navigate = useNavigate();
    const trainingRequestTableColumns = ActiveCourseTrainingRequestListTypes.getColumns(navigate);

    return (
        <>
            <Card header={"Trainingsanfragen"} headerBorder className={"mt-5"}>
                <p className={"text-xs mb-2"}>
                    Du bekommst zum Ablaufdatum eine E-Mail von uns, in der Du dein weiteres Interesse an diesem Training bestätigen musst. Falls dies nicht
                    innerhalb von x Wochen bestätigt wird, verfällt deine Anfrage automatisch.
                </p>
                <Table
                    paginate={false}
                    columns={trainingRequestTableColumns}
                    data={props.trainingRequests.sort((a, b) => {
                        return a.status > b.status ? -1 : 1
                    })}
                    loading={props.loadingTrainingRequests}
                />
            </Card>
        </>
    );
}
