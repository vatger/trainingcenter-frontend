import {NavigateFunction} from "react-router-dom";
import {TableColumn} from "react-data-table-component";
import {MentorGroupModel} from "../../../../../../models/MentorGroup.model";
import moment from "moment";

function getColumns(navigate: NavigateFunction): TableColumn<MentorGroupModel>[] {
    return [
        {
            name: "Name",
            selector: row => row.name,
        },
        {
            name: "Mitglied Seit",
            selector: row => moment(row.UserBelongToMentorGroups?.createdAt).utc().format("DD.MM.YYYY HH:mm"),
        },
        {
            name: "Aktion",
            selector: row => "TODO",
        },
    ];
}

export default {
    getColumns,
};
