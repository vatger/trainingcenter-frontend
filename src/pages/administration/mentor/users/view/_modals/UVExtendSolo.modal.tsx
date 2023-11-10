import { Modal } from "@/components/ui/Modal/Modal";
import { UserModel, UserSoloModel } from "@/models/UserModel";
import { Input } from "@/components/ui/Input/Input";
import { getAtcRatingCombined } from "@/utils/helper/vatsim/AtcRatingHelper";
import { Separator } from "@/components/ui/Separator/Separator";
import { Select } from "@/components/ui/Select/Select";
import dayjs from "dayjs";
import React, { Dispatch, FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { TbPlaylistAdd, TbTrash } from "react-icons/tb";
import { COLOR_OPTS } from "@/assets/theme.config";
import FormHelper from "@/utils/helper/FormHelper";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import ToastHelper from "@/utils/helper/ToastHelper";
import { AxiosResponse } from "axios";
import { EndorsementGroupModel } from "@/models/EndorsementGroupModel";
import useApi from "@/utils/hooks/useApi";
import { MapArray } from "@/components/conditionals/MapArray";

export function UVExtendSoloModal({ show, onClose, user, setUser }: { show: boolean; onClose: () => any; user?: UserModel; setUser: Dispatch<UserModel> }) {
    const [submitting, setSubmitting] = useState<boolean>(false);

    function addSolo(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (user == null) return;
        setSubmitting(true);

        const data = FormHelper.getEntries(e.target);

        axiosInstance
            .post(`/administration/solo/${user.user_solo?.id}/extend`, data)
            .then((res: AxiosResponse) => {
                const data: UserModel = res.data as UserModel;

                setUser({
                    ...user,
                    endorsement_groups: data.endorsement_groups,
                    user_solo: data.user_solo as UserSoloModel,
                });
                ToastHelper.success("Solo erfolgreich erstellt");
                onClose();
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Erstellen der Solophase");
            })
            .finally(() => setSubmitting(false));
    }

    return (
        <form onSubmit={addSolo}>
            <Modal
                show={show}
                onClose={onClose}
                title={"Solo Verlängern"}
                footer={
                    <div className={"flex justify-end"}>
                        <Button type={"submit"} loading={submitting} icon={<TbPlaylistAdd size={20} />} color={COLOR_OPTS.PRIMARY} variant={"twoTone"}>
                            Hinzufügen
                        </Button>
                    </div>
                }>
                <p>TODO</p>
            </Modal>
        </form>
    );
}
