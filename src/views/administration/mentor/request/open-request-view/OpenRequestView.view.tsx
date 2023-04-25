import {useParams} from "react-router-dom";
import {PageHeader} from "../../../../../components/ui/PageHeader/PageHeader";
import {useState} from "react";
import TrainingRequestAdminService from "../../../../../services/training-request/TrainingRequest.admin.service";

export function OpenRequestViewView()
{
    const {uuid: training_request_uuid} = useParams();
    const {trainingRequest, loading} = TrainingRequestAdminService.getByUUID(training_request_uuid);

    return (
        <>
            <PageHeader title={"Trainingsanfrage Ansehen"}/>

            <pre>
                {JSON.stringify(trainingRequest, null, 4)}
            </pre>
        </>
    )
}