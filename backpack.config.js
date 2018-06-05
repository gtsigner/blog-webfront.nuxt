const path = require('path');
console.log(path.join(__dirname, '/server/index.js'));
module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/index.js'
    return config
  }
};
