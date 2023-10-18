import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { Card } from "@/components/ui/Card/Card";
import { TbCalendarEvent, TbPlus } from "react-icons/tb";
import { Input } from "@/components/ui/Input/Input";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import FormHelper from "@/utils/helper/FormHelper";
import { Separator } from "@/components/ui/Separator/Separator";
import { CommonRegexp } from "@/core/Config";
import { Table } from "@/components/ui/Table/Table";
import TSCListTypes from "@/pages/administration/atd/training-station/training-station-create/_types/TSCList.types";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import ToastHelper from "@/utils/helper/ToastHelper";
import { useNavigate } from "react-router-dom";

export function TrainingStationCreateView() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [stations, setStations] = useState<{ callsign: string }[]>([]);

    function addStation(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = FormHelper.getEntries(e.target);

        // Validate Callsign
        const callsign = data["callsign"];
        const active = data["active"];
        if (callsign == null || stations.find(s => s.callsign == callsign) != null) {
            return;
        }

        setStations([...stations, { callsign: callsign }]);
    }

    function createStations() {
        setSubmitting(true);

        axiosInstance
            .post("/administration/training-station", stations)
            .then(() => {
                ToastHelper.success("Stationen erfolgreich erstellt");
                navigate("/administration/training-station");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim erstellen der Stationen");
            })
            .finally(() => setSubmitting(false));
    }

    return (
        <>
            <PageHeader title={"Trainingsstation Erstellen"} hideBackLink />

            <Card>
                <form onSubmit={addStation}>
                    <Input
                        labelSmall
                        name={"callsign"}
                        fieldClassName={"uppercase"}
                        maxLength={12}
                        regex={CommonRegexp.CALLSIGN}
                        regexMatchEmpty
                        regexCheckInitial
                        required
                        label={"Callsign"}
                        preIcon={<TbCalendarEvent size={20} />}
                        placeholder={"EDDF_S_TWR"}
                    />

                    <Button
                        variant={"twoTone"}
                        disabled={submitting}
                        size={SIZE_OPTS.SM}
                        className={"mt-5"}
                        color={COLOR_OPTS.PRIMARY}
                        icon={<TbPlus size={20} />}
                        type={"submit"}>
                        Station Hinzufügen
                    </Button>
                </form>

                <Separator />

                <Table columns={TSCListTypes.getColumns(stations, setStations)} data={stations as any[]} />

                <Separator />

                <Button
                    variant={"twoTone"}
                    color={COLOR_OPTS.PRIMARY}
                    onClick={() => createStations()}
                    icon={<TbPlus size={20} />}
                    disabled={stations.length == 0}
                    loading={submitting}>
                    Stationen Erstellen
                </Button>
            </Card>
        </>
    );
}
