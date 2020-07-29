const {runLoaders} = require('loader-runner');
const fs = require('fs');
const path = require('path');

runLoaders({
    resource: path.join(__dirname, './loaders/index.css'),

    loaders: [path.resolve(__dirname, './loaders/sprite-loader.js')],
    readResource: fs.readFile.bind(fs)

}, function (err, result) {
    err ? console.log(err) : console.log(result);
});