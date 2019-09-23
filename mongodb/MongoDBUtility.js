const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;
const Utility = require('./../utility/Utility');
const Logger = require('../com/Logger');

class MongoDBUtility {

    constructor() {
        this.MongoClient = require('mongodb').MongoClient;
        this.url = "mongodb://192.168.0.8:27017/bug-logs";
        this.dbName = "bug-logs";
        this.Server = require('mongodb').Server;
    }

    getMongoConnection() {
        return new Promise((resolve, reject) => {
            let mongoHost = Utility.getConnectionProperties('MONGO_HOST');
            let mongoPort = Utility.getConnectionProperties('MONGO_PORT');

            // console.log(this.dbName);
            console.log("Connecting to MongoDB...");
            let mongoClient = new MongoClient(new Server(mongoHost, mongoPort));
            mongoClient.connect((error, mongoClient) => {
                if (error) {
                    console.log("Failed to connect to MongoDB!!!");
                    Logger.error(error);
                    reject(error);
                    return;
                }
                resolve(mongoClient);
                console.log("Connected to MongoDB...");
            });
        })
    }

    insertData(collectionName, data) {
        return new Promise((resolve, reject) => {
            this.getMongoConnection()
                .then((mongoDBConnection) => {
                    let db = mongoDBConnection.db(this.dbName);
                    let collection = db.collection(collectionName);
                    collection.insertOne(data, (error, result) => {
                        let query = "db.getCollection(\"" + collectionName + "\").insert(" +
                            JSON.stringify(data, null, 0) +
                            ")";
                        if (error) {
                            Logger.error("Failed to execut query : " + query);
                            Logger.error(error);
                            reject(error);
                        } else {
                            console.log(result);
                            Logger.info("Successfully executed query : " + query);
                            resolve(result);
                        }
                    });
                    mongoDBConnection.close();
                }).catch((error) => {
                    Logger.error("Error while inserting data : ");
                    Logger.error(error);
                    reject(error);
                });
        });

    }

    getData(collectionName, filter = "", projection = "") {
        return new Promise((resolve, reject) => {
            this.getMongoConnection()
                .then((mongoDBConnection) => {
                    try {
                        let db = mongoDBConnection.db(this.dbName);
                        let collection = db.collection(collectionName);
                        if (Utility.isStringNonEmpty(filter)) {
                            try {
                                filter = this.getParsedFilter(filter);
                            } catch (error) {
                                throw error;
                            }
                        } else {
                            filter = {};
                        }
                        let projectionExpn = new Object();
                        if (Utility.isStringNonEmpty(projection)) {
                            projection = projection.split(",");
                            for (let expn of projection) {
                                projectionExpn[expn.trim()] = 1;
                            }
                        }
                        projection = {
                            projection: projectionExpn
                        }
                        collection.find(filter, projection).toArray((error, docs) => {
                            let query = "db.getCollection(\"" + collectionName + "\").find(" +
                                JSON.stringify(filter, null, 0) +
                                ").pretty()";
                            if (error) {
                                Logger.error("Failed to execut query : " + query);
                                Logger.error(error);
                                reject(error);
                            } else {
                                Logger.info("Successfully executed query : " + query);
                                resolve(docs);
                            }
                        });
                    } catch (error) {
                        Logger.error(error);
                        reject(error);
                    }
                    mongoDBConnection.close();
                })
                .catch((error) => {
                    Logger.error("Error while finding data : ");
                    Logger.error(error);
                    reject(error);
                });
        });
    }

    getDataById(collectionName, id, projection = "") {
        return new Promise((resolve, reject) => {
            this.getMongoConnection()
                .then((mongoDBConnection) => {
                    try {
                        let db = mongoDBConnection.db(this.dbName);
                        let collection = db.collection(collectionName);
                        let filter = {
                            _id: id
                        };
                        let projectionExpn = new Object();
                        if (Utility.isStringNonEmpty(projection)) {
                            projection = projection.split(",");
                            projectionExpn["_id"] = 0;
                            for (let expn of projection) {
                                projectionExpn[expn.trim()] = 1;
                            }
                        }
                        projection = {
                            projection: projectionExpn
                        }

                        collection.findOne(filter, projection, (error, item) => {
                            let query = "db.getCollection(\"" + collectionName + "\").find(" +
                                JSON.stringify(filter, null, 0) +
                                ", " +
                                JSON.stringify(projectionExpn, null, 0) +
                                ").pretty()";
                            if (error) {
                                Logger.error("Failed to execut query : " + query);
                                Logger.error(error);
                                reject(error);
                            } else {
                                Logger.info("Successfully executed query : " + query);
                                resolve(item);
                            }
                        });
                    } catch (error) {
                        Logger.error(error);
                        reject(error);
                    }
                    mongoDBConnection.close();
                })
                .catch((error) => {
                    Logger.error("Error while finding data by id : ");
                    Logger.error(error);
                    reject(error);
                });
        });
    }

    updateData(collectionName, id, data) {
        return new Promise((resolve, reject) => {
            this.getMongoConnection()
                .then((mongoDBConnection) => {
                    let db = mongoDBConnection.db(this.dbName);
                    let collection = db.collection(collectionName);
                    let filter = {
                        _id: id
                    };
                    data = {
                        $set: data
                    }
                    collection.updateOne(filter, data, (error, item) => {
                        let query = "db.getCollection(\"" + collectionName + "\").update(" +
                            JSON.stringify(filter, null, 0) +
                            ", " +
                            JSON.stringify(data, null, 0) +
                            ")";
                        if (error) {
                            Logger.error("Failed to execut query : " + query);
                            Logger.error(error);
                            reject(error);
                        } else {
                            Logger.info("Successfully executed query : " + query);
                            resolve(item);
                        }
                    })
                    mongoDBConnection.close();
                })
                .catch((error) => {
                    Logger.error("Error while updating data : ");
                    Logger.error(error);
                    reject(error);
                });
        });
    }

    updateMany(collectionName, data) {
        return new Promise((resolve, reject) => {
            this.getMongoConnection()
                .then((mongoDBConnection) => {
                    let db = mongoDBConnection.db(this.dbName);
                    let collection = db.collection(collectionName);
                    let filter = {};
                    data = {
                        $set: data
                    }
                    collection.updateMany(filter, data, (error, item) => {
                        let query = "db.getCollection(\"" + collectionName + "\").updateMany(" +
                            JSON.stringify(filter, null, 0) +
                            ", " +
                            JSON.stringify(data, null, 0) +
                            ")";
                        if (error) {
                            Logger.error("Failed to execut query : " + query);
                            Logger.error(error);
                            reject(error);
                        } else {
                            Logger.info("Successfully executed query : " + query);
                            resolve(item);
                        }
                    })
                    mongoDBConnection.close();
                })
                .catch((error) => {
                    Logger.error("Error while updating multiple data : ");
                    Logger.error(error);
                    reject(error);
                });
        });
    }

    getParsedFilter(filter) {
        filter = filter.trim();
        let parsedFilter = new Object();
        let orIndex = -1;
        let andIndex = -1;


        let singleFilter = filter;
        let firstSpace = singleFilter.indexOf(" ");
        let secondSpace = singleFilter.indexOf(" ", firstSpace + 1);

        let field = singleFilter.substring(0, firstSpace);
        let condition = "$" + singleFilter.substring(firstSpace + 1, secondSpace);
        let value = singleFilter.substring(secondSpace + 1);
        if (value[0] === "'" && value[value.length - 1] === "'") {
            value = value.substring(1, value.length - 1)
        } else {
            value = Number(value);
            if (Number.isNaN(value)) {
                throw new Error("Invalid filter expression : " + filter);
            }
        }

        singleFilter = {};
        singleFilter[condition] = value;
        parsedFilter[field] = singleFilter;

        // switch (condition) {
        //     case "eq": parsedFilter[field] = value;
        //         break;
        // }

        return parsedFilter;
    }

}

module.exports = MongoDBUtility;