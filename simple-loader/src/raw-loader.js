const loaderUtils = require('loader-utils');
const fs = require('fs');
const path = require('path');

module.exports = function (content) {
    const {name} = loaderUtils.getOptions(this);
    console.log(name, 'name');
    // 关闭缓存
    this.cacheable(false);
    // 异步处理
    // const callback = this.async();

    // fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data) => {
    //     if (err) {
    //         callback(err, '');
    //     }
    //     callback(null, data);
    // });

    const json = JSON.stringify(content)
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');

    const url = loaderUtils.interpolateName(this, '[hash:8].[ext]', {
        content
    });

    console.log(url);

    // 需要在webpack环境下使用
    this.emitFile(url, content);

    // 正常返回
    return `export default ${json}`;
    // this.callback(null, json, 2, 3, 3);

    // 抛出错误
    // throw new Error('error');
    // this.callback(new Error('error'), json);
};