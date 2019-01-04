const streetsList = require('../data-sources/streets/streets-if');

module.exports = {
  up(db) {
    return db.createCollection('streets', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name'],
          properties: {
            name: {
              bsonType: 'string'
            },
            url: {
              bsonType: 'string'
            }
          }
        }
      }
    })
      .then((collection) => collection.createIndex({'name': 1}, {unique: true})
        .then(() => collection.insertMany(streetsList))
      );
  }
};
