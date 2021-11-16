#!/usr/bin/env node

const webpack = require('webpack');
const minimist = require('minimist');
const path = require('path');

const buildWepbackConfig = require('../webpack.config.js');
const args = minimist(process.argv.slice(2));

const runWebpackBuild = () => {
  webpack(buildWepbackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      return console.log('build error');
    }
    console.log('build success');
  });
}

runWebpackBuild();