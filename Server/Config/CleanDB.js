const Models = require('../Models')
const Database = require('./Connection')

module.exports = async (ModelName, CollectionName) => {
    try {
        let ModelExists = await Models[ModelName].Database.Database.ListCollections({
            name: CollectionName
        }).toArray();

        if (ModelExists.length) {
            await Database.dropCollection(CollectionName);
        } 
    } catch (Error) {
        throw Error;
    }
}