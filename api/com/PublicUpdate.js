const ResponseStatus = require('../ResponseStatus');
const Utility = require('../../utility/Utility');
const PutLog = require('../v0/log/PutLog');

class PublicUpdate {
    execute(parameters) {
        return new Promise(async (resolve, reject) => {
            try {
                let action = parameters.query.action;

                if (Utility.isStringEmptyOrUndefined(action)) {
                    resolve(ResponseStatus.REQUIRED_PARAMETER_MISSING("action"));
                    return;
                }

                switch (action) {
                    case "incrementViewCount": resolve(new PutLog().incrementViewCount(parameters));
                        break;
                    default: let validValues = [
                        "incrementViewCount"
                    ];
                        resolve(ResponseStatus.INVALID_PARAMETER_VALUE("action", validValues));
                        return;
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = PublicUpdate;
