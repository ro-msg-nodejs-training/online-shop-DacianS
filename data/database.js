let mongoose = require('mongoose');
var singleton = require('../util/singleton')
const MongoClient = require('mongodb').MongoClient;

async function listDatabases(client) {
    let databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    client.db("OnlineShop").collection("Category").find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        return client;
    });
}
class Database {
    constructor() {
        this._connect()
    }

    async _connect() {
        const uri = "mongodb+srv://dacianS:<password>@cluster0-w76db.mongodb.net/test?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true });
        singleton.getInstance().client = client;
        try {
            await client.connect();
            await listDatabases(client);



        }
        catch (e) {
            console.error(e);
        }
    }
}

module.exports = new Database()