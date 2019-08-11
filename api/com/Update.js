const MongoDBUtility = require('./../../mongodb/MongoDBUtility');
const ResponseStatus = require('./../ResponseStatus');

class Update {
    execute(parameters) {
        return new Promise(async (resolve, reject) => {
            try {
                let mongoDBUtility = new MongoDBUtility();
                let collection = parameters.params.collection;
                let id = parameters.query.id;
                let body = parameters.body;

                let updateResult = await mongoDBUtility.updateData(collection, id, body);

                if (updateResult.matchedCount === 0) {
                    resolve(ResponseStatus.OBJECT_NOT_FOUND(collection));
                } else {
                    resolve(ResponseStatus.OK(updateResult));
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = Update;
