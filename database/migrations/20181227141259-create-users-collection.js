module.exports = {
  up(db) {
    return db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['login', 'fullName', 'password', 'created', 'group'],
          properties: {
            login: {
              bsonType: 'string'
            },
            fullName: {
              bsonType: 'string'
            },
            password: {
              bsonType: 'string'
            },
            token: {
              bsonType: 'string'
            },
            group: {
              enum: ['admin', 'user']
            },
            created: {
              bsonType: 'date'
            },
          }
        }
      }
    })
      .then((collection) => collection.createIndex({'login': 1}, {unique: true}));
  }
};
