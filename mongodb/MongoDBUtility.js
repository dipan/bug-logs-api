const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;
const PropertiesReader = require('properties-reader');

class MongoDBUtility {

    constructor() {
        this.MongoClient = require('mongodb').MongoClient;
        this.url = "mongodb://192.168.0.8:27017/bug-logs";
        this.dbName = "bug-logs";
        this.Server = require('mongodb').Server;
    }

    getMongoConnection() {
        return new Promise((resolve, reject) => {
            let properties = PropertiesReader('mongodb/connection.properties');
            let mongoHost = properties.get('MONGO_HOST');
            let mongoPort = properties.get('MONGO_PORT');

            console.log(this.dbName)
            console.log("Connecting to MongoDB...");
            let mongoClient = new MongoClient(new Server(mongoHost, mongoPort));
            mongoClient.connect((error, mongoClient) => {
                if (error) {
                    console.log("Failed to connect to MongoDB!!!");
                    console.log("Error : " + error);
                    reject(error);
                    return;
                }
                resolve(mongoClient.db(this.dbName));

                console.log("Connected to MongoDB...");
            });
        })
    }

    insertData(collectionName, data) {
        return new Promise((resolve, reject) => {
            this.getMongoConnection()
                .then((mongoDBConnection) => {
                    let collection = mongoDBConnection.collection(collectionName);
                    collection.insertOne(data, (error, result) => {
                        if (error) {
                            console.log(error);
                            reject(error);
                        } else {
                            console.log(result);
                            resolve(result);
                        }
                    });
                }).catch((error) => {
                    console.log("Error while inserting data : ");
                    console.log(error);
                    reject(error);
                });
        });

    }

    getData(collectionName) {
        return new Promise((resolve, reject) => {
            this.getMongoConnection()
                .then((mongoDBConnection) => {
                    try {
                        let collection = mongoDBConnection.collection(collectionName);
                        collection.find({}).toArray((error, docs) => {
                            if (error) {
                                console.log(error);
                                reject(error);
                            } else {
                                console.log("Successfully executed query : db.getCollection(\"" + collectionName + "\").find().pretty()");
                                resolve(docs);
                            }
                        });
                    } catch (error) {
                        console.log(error);
                        reject(error);
                    }
                })
                .catch((error) => {
                    console.log("Error while finding data : ");
                    console.log(error);
                    reject(error);
                });
        });
    }

}

module.exports = MongoDBUtility;