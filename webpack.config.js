const { merge } = require('webpack-merge');
const commonConfig = require('./webpack/common')

module.exports = (_env, { mode }) => {
    const modeConfig = require(`./webpack/${mode}`)
    const mergedConfig = merge(commonConfig, modeConfig);

    return mergedConfig;
}