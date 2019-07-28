
class Utility {
    static isStringEmptyOrUndefined(value) {
        if (value === undefined) {
            return true
        }
        value = value.trim().toLowerCase();
        return value.length === 0 || value === "undefined";
    }

    static isStringNonEmpty(value) {
        if (value === undefined) {
            return false
        }
        value = value.trim().toLowerCase();
        return value.length != 0 && value != "undefined";
    }
}

module.exports = Utility;
