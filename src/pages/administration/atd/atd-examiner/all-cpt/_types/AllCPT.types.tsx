import { TableColumn } from "react-data-table-component";
import { TrainingSessionModel } from "@/models/TrainingSessionModel";
import dayjs from "dayjs";
import { Config } from "@/core/Config";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { TbCircleCheck, TbEdit, TbTrash } from "react-icons/tb";
import { Dispatch, useState } from "react";
import { Badge } from "@/components/ui/Badge/Badge";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import ToastHelper from "@/utils/helper/ToastHelper";

function getColumns(
    cpts: TrainingSessionModel[] | undefined,
    setCPTs: Dispatch<TrainingSessionModel[]>
): (TableColumn<TrainingSessionModel> & { searchable?: boolean })[] {
    const [submitting, setSubmitting] = useState<boolean>(false);

    function deleteCPT(cptID: number) {
        if (cpts == null) return;
        setSubmitting(true);

        axiosInstance
            .delete("/administration/cpt", {
                data: {
                    cpt_id: cptID,
                },
            })
            .then(() => {
                ToastHelper.success("CPT erfolgreich gelöscht");
                setCPTs(cpts.filter(c => c.id !== cptID));
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Löschen des CPTs");
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
            name: "Station",
            selector: row => row.training_station?.callsign ?? "N/A",
        },
        {
            name: "Abgeschlossen",
            cell: row => (row.completed ? <Badge color={COLOR_OPTS.SUCCESS}>Ja</Badge> : <Badge color={COLOR_OPTS.DANGER}>Nein</Badge>),
        },
        {
            name: "Aktion",
            cell: row => {
                return (
                    <>
                        <Button
                            onClick={() => {}}
                            disabled={row.completed}
                            loading={submitting}
                            className={"my-3"}
                            size={SIZE_OPTS.SM}
                            variant={"twoTone"}
                            color={COLOR_OPTS.PRIMARY}
                            icon={<TbEdit size={20} />}></Button>

                        <Button
                            onClick={_ => {
                                deleteCPT(row.id);
                            }}
                            disabled={row.completed}
                            loading={submitting}
                            className={"my-3 ml-2"}
                            size={SIZE_OPTS.SM}
                            variant={"twoTone"}
                            color={COLOR_OPTS.DANGER}
                            icon={<TbTrash size={20} />}></Button>
                    </>
                );
            },
        },
    ];
}

export default {
    getColumns,
};
