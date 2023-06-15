/**
 * Gets all text-based entries of a form
 * Doesn't get any files! These need to be acquired manually!
 * @param target
 */
function getEntries(target: EventTarget): any {
    const formData = new FormData(target as HTMLFormElement);
    let data: any = {};

    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    delete data["files"];

    return data;
}

export default {
    getEntries,
};
