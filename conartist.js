const { config, preset } = require('conartist');

module.exports = config(preset.base(), preset.enzyme(), preset.jest());
