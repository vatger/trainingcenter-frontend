function capitalize(string?: string) {
    if (string == null) return "";

    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default { capitalize };
