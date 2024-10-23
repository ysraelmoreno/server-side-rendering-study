"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileReader = void 0;
var fs = require("node:fs");
var FileReader = /** @class */ (function () {
    function FileReader(fileName) {
        this.fileName = fileName;
    }
    FileReader.prototype.createClientFile = function () {
        var content = "\nimport React from 'react';\nimport { hydrateRoot } from 'react-dom/client';\nimport App from \"../../src/pages/".concat(this.fileName, "\"\n\nconst container = document.getElementById('root');\n\nif (container) {\n  hydrateRoot(container, <App />);\n}\n");
        if (!fs.existsSync("./public/build/")) {
            fs.mkdirSync("./public/build/", { recursive: true });
        }
        if (fs.existsSync("./public/build/client-".concat(this.fileName)))
            return;
        fs.appendFileSync("./public/build/client-".concat(this.fileName), content);
    };
    return FileReader;
}());
exports.FileReader = FileReader;
