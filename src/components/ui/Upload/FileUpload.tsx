import { AiOutlineFileImage, AiOutlineFileJpg, AiOutlineFilePdf, AiOutlineFileUnknown, AiOutlineFileZip, TbCheck, TbUpload, TbX } from "react-icons/all";
import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { MapArray } from "../../conditionals/MapArray";
import prettyBytes from "pretty-bytes";
import { Button } from "../Button/Button";
import { COLOR_OPTS } from "../../../configs/theme/theme.config";
import { RenderIf } from "../../conditionals/RenderIf";
import { ProgressBar } from "../ProgressBar/ProgressBar";

function renderFileImage(fileExt: string) {
    switch (fileExt.toLowerCase()) {
        case "jpg":
            return <AiOutlineFileJpg size={30} />;

        case "png":
            return <AiOutlineFileImage size={30} />;

        case "pdf":
            return <AiOutlineFilePdf size={30} />;

        case "zip":
            return <AiOutlineFileZip size={30} />;

        default:
            return <AiOutlineFileUnknown size={30} />;
    }
}

export type UploadProps = {
    accept: string[];
    isUploading: boolean;
    progress: number;
    disabled?: boolean;
    onSubmit?: (data: FormData) => any;
    showSuccess: boolean;
    fileLimit?: number;
    customButtonIcon?: ReactElement;
    onFileChange?: (files: File[]) => any;
    customButtonText?: string;
    buttonIsSubmit?: boolean;
    inputName?: string;
};

export function FileUpload(props: UploadProps) {
    const [isHover, setIsHover] = useState<boolean>(false);
    const [fileList, setFileList] = useState<File[] | undefined>(undefined);

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        let files: File[];
        if (fileList == null) files = [];
        else files = [...fileList];

        if (e.target.files == null) return;

        for (let i = 0; i < e.target.files.length; i++) {
            let exists = false;
            files.forEach(value => {
                if (value.name == e.target.files?.[i].name) {
                    exists = true;
                }
            });

            if (files.length == props.fileLimit) continue;
            if (!exists) files.push(e.target.files[i]);
        }

        setFileList(files);
        props.onFileChange?.(files);
    }

    function removeFile(name: string) {
        if (fileList == null) return;

        let files: File[] = [...fileList];
        files = files.filter(value => {
            return value.name != name;
        });

        setFileList(files);
    }

    function handleSubmit() {
        const formData = new FormData();
        if (fileList == null) return;

        fileList.forEach(value => {
            formData.append("files", value);
        });

        props.onSubmit?.(formData);
    }

    useEffect(() => {
        if (props.showSuccess) setFileList([]);
    }, [props.showSuccess]);

    return (
        <>
            <div
                className={`upload mt-3 upload-draggable transition-all ${isHover ? "border-indigo-600 bg-indigo-50" : ""} ${
                    props.disabled || props.isUploading || (props.fileLimit ?? 999) == fileList?.length
                        ? "disabled"
                        : "hover:border-indigo-600 hover:bg-indigo-50"
                } ${props.showSuccess ? "border-emerald-500" : ""}`}>
                <input
                    readOnly={(props.disabled || props.isUploading || (props.fileLimit ?? 999) == fileList?.length) ?? false}
                    onDragEnter={() => setIsHover(true)}
                    onDragExit={() => setIsHover(false)}
                    onInput={e => {
                        setIsHover(false);
                    }}
                    onChange={handleFileChange}
                    className="upload-input draggable"
                    type="file"
                    name={props.inputName ?? "files"}
                    accept={props.accept
                        .map(v => {
                            return "." + v;
                        })
                        .join(",")}
                    title=""
                    value=""
                    multiple
                />
                <div className="my-10 text-center">
                    <div className="text-6xl mb-4 flex justify-center">
                        <RenderIf
                            truthValue={props.showSuccess ?? false}
                            elementTrue={<TbCheck className={"text-success"} size={30} />}
                            elementFalse={<TbUpload className={"text-primary"} size={30} />}
                        />
                    </div>
                    <p className="font-semibold">
                        <span className="text-gray-800 dark:text-white">
                            Drop your image here, or click to browse {props.fileLimit ? `(${fileList?.length ?? 0}/${props.fileLimit})` : ""}
                        </span>
                    </p>
                    <p className="mt-1 opacity-60 dark:text-white">
                        File Formats:{" "}
                        {props.accept
                            .map(v => {
                                return "." + v;
                            })
                            .join(", ")}
                    </p>
                </div>
            </div>

            <RenderIf
                truthValue={(props.isUploading ?? false) && props.progress != null}
                elementTrue={<ProgressBar className={"mt-3"} value={props.progress ?? 0} />}
                elementFalse={
                    <div className="upload-file-list">
                        <MapArray
                            data={Array.from(fileList ?? [])}
                            mapFunction={(value: File, index) => {
                                return (
                                    <div key={index} className="upload-file">
                                        <div className="flex">
                                            <div className="upload-file-thumbnail">{renderFileImage(value.name.split(".").pop() ?? "pdf")}</div>
                                            <div className="upload-file-info">
                                                <h6 className="upload-file-name">{value.name}</h6>
                                                <span className="upload-file-size">{prettyBytes(value.size)}</span>
                                            </div>
                                        </div>
                                        {!props.isUploading && (
                                            <span
                                                onClick={() => {
                                                    removeFile(value.name);
                                                }}
                                                className="close-btn close-btn-default upload-file-remove"
                                                role="button">
                                                <TbX size={20} />
                                            </span>
                                        )}
                                    </div>
                                );
                            }}
                        />
                    </div>
                }
            />

            <Button
                loading={props.isUploading}
                variant={"twoTone"}
                type={props.buttonIsSubmit ? "submit" : "button"}
                disabled={props.disabled || fileList == null || fileList?.length == 0}
                onClick={() => handleSubmit()}
                className={"mt-3"}
                color={COLOR_OPTS.PRIMARY}
                icon={props.customButtonIcon ?? <TbUpload size={20} />}>
                {props.customButtonText ?? "Hochladen"}
            </Button>
        </>
    );
}
