import { MentorGroupModel } from "../../../../../../models/MentorGroupModel";
import { Card } from "../../../../../../components/ui/Card/Card";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../../assets/theme.config";
import { Table } from "../../../../../../components/ui/Table/Table";
import { Button } from "../../../../../../components/ui/Button/Button";
import { TbPlus } from "react-icons/all";
import React from "react";
import { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import MentorGroupListTypes from "../_types/MentorGroupList.types";

type UserMentorGroupsPartialProps = {
    mentorGroups: MentorGroupModel[];
};

export function UserMentorGroupsPartial(props: UserMentorGroupsPartialProps) {
    const navigate = useNavigate();
    const columns: TableColumn<MentorGroupModel>[] = MentorGroupListTypes.getColumns(navigate);

    return (
        <Card
            header={"Mentorengruppen"}
            className={"mt-7"}
            headerBorder
            headerExtra={
                <Button size={SIZE_OPTS.XS} variant={"twoTone"} color={COLOR_OPTS.PRIMARY} icon={<TbPlus size={20} />}>
                    Zu Mentorengruppe hinzufügen
                </Button>
            }>
            <Table paginate={props.mentorGroups.length > 10} columns={columns} data={props.mentorGroups} />
        </Card>
    );
}
