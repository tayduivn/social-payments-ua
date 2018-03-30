const path = require('path');
const isDev = require('./is-dev-mode');

console.log('isDev for electron build:', isDev);

module.exports = {
  path: {
    frontEnd: isDev ? path.normalize(`file://${__dirname}/../front-end/dist/index.html`) :
      path.normalize(`file://${__dirname}/front-end/dist/index.html`),
    backEnd: isDev ? path.normalize(`${__dirname}/../back-end/dist/bin/www.js`) :
      path.normalize(`${__dirname}/back-end/dist/server.js`)
  },
  window: {
    width: isDev ? 1800 : 800,
    height: isDev ? 1000 : 700/*,
    webPreferences: {
      devTools: isDev
    }*/
  }
};
