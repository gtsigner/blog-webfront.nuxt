const path = require('path');
module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = path.join(__dirname, '/server/index.js');
    return config
  }
};
