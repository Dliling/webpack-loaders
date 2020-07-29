const Spritesmith = require('spritesmith');
const fs = require('fs');
const path = require('path');

// 注意路径！！！

module.exports = function(source) {
    const callback = this.async();
    const reg = /url\((\S*)\?__sprite/g;
    const imgs = source.match(reg);
    const matchImgs = [];
    // 匹配规则
    for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i].match(/url\((\S*)\?__sprite/)[1];
        matchImgs.push(path.join(__dirname, img));
    }

    Spritesmith.run({
        src: matchImgs
    }, function handleResult(err, result) {
        // 将生成的图片写入文件
        fs.writeFileSync(path.join(process.cwd(), 'dist/sprite.png'), result.image);

        source = source.replace(reg, match => {
            return `url("dist/sprite.png"`;
        });
        // 替换CSS中的路径
        fs.writeFileSync(path.join(process.cwd(), 'dist/index.css'), source);

        callback(null, source);
    });
};