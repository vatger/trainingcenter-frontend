import { axiosInstance } from "@/utils/network/AxiosInstance";
import { UserModel } from "@/models/UserModel";
import dayjs from "dayjs";

async function getData(): Promise<void> {
    try {
        const res = await axiosInstance.get("/gdpr", { timeout: 60_000 });
        const user = res.data as UserModel;

        const fileName = `gdpr-${user.id}-${dayjs.utc().unix()}.json`;
        const blob = new Blob([JSON.stringify(res.data)], { type: "application/json" });
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
