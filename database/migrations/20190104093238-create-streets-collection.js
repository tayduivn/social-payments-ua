const streetsList = require('../data-sources/streets/streets-if');

module.exports = {
  up(db) {
    return db.createCollection('streets')
      .then((collection) => collection.insertMany(streetsList));
  }
};
