import { UserModel } from "@/models/UserModel";
import { Card } from "@/components/ui/Card/Card";
import React from "react";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { TbPlus } from "react-icons/tb";
import { Button } from "@/components/ui/Button/Button";
import { Table } from "@/components/ui/Table/Table";
import UVTypes from "@/pages/administration/mentor/users/user-view/_types/UV.types";
import { useNavigate } from "react-router-dom";

export function UVEndorsementsPartial({ user }: { user?: UserModel }) {
    const navigate = useNavigate();

    return (
        <Card
            header={"Freigaben"}
            className={"mt-7"}
            headerBorder
            headerExtra={
                <Button size={SIZE_OPTS.XS} variant={"twoTone"} color={COLOR_OPTS.PRIMARY} icon={<TbPlus size={20} />}>
                    Freigabe Hinzufügen
                </Button>
            }>
            <Table columns={UVTypes.getEndorsementTableColumns(navigate)} data={user?.endorsement_groups ?? []} />
        </Card>
    );
}
