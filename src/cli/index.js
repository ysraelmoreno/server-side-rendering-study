"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("node:fs");
var path = require("node:path");
var file_reader_1 = require("../engine/file.reader");
var fileNames = fs.readdirSync(path.resolve(__dirname, "..", "pages"));
var filesToBeMapped = fileNames.filter(function (file) { return file.includes(".tsx"); });
filesToBeMapped.forEach(function (file) {
    var fileReader = new file_reader_1.FileReader(file);
    fileReader.createClientFile();
});
