module.exports = {
  up(db) {
    return db.createCollection('applicationSettings')
      .then((collection) => collection.insertMany([
        {
          name: 'territoryCode',
          data: '0952'
        },
        {
          name: 'edrpou',
          data: '36733431'
        },
        {
          name: 'dbVersion',
          data: '0.0.0'
        }
      ]));
  }
};
