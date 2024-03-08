import { axiosInstance } from "@/utils/network/AxiosInstance";
import { UserModel } from "@/models/UserModel";
import moment from "moment";

async function getData(): Promise<void> {
    try {
        const res = await axiosInstance.get("/gdpr", { timeout: 10_000 });
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
    } catch (err) {
        throw err;
    }
}

export default {
    getData,
};
