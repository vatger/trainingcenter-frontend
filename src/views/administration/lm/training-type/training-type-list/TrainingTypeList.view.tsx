import { useNavigate } from "react-router-dom";
import { TableColumn } from "react-data-table-component";
import { TrainingTypeModel } from "../../../../../models/TrainingType.model";
import TrainingTypeListTypes from "../_types/TrainingTypeList.types";
import { PageHeader } from "../../../../../components/ui/PageHeader/PageHeader";
import { Table } from "../../../../../components/ui/Table/Table";
import TrainingTypeService from "../../../../../services/training-type/TrainingType.admin.service";
import { Card } from "../../../../../components/ui/Card/Card";

export function TrainingTypeListView() {
    const navigate = useNavigate();

    const { trainingTypes, loading, loadingError } = TrainingTypeService.getAll();
    const trainingTypesColumns: (TableColumn<TrainingTypeModel> & { searchable?: boolean })[] = TrainingTypeListTypes.getColumns(navigate);

    return (
        <>
            <PageHeader title={"Trainingstypen Verwalten"} hideBackLink />

            <Card>
                <Table searchable loading={loading} columns={trainingTypesColumns} data={trainingTypes} />
            </Card>
        </>
    );
}
