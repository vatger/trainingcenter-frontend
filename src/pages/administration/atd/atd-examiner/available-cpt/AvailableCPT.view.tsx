import useApi from "@/utils/hooks/useApi";
import { TrainingSessionModel } from "@/models/TrainingSessionModel";
import { Table } from "@/components/ui/Table/Table";
import ACPTTypes from "@/pages/administration/atd/atd-examiner/available-cpt/_types/ACPT.types";
import { Card } from "@/components/ui/Card/Card";
import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { Modal } from "@/components/ui/Modal/Modal";
import { FormEvent, useState } from "react";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import ToastHelper from "@/utils/helper/ToastHelper";
import { useNavigate } from "react-router-dom";
import { Select } from "@/components/ui/Select/Select";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { TbCircleCheck } from "react-icons/tb";
import FormHelper from "@/utils/helper/FormHelper";

export function AvailableCPTView() {
    const navigate = useNavigate();
    const { data: availableCPTs, loading: loadingAvailableCPTs } = useApi<TrainingSessionModel[]>({
        url: "/administration/cpt/available",
        method: "get",
    });

    const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
    const [selectedCPT, setSelectedCPT] = useState<undefined | TrainingSessionModel>(undefined);

    function registerCPTExaminer(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (selectedCPT == null) {
            ToastHelper.error("Ein interner Fehler ist aufgetreten");
            console.error("selectedCPT == null. Value: ", selectedCPT);
            return;
        }

        const data = FormHelper.getEntries(e.target);

        axiosInstance
            .post("/administration/cpt/examiner", {
                training_session_id: selectedCPT.id,
                examiner: data.type == "examiner",
            })
            .then(() => {
                ToastHelper.success("Erfolgreich angemeldet.");
                navigate("/administration/atd-examiner/cpt/my");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Anmelden.");
            });
    }

    return (
        <>
            <PageHeader title={"Offene CPTs (Prüfer)"} hideBackLink />

            <Card>
                <Table
                    columns={ACPTTypes.getColumns(setShowRegisterModal, setSelectedCPT)}
                    paginate
                    data={availableCPTs?.sort((a, b) => (a.date > b.date ? -1 : 1)) ?? []}
                    loading={loadingAvailableCPTs}
                />
            </Card>

            <Modal
                show={showRegisterModal}
                onClose={() => {
                    setShowRegisterModal(false);
                    setSelectedCPT(undefined);
                }}
                title={"Zum CPT Anmelden"}>
                <form onSubmit={registerCPTExaminer}>
                    <p>Als Prüfer hast du die Wahl dich als Beisitzer oder als Prüfer anzumelden. Beachte bitte dabei die entsprechenden Richtlinien</p>

                    <Select className={"mt-5"} name={"type"}>
                        <option value="examiner" selected>
                            Prüfer
                        </option>
                        <option value="mentor">Beisitzer</option>
                    </Select>

                    <div className={"flex justify-end mt-5"}>
                        <Button variant={"twoTone"} color={COLOR_OPTS.PRIMARY} type={"submit"} icon={<TbCircleCheck size={20} />} size={SIZE_OPTS.MD}>
                            Anmelden
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
