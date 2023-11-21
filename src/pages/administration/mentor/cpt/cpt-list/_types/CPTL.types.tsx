import { TableColumn } from "react-data-table-component";
import { TrainingSessionModel } from "@/models/TrainingSessionModel";
import dayjs from "dayjs";
import { Config } from "@/core/Config";
import { Badge } from "@/components/ui/Badge/Badge";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { Button } from "@/components/ui/Button/Button";
import { TbLogin, TbLogin2 } from "react-icons/tb";
import React, { Dispatch, useState } from "react";
import { UserModel } from "@/models/UserModel";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import ToastHelper from "@/utils/helper/ToastHelper";

function getColumns(
    user: UserModel | undefined,
    cptList: TrainingSessionModel[] | undefined,
    setCPTList: Dispatch<TrainingSessionModel[]>
): (TableColumn<TrainingSessionModel> & { searchable?: boolean })[] {
    const [submitting, setSubmitting] = useState<boolean>(false);

    function signUpAsBeisitzer(session_id: number) {
        if (user == null || cptList == null) {
            return;
        }
        setSubmitting(true);

        axiosInstance
            .post("/administration/cpt/mentor", { training_session_id: session_id })
            .then(() => {
                const newList = cptList?.map(t => {
                    if (t.id == session_id) {
                        t.mentor_id = user.id;

                        t.mentor = {
                            id: user.id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            createdAt: dayjs.utc().toDate(),
                        };
                    }

                    return t;
                });
                setCPTList(newList);
                ToastHelper.success("Erfolgreich als Beisitzer eingetragen");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Eintragen als Beisitzer");
            })
            .finally(() => setSubmitting(false));
    }

    function removeBeisitzer(session_id: number) {
        if (user == null || cptList == null) {
            return;
        }
        setSubmitting(true);

        axiosInstance
            .delete("/administration/cpt/mentor", { data: { training_session_id: session_id } })
            .then(() => {
                const newList = cptList?.map(t => {
                    if (t.id == session_id) {
                        t.mentor_id = undefined;
                        t.mentor = undefined;
                    }

                    return t;
                });
                setCPTList(newList);
                ToastHelper.success("Erfolgreich als Beisitzer ausgetragen");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Austragen als Beisitzer");
            })
            .finally(() => setSubmitting(false));
    }

    return [
        {
            name: "Datum (UTC)",
            selector: row => dayjs.utc(row.date).format(Config.DATETIME_FORMAT),
            sortable: true,
        },
        {
            name: "Mentor",
            selector: row => (row.mentor_id ? `${row.mentor?.first_name} ${row.mentor?.last_name} (${row.mentor_id})` : "N/A"),
            searchable: true,
        },
        {
            name: "Examiner",
            selector: row => (row.cpt_examiner_id ? `${row.cpt_examiner?.first_name} ${row.cpt_examiner?.last_name} (${row.cpt_examiner_id})` : "N/A"),
            searchable: true,
        },
        {
            name: "Trainee",
            selector: row => ((row.users?.length ?? []) > 0 ? `${row.users?.[0].first_name} ${row.users?.[0].last_name} (${row.users?.[0].id})` : "N/A"),
            searchable: true,
        },
        {
            name: "Station",
            selector: row => (row.training_station != null ? `${row.training_station.callsign} (${row.training_station.frequency.toFixed(3)})` : "N/A"),
            searchable: true,
        },
        {
            name: "Status",
            cell: row => {
                if (row.cpt_atsim_passed && row.mentor_id != null && row.cpt_examiner_id != null) {
                    return <Badge color={COLOR_OPTS.SUCCESS}>Bestätigt</Badge>;
                }

                if (row.mentor_id == null || row.cpt_examiner_id == null) {
                    return <Badge color={COLOR_OPTS.DANGER}>Kein Mentor / Prüfer</Badge>;
                }

                if (row.cpt_atsim_passed == false) {
                    return <Badge color={COLOR_OPTS.DANGER}>ATSIM Nicht bestanden</Badge>;
                }
            },
        },
        {
            name: "Aktion",
            cell: row => {
                if (row.mentor_id == user?.id) {
                    return (
                        <Button
                            className={"my-3"}
                            size={SIZE_OPTS.SM}
                            loading={submitting}
                            onClick={() => {
                                removeBeisitzer(row.id);
                            }}
                            variant={"twoTone"}
                            color={COLOR_OPTS.DANGER}
                            icon={<TbLogin size={20} />}>
                            Abmelden
                        </Button>
                    );
                }

                return (
                    <Button
                        className={"my-3"}
                        size={SIZE_OPTS.SM}
                        loading={submitting}
                        disabled={row.mentor_id != null}
                        onClick={() => {
                            signUpAsBeisitzer(row.id);
                        }}
                        variant={"twoTone"}
                        color={COLOR_OPTS.PRIMARY}
                        icon={<TbLogin2 size={20} />}>
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
