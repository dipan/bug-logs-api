const PropertiesReader = require('properties-reader');

class Utility {
    static isStringEmptyOrUndefined(value) {
        if (value === undefined || value === null) {
            return true
        }
        value = value.trim().toLowerCase();
        return value.length === 0 || value === "undefined";
    }

    static isStringNonEmpty(value) {
        if (value === undefined || value === null) {
            return false
        }
        value = value.trim().toLowerCase();
        return value.length != 0 && value != "undefined";
    }

    static getConnectionProperties(key, defaultValue) {
        let properties = PropertiesReader('lib/connection.properties');
        let value = properties.get(key);
        if (this.isStringEmptyOrUndefined(value.toString())) {
            return defaultValue;
        }
        return value;
    }
}

module.exports = Utility;
