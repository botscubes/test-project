"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
var fs = require("fs");
function template(name) {
    var result = "";
    try {
        result = fs.readFileSync("./templates/" + name + ".html", "utf8");
    }
    catch (e) {
        console.log("Error: ", e);
    }
    return result;
}
exports.template = template;
