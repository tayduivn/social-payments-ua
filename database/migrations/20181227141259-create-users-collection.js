const genHash = require('../gen-hash');

module.exports = {
  up(db) {
    return db.createCollection('users')
      .then((collection) => collection.insertOne({
        login: 'admin',
        fullName: 'Адміністратор',
        isAdmin: true,
        created: Date.now(),
        password: genHash('alfa45')
      }));
  }
};
