"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("./router");
require("./routes");
var http = require('http');
var requestListener = function (req, res) {
    router_1.router.getHandler(req.url)(req, res);
};
var server = http.createServer(requestListener);
server.listen(8080);
