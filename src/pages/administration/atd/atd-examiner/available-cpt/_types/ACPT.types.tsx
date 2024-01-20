import { NavigateFunction, useNavigate } from "react-router-dom";
import { TableColumn } from "react-data-table-component";
import { TrainingSessionModel } from "@/models/TrainingSessionModel";
import dayjs from "dayjs";
import { Config } from "@/core/Config";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { TbCircleCheck, TbEye } from "react-icons/tb";
import CPTBadgeHelper from "@/utils/helper/CPTBadgeHelper";
import { Dispatch, useContext, useState } from "react";
import authContext from "@/utils/contexts/AuthContext";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import ToastHelper from "@/utils/helper/ToastHelper";

function getColumns(
    setShowRegisterModal: Dispatch<boolean>,
    setSelectedCPT: Dispatch<undefined | TrainingSessionModel>
): (TableColumn<TrainingSessionModel> & { searchable?: boolean })[] {
    const [submitting, setSubmitting] = useState<boolean>(false);

    return [
        {
            name: "Datum (UTC)",
            selector: row => dayjs.utc(row.date).format(Config.DATETIME_FORMAT),
            sortable: true,
            searchable: true,
        },
        {
            name: "Trainee",
            selector: row => row.users?.map(u => `${u.first_name} ${u.last_name} (${u.id})`).join(",") ?? "N/A",
        },
        {
            name: "Mentor",
            selector: row => (row.mentor ? `${row.mentor?.first_name} ${row.mentor?.last_name} (${row.mentor?.id})` : "N/A"),
        },
        {
            name: "Prüfer",
            selector: row => (row.cpt_examiner ? `${row.cpt_examiner.first_name} ${row.cpt_examiner.last_name} (${row.cpt_examiner_id})` : "N/A"),
        },
        {
            name: "Station",
            selector: row => row.training_station?.callsign ?? "N/A",
        },
        {
            name: "Status",
            cell: row => CPTBadgeHelper.getBadge(row),
        },
        {
            name: "Aktion",
            cell: row => {
                return (
                    <Button
                        onClick={() => {
                            setShowRegisterModal(true);
                            setSelectedCPT(row);
                        }}
                        disabled={submitting}
                        className={"my-3"}
                        size={SIZE_OPTS.SM}
                        variant={"twoTone"}
                        color={COLOR_OPTS.PRIMARY}
                        icon={<TbCircleCheck size={20} />}>
                        Anmelden
                    </Button>
                );
            },
        },
    ];
}

export default {
    getColumns,
};
