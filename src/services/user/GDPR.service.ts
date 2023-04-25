import { axiosInstance } from "../../utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { UserModel } from "../../models/User.model";
import moment from "moment";

function getData(): Promise<void> {
    return axiosInstance
        .get("/gdpr")
        .then((res: AxiosResponse) => {
            const user = res.data as UserModel;

            const fileName = `gdpr-${user.id}-${moment().utc().unix()}.json`;
            const data = JSON.stringify(res.data, null, 4);
            const blob = new Blob([data], { type: "application/json" });
            const href = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = href;
            link.target = "_blank";
            link.download = fileName;
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(href);

            return;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

export default {
    getData,
};
