import { Modal } from "../../../../../../components/ui/Modal/Modal";
import { Input } from "../../../../../../components/ui/Input/Input";
import { Button } from "../../../../../../components/ui/Button/Button";
import { COLOR_OPTS } from "../../../../../../assets/theme.config";
import React, { useEffect, useState } from "react";
import { PermissionModel } from "../../../../../../models/PermissionModel";
import PermissionAdministrationService, { PermissionCreateEnum } from "../../../../../../services/permissions/PermissionAdminService";

export function PLAddPermissionModal(props: { show: boolean; onClose: () => any; onCreate: (permission: PermissionModel) => any }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    const [errorString, setErrorString] = useState<string>("");

    useEffect(() => {
        setErrorString("");
    }, [props.show]);

    function handleSubmit() {
        setLoading(true);
        setErrorString("");

        PermissionAdministrationService.create(inputValue)
            .then((res: PermissionModel | PermissionCreateEnum) => {
                props.onCreate(res as PermissionModel);
            })
            .catch((err: PermissionCreateEnum) => {
                console.log("ERR");
                switch (err) {
                    case PermissionCreateEnum.ERR_DUP:
                        setErrorString("Dieser Name ist bereits vergeben");
                        break;

                    case PermissionCreateEnum.ERR_VAL:
                        setErrorString("Gebe bitte einen gültigen Wert ein");
                        break;

                    case PermissionCreateEnum.ERR_UNK:
                        setErrorString("Ein unbekannter Fehler ist aufgetreten");
                        break;
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Modal
            show={props.show}
            title={"Berechtigung Hinzufügen"}
            footer={
                <div className={"flex justify-end mt-5"}>
                    <Button loading={loading} variant={"twoTone"} onClick={() => handleSubmit()} color={COLOR_OPTS.PRIMARY}>
                        Hinzufügen
                    </Button>
                </div>
            }
            onClose={props.onClose}>
            <Input
                inputError={errorString.length != 0}
                customInputErrorText={errorString}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                label={"Name"}
                loading={loading}
                labelSmall
                maxLength={70}
                placeholder={"administration.access"}></Input>
        </Modal>
    );
}
