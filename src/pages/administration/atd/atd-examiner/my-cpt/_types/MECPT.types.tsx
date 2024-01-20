import { useNavigate } from "react-router-dom";
import { TableColumn } from "react-data-table-component";
import { TrainingSessionModel } from "@/models/TrainingSessionModel";
import dayjs from "dayjs";
import { Config } from "@/core/Config";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { TbEye, TbTrash } from "react-icons/tb";
import CPTBadgeHelper from "@/utils/helper/CPTBadgeHelper";
import { Dispatch, useState } from "react";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import ToastHelper from "@/utils/helper/ToastHelper";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";

function getColumns(
    myCPTs: TrainingSessionModel[],
    setMyCPTs: Dispatch<TrainingSessionModel[]>
): (TableColumn<TrainingSessionModel> & { searchable?: boolean })[] {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState<boolean>(false);

    function unregisterCPTExaminer(row: TrainingSessionModel) {
        axiosInstance
            .delete("/administration/cpt/examiner", {
                data: {
                    training_session_id: row.id,
                },
            })
            .then(() => {
                ToastHelper.success("Erfolgreich als Prüfer abgemeldet.");
                setMyCPTs(myCPTs.filter(t => t.id !== row.id));
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Austragen als Prüfer.");
            })
            .finally(() => setSubmitting(false));
    }

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
                    <div className={"flex"}>
                        <Tooltip content={"CPT Ansehen"}>
                            <Button
                                onClick={() => navigate(`/administration/atd-examiner/cpt/${row.uuid}`)}
                                disabled={submitting}
                                className={"my-3 mr-3"}
                                size={SIZE_OPTS.SM}
                                variant={"twoTone"}
                                color={COLOR_OPTS.PRIMARY}
                                icon={<TbEye size={20} />}></Button>
                        </Tooltip>

                        <Tooltip content={"Abmelden"}>
                            <Button
                                onClick={() => unregisterCPTExaminer(row)}
                                disabled={submitting}
                                className={"my-3"}
                                size={SIZE_OPTS.SM}
                                variant={"twoTone"}
                                color={COLOR_OPTS.DANGER}
                                icon={<TbTrash size={20} />}></Button>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];
}

export default {
    getColumns,
};
