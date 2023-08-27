import { UserModel } from "@/models/UserModel";
import {
    LogTemplateElement,
    LogTemplateElementRating,
    LogTemplateElementSection,
    LogTemplateElementTextarea,
} from "@/pages/administration/atd/log-template/log-template-create/_types/LTCElement.types";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import React from "react";
import { ParticipantStatus } from "@/pages/administration/mentor/training-session/training-session-logs-create/TrainingSessionLogsCreate.view";
import { NavigateFunction } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import ToastHelper from "@/utils/helper/ToastHelper";

interface ITrainingSessionServiceProps {
    uuid: string;
    participants: UserModel[] | undefined;
    setSubmitting: React.Dispatch<boolean>;
    navigate: NavigateFunction;
    logTemplateElements: (LogTemplateElement & { uuid: string })[];
    participantValues: ParticipantStatus[] | undefined;
}

function SubmitTrainingLogs(data: ITrainingSessionServiceProps) {
    if (data.participants == null) {
        return;
    }

    data.setSubmitting(true);

    let result: { user_id: number; log_public: boolean; passed: boolean; user_log: LogTemplateElement[] }[] = [];

    // Loop through all participants
    for (let i = 0; i < data.participants.length; i++) {
        let user_log: LogTemplateElement[] = [];

        // For each element of the log templates...
        for (let j = 0; j < data.logTemplateElements.length; j++) {
            // The section has no value to add, so we can directly push it to the resulting array
            if (data.logTemplateElements[j].type == "section") {
                let log = { ...data.logTemplateElements[j] } as LogTemplateElementSection & { uuid?: string };
                delete log["uuid"];
                user_log.push({ ...log });
            }

            // If there is a textarea, we need to extract the text result and delete the UUID
            if (data.logTemplateElements[j].type == "textarea") {
                let log = { ...data.logTemplateElements[j] } as LogTemplateElementTextarea & { uuid?: string };
                log.text_content = data.participantValues?.[i].stringValues.get(data.logTemplateElements[j].uuid) ?? "N/A";

                delete log["uuid"];

                user_log.push({ ...log });
            }

            // If there is a rating, we need to extract the value and text and delete the UUID
            if (data.logTemplateElements[j].type == "rating") {
                let log = { ...data.logTemplateElements[j] } as LogTemplateElementRating & { uuid?: string };
                log.text_content = data.participantValues?.[i].stringValues.get(data.logTemplateElements[j].uuid) ?? "N/A";
                log.value = data.participantValues?.[i].progressValues.get(data.logTemplateElements[j].uuid) ?? 0;

                delete log["uuid"];

                user_log.push({ ...log });
            }
        }
        result.push({
            user_id: data.participants[i].id,
            log_public: true,
            passed: true,
            user_log: user_log,
        });
    }

    axiosInstance
        .put(`/administration/training-session/log/${data.uuid}`, result)
        .then((res: AxiosResponse) => {
            ToastHelper.success("Erfolg");
        })
        .catch((err: AxiosError) => {
            ToastHelper.error("Fehler");
        })
        .finally(() => data.setSubmitting(false));
}

export default {
    SubmitTrainingLogs,
};
