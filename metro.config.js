const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Strictly lock Metro to ONLY look inside your project folder
config.watchFolders = [__dirname];

module.exports = config;