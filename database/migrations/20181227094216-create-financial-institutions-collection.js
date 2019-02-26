const fiList = require('../data-sources/banks/bank-list');

module.exports = {
  up(db) {
    return db.createCollection('financial-institutions')
      .then((collection) => collection.insertMany(fiList));
  }
};
