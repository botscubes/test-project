"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var template_1 = require("./template");
var fs = require("fs");
var Router = /** @class */ (function () {
    function Router() {
        this.routes = [];
    }
    Router.prototype.route = function (path, handler) {
        this.routes.push({ path: path, handler: handler });
    };
    Router.prototype.getHandler = function (path) {
        for (var _i = 0, _a = this.routes; _i < _a.length; _i++) {
            var route = _a[_i];
            if (route.path == path) {
                return route.handler;
            }
        }
        return defaultHandler();
    };
    return Router;
}());
function defaultHandler() {
    return function (req, res) {
        var filePath = "resources" + req.url;
        fs.access(filePath, fs.constants.R_OK, function (err) {
            if (err) {
                res.writeHead(200);
                res.end((0, template_1.template)("index"));
            }
            else {
                fs.createReadStream(filePath).pipe(res);
            }
        });
    };
}
exports.router = new Router();
