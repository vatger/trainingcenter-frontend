import { MentorGroupModel } from "../../../../../../models/MentorGroupModel";
import { Card } from "../../../../../../components/ui/Card/Card";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../../assets/theme.config";
import { Table } from "../../../../../../components/ui/Table/Table";
import { Button } from "../../../../../../components/ui/Button/Button";
import { TbPlus } from "react-icons/all";
import React from "react";
import { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import MentorGroupListTypes from "../_types/UVMentorGroupList.types";

type UserMentorGroupsPartialProps = {
    mentorGroups: MentorGroupModel[];
};

export function UVUserMentorGroupsPartial(props: UserMentorGroupsPartialProps) {
    const navigate = useNavigate();
    const columns: TableColumn<MentorGroupModel>[] = MentorGroupListTypes.getColumns(navigate);

    return (
        <Card header={"Mentorengruppen"} className={"mt-7"} headerBorder>
            <Table paginate={props.mentorGroups.length > 10} columns={columns} data={props.mentorGroups} />
        </Card>
    );
}
