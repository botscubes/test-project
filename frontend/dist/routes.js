"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("./router");
var template_1 = require("./template");
router_1.router.route('/', function (req, res) {
    res.writeHead(200);
    res.end((0, template_1.template)("index"));
});
