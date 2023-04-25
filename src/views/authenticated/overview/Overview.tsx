import { COLOR_OPTS, SIZE_OPTS, TYPE_OPTS } from "../../../configs/theme/theme.config";
import { Card } from "../../../components/ui/Card/Card";
import { Alert } from "../../../components/ui/Alert/Alert";
import { Checkbox } from "../../../components/ui/Checkbox/Checkbox";
import { Tabs } from "../../../components/ui/Tabs/Tabs";
import { Table } from "../../../components/ui/Table/Table";
import { Button } from "../../../components/ui/Button/Button";
import { TbTrash } from "react-icons/all";
import { Modal } from "../../../components/ui/Modal/Modal";
import { useState } from "react";
import { FileUpload } from "../../../components/ui/Upload/FileUpload";
import { Form } from "react-router-dom";
import { axiosInstance } from "../../../utils/network/AxiosInstance";
import { AxiosProgressEvent } from "axios";
import { PageHeader } from "../../../components/ui/PageHeader/PageHeader";

export function Overview() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    function abc(data: FormData) {
        setIsUploading(true);
        console.log(data);

        const formData = new FormData();
        data.forEach(value => {
            formData.append("files", value);
        });

        formData.append("input", "3.14159265");

        console.log(formData);

        axiosInstance
            .post("/ab", formData, {
                onUploadProgress: (e: AxiosProgressEvent) => {
                    setUploadProgress(e.progress ?? 0);
                },
                timeout: 60_000,
            })
            .then(r => {
                setShowSuccess(true);
                setIsUploading(false);
                setUploadProgress(0);

                setTimeout(() => {
                    setShowSuccess(false);
                }, 1000);
            });
    }

    return (
        <>
            <PageHeader title={"VATSIM Germany Trainingcenter"} hideBackLink />

            <Modal
                footer={
                    <span className={"flex justify-end"}>
                        {" "}
                        <Button className={"right-0"} color={COLOR_OPTS.DANGER} variant={"twoTone"}>
                            Submit
                        </Button>{" "}
                    </span>
                }
                title={"Delete Account"}
                show={showModal}
                onClose={() => setShowModal(false)}>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
                    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
                    dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                    sanctus est Lorem ipsum dolor sit amet.
                </p>
            </Modal>
            <div>
                <Checkbox onChange={e => console.log(e)}>Hello World</Checkbox>
            </div>

            <Button onClick={() => setShowModal(true)} color={COLOR_OPTS.PRIMARY} variant={"solid"}>
                Click
            </Button>

            <Card bordered>
                <Tabs type={"underline"} tabHeaders={["Hello", "World", "This", "Is", "A"]}>
                    <Alert rounded type={TYPE_OPTS.INFO} showIcon>
                        This is an Alert!
                    </Alert>
                    <p>This</p>
                    <p>Is</p>
                    <p>A</p>
                    <p>Test</p>
                </Tabs>
            </Card>

            <FileUpload onSubmit={abc} isUploading={isUploading} showSuccess={showSuccess} progress={uploadProgress * 100} accept={["*"]} />
        </>
    );
}
