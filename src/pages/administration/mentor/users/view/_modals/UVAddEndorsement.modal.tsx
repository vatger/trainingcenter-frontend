import { Modal } from "@/components/ui/Modal/Modal";
import { Select } from "@/components/ui/Select/Select";
import { Accordion } from "@/components/ui/Accordion/Accordion";
import { Table } from "@/components/ui/Table/Table";
import { EndorsementGroupModel } from "@/models/EndorsementGroupModel";
import { MapArray } from "@/components/conditionals/MapArray";
import React, { Dispatch, FormEvent, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { TrainingStationModel } from "@/models/TrainingStationModel";
import { UserModel } from "@/models/UserModel";
import { Separator } from "@/components/ui/Separator/Separator";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { Input } from "@/components/ui/Input/Input";
import dayjs from "dayjs";
import { Button } from "@/components/ui/Button/Button";
import { TbPlus } from "react-icons/tb";
import { COLOR_OPTS } from "@/assets/theme.config";
import FormHelper from "@/utils/helper/FormHelper";

const StationTableColumns: TableColumn<TrainingStationModel>[] = [
    {
        name: "Station",
        selector: row => row.callsign.toUpperCase(),
        sortable: true,
    },
    {
        name: "Frequenz",
        selector: row => row.frequency.toFixed(3),
        sortable: true,
    },
];

export function UVAddEndorsementModal({
    setUser,
    endorsementGroups,
    userEndorsementGroups,
    show,
    onClose,
}: {
    setUser: Dispatch<UserModel>;
    endorsementGroups: EndorsementGroupModel[];
    userEndorsementGroups?: EndorsementGroupModel[];
    show: boolean;
    onClose: () => any;
}) {
    const [selectedEndorsementGroup, setSelectedEndorsementGroup] = useState<EndorsementGroupModel | undefined>(undefined);
    const [soloSelected, setSoloSelected] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);

    function addEndorsement(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (selectedEndorsementGroup == null) return;
        //setSubmitting(true);

        const data = FormHelper.getEntries(e.target);
        data["solo"] = data["solo"] == "on";

        console.log(data);
    }

    return (
        <form onSubmit={addEndorsement}>
            <Modal
                show={show}
                onClose={() => {
                    setSelectedEndorsementGroup(undefined);
                    setSoloSelected(false);
                    onClose();
                }}
                title={"Freigabegruppe Hinzufügen"}
                footer={
                    <div className={"flex justify-end mt-5"}>
                        <Button
                            icon={<TbPlus size={20} />}
                            disabled={selectedEndorsementGroup == null}
                            loading={submitting}
                            variant={"twoTone"}
                            type={"submit"}
                            color={COLOR_OPTS.PRIMARY}>
                            Hinzufügen
                        </Button>
                    </div>
                }>
                <Select
                    label={"Freigabegruppe Wählen"}
                    name={"endorsement_group_id"}
                    labelSmall
                    onChange={v => {
                        const endorsementGroupID = Number(v);
                        if (isNaN(endorsementGroupID) || endorsementGroupID == -1) return;

                        setSelectedEndorsementGroup(endorsementGroups.find(e => e.id == endorsementGroupID));
                    }}
                    defaultValue={"-1"}>
                    <option value="-1" disabled>
                        Freigabegruppe Auswählen
                    </option>
                    <MapArray
                        data={endorsementGroups.filter(eg => {
                            return userEndorsementGroups?.find(ueg => ueg.id == eg.id) == null;
                        })}
                        mapFunction={(endorsementGroup: EndorsementGroupModel, index: number) => {
                            return (
                                <option disabled={endorsementGroup.stations?.length == 0} key={index} value={endorsementGroup.id}>
                                    {endorsementGroup.name} {endorsementGroup.stations?.length == 0 ? " - Keine Stationen" : ""}
                                </option>
                            );
                        }}
                    />
                </Select>

                <Accordion className={"mt-3"} title={`Stationen (${selectedEndorsementGroup?.stations?.length ?? 0})`}>
                    <div className={"p-3"}>
                        <Table persistTableHead={false} columns={StationTableColumns} defaultSortField={1} data={selectedEndorsementGroup?.stations ?? []} />
                    </div>
                </Accordion>

                <Separator />

                <Checkbox checked={false} name={"solo"} onChange={e => setSoloSelected(e)}>
                    Solo?
                </Checkbox>

                <RenderIf
                    truthValue={soloSelected}
                    elementTrue={
                        <Input
                            label={"Solo Ende (TODO - VATEUD)"}
                            name={"solo_end_date"}
                            className={"mt-3"}
                            type={"datetime-local"}
                            value={dayjs().utc().add(1, "month").format("YYYY-MM-DD HH:mm")} // TODO - VATEUD
                            labelSmall
                        />
                    }
                />
            </Modal>
        </form>
    );
}
