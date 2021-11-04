const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var mongod;

before(async () => {

    mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();
        
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });

});

beforeEach(async () => {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName]
      await collection.deleteMany()
    }
});

after(async () => {
  await mongod.stop();
});