import { Modal } from "@/components/ui/Modal/Modal";
import { UserModel, UserSoloModel } from "@/models/UserModel";
import { Input } from "@/components/ui/Input/Input";
import { Separator } from "@/components/ui/Separator/Separator";
import dayjs from "dayjs";
import React, { Dispatch, FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { TbPlaylistAdd } from "react-icons/tb";
import { COLOR_OPTS } from "@/assets/theme.config";
import FormHelper from "@/utils/helper/FormHelper";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import ToastHelper from "@/utils/helper/ToastHelper";
import { Select } from "@/components/ui/Select/Select";
import { RenderIf } from "@/components/conditionals/RenderIf";

export function UVUseKontingentSoloModal({
    show,
    onClose,
    user,
    setUser,
}: {
    show: boolean;
    onClose: () => any;
    user?: UserModel;
    setUser: Dispatch<UserModel>;
}) {
    const [submitting, setSubmitting] = useState<boolean>(false);

    const kontingent = 30 * ((user?.user_solo?.extension_count ?? 0) + 1) - (user?.user_solo?.solo_used ?? 0);

    function extendSolo(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (user == null) return;
        setSubmitting(true);

        const data = FormHelper.getEntries(e.target);
        data.trainee_id = user?.id;

        console.log(data);

        axiosInstance
            .patch("/administration/solo", data)
            .then(() => {
                const newSolo = { ...user.user_solo } as UserSoloModel;
                newSolo.solo_used += Number(data["solo_duration"]);

                if (data["solo_start"] != null) {
                    // This means that the solo has passed (i.e. is no longer valid)
                    newSolo.current_solo_start = dayjs.utc(data["solo_start"]).toDate();
                    newSolo.current_solo_end = dayjs.utc(newSolo.current_solo_start).add(data["solo_duration"], "day").toDate();
                } else {
                    newSolo.current_solo_end = dayjs.utc(newSolo.current_solo_start).add(newSolo.solo_used, "days").toDate();
                }

                setUser({ ...user, user_solo: newSolo });
                ToastHelper.success("Solo erfolgreich erstellt");
                onClose();
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Erstellen der Solophase");
            })
            .finally(() => setSubmitting(false));
    }

    return (
        <form onSubmit={extendSolo}>
            <Modal
                show={show}
                onClose={onClose}
                title={"Kontingent Nutzen"}
                footer={
                    <div className={"flex justify-end"}>
                        <Button type={"submit"} loading={submitting} icon={<TbPlaylistAdd size={20} />} color={COLOR_OPTS.PRIMARY} variant={"twoTone"}>
                            Verlängern
                        </Button>
                    </div>
                }>
                <Input
                    label={"Kontingent"}
                    description={"Die Anzahl der noch gültigen Tage in der Solophase."}
                    labelSmall
                    disabled
                    value={`${kontingent.toString()} Tag(e)`}
                />

                <Separator />

                <Select
                    label={"Tage Hinzufügen"}
                    labelSmall
                    description={"Dauer der Solophase in Tagen (maximal 30 Tage - dann Verlängerung)"}
                    className={"mt-5"}
                    name={"solo_duration"}
                    required
                    defaultValue={"20"}>
                    <option value="10">10 Tage</option>
                    <RenderIf truthValue={kontingent >= 20} elementTrue={<option value="20">20 Tage</option>} />
                    <RenderIf truthValue={kontingent >= 30} elementTrue={<option value="30">30 Tage</option>} />
                </Select>

                <RenderIf
                    truthValue={dayjs.utc(user?.user_solo?.current_solo_end).isBefore(dayjs.utc())}
                    elementTrue={
                        <Input
                            label={"Solo Start"}
                            description={"Start der Solophase"}
                            className={"mt-5"}
                            name={"solo_start"}
                            labelSmall
                            type={"date"}
                            min={dayjs.utc().format("YYYY-MM-DD")}
                            required
                            value={dayjs.utc().format("YYYY-MM-DD")}
                        />
                    }
                />
            </Modal>
        </form>
    );
}
