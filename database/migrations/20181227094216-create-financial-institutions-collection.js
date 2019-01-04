const fiList = require('../data-sources/banks/bank-list');

module.exports = {
  up(db) {
    return db.createCollection('financial-institutions', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'edrpou'],
          properties: {
            name: {
              bsonType: 'string'
            },
            fullName: {
              bsonType: 'string'
            },
            mfo: {
              bsonType: 'string'
            },
            edrpou: {
              bsonType: 'string'
            }
          }
        }
      }
    })
      .then((collection) => {
        collection.insertMany(fiList);
      });
  }
};
