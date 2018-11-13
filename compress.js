const UglifyJS = require('uglify-js');
const CleanCSS = require('clean-css');
const fs = require('fs');

// 异常直接crash了, 简单的脚本不要搞这么复杂
// 这些都默认选项就好, 主要是为了往页面注入
// 一小段js和css用, 通常不会太复杂
exports.compressJS = function compressJS(file) {
	return UglifyJS.minify(fs.readFileSync(file, 'utf8')).code;
};

exports.compressCSS = function compressCSS(file) {
	return new CleanCSS({}).minify(fs.readFileSync(file, 'utf8')).styles;
};

exports.compressHTML = function compressHTML(file) {
	return fs.readFileSync(file, 'utf8').replace(/(?<=>)\s+|\s+(?=<)/g, '');
};