"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var template_1 = require("./template");
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
        return function (req, res) {
            res.writeHead(404);
            res.end((0, template_1.template)("404"));
        };
    };
    return Router;
}());
exports.router = new Router();
