/**
 * Gets all text-based entries of a form
 * Doesn't get any files! These need to be acquired manually!
 * @param target
 */
function getEntries(target: EventTarget) {
    const formData = new FormData(target as HTMLFormElement);
    formData.delete("files");

    return formData;
}

function addFiles(form: FormData, files: File[] | File) {
    if (Array.isArray(files)) {
        for (const file of files) {
            form.append("files", file);
        }
    } else {
        form.append("files", files);
    }
}

function append(form: FormData, key: string, value: any) {
    form.append(key, value);
}

function set(form: FormData, key: string, value: any) {
    if (value == null) {
        form.set(key, "undefined");
        return;
    }
    form.set(key, value);
}

function setBool(form: FormData, key: string, expr: boolean) {
    form.set(key, expr ? "true" : "false");
}

export default {
    getEntries,
    addFiles,
    append,
    set,
    setBool,
};
