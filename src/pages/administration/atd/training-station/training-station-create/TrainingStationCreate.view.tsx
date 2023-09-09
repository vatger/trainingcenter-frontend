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
import { COLOR_OPTS } from "@/assets/theme.config";

export function TrainingStationCreateView() {
    const [stations, setStations] = useState<{ callsign: string; frequency?: number }[]>([]);

    function addStation(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = FormHelper.getEntries(e.target);

        // Validate Callsign
        const callsign = data["callsign"];
        const frequency = data["frequency"];
        if (callsign == null || stations.find(s => s.callsign == callsign) != null) {
            return;
        }

        // Match Regex to check if this is even a callsign

        setStations([...stations, { callsign: callsign, frequency: frequency == null || frequency.length == 0 ? undefined : Number(frequency) }]);
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

                    <Input
                        labelSmall
                        name={"frequency"}
                        fieldClassName={"uppercase"}
                        maxLength={7}
                        className={"mt-5"}
                        label={"Frequenz (Optional)"}
                        description={
                            "Gebe hier die Frequenz ein, die dieser Station zugewiesen werden soll. Lässt du das Feld leer, befragen wir die auf der Homepage hinterlegten Daten und nutzen die dort hinterlegte Frequenz."
                        }
                        preIcon={<TbCalendarEvent size={20} />}
                        placeholder={"119.900"}
                    />

                    <Button variant={"twoTone"} className={"mt-5"} color={COLOR_OPTS.PRIMARY} icon={<TbPlus size={20} />} type={"submit"}>
                        Station Hinzufügen
                    </Button>
                </form>

                <Separator />

                <Table paginate columns={TSCListTypes.getColumns(stations, setStations)} data={stations as any[]} />
            </Card>
        </>
    );
}
