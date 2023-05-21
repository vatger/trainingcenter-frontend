import { Card } from "../../../../../components/ui/Card/Card";
import { Table } from "../../../../../components/ui/Table/Table";
import React, { Dispatch } from "react";
import { DeleteTrainingRequestModalPartial } from "./DeleteTrainingRequestModal.partial";
import { TrainingRequestModel } from "../../../../../models/TrainingRequestModel";
import ActiveCourseTrainingRequestListTypes from "../_types/ActiveCourseTrainingRequestList.types";
import { useNavigate } from "react-router-dom";

type ActiveCourseTrainingRequestsPartialProps = {
    trainingRequests: TrainingRequestModel[];
    setTrainingRequests: Dispatch<TrainingRequestModel[]>;
    loadingTrainingRequests: boolean;
    deleteTrainingRequestModal: { show: boolean; trainingRequest?: TrainingRequestModel };
    setDeleteTrainingRequestModal: Dispatch<{ show: boolean; trainingRequest?: TrainingRequestModel }>;
};

export function ActiveCourseTrainingRequestsPartial(props: ActiveCourseTrainingRequestsPartialProps) {
    const navigate = useNavigate();
    const trainingRequestTableColumns = ActiveCourseTrainingRequestListTypes.getColumns(props.setDeleteTrainingRequestModal, navigate);

    return (
        <>
            <DeleteTrainingRequestModalPartial
                open={props.deleteTrainingRequestModal.show}
                trainingRequest={props.deleteTrainingRequestModal.trainingRequest}
                onClose={() => props.setDeleteTrainingRequestModal({ show: false, trainingRequest: undefined })}
                onDelete={(tr?: TrainingRequestModel) => {
                    if (tr == null) return;

                    const newRequests = props.trainingRequests.filter(t => {
                        return t.id != tr.id;
                    });
                    props.setTrainingRequests(newRequests);
                }}
            />

            <Card header={"Trainingsanfragen"} headerBorder className={"mt-5"}>
                <p className={"text-xs mb-2"}>
                    Du bekommst zum Ablaufdatum eine E-Mail von uns, in der Du dein weiteres Interesse an diesem Training bestätigen musst. Falls dies nicht
                    innerhalb von x Wochen bestätigt wird, verfällt deine Anfrage automatisch.
                </p>
                <Table paginate={false} columns={trainingRequestTableColumns} data={props.trainingRequests} loading={props.loadingTrainingRequests} />
            </Card>
        </>
    );
}
