
import { template } from "./template";

const fs = require("fs");


type Route = {
    path: string 
    handler: (req: any, res: any) => void
}

class Router {
    private routes: Array<Route> = [];


    route(path: string, handler: (req: any, res: any) => void) {
        this.routes.push({path, handler});
    }
    getHandler(path: string): (req: any, res: any) => void {
        for (const route of this.routes) {
            if (route.path == path) {
                return route.handler
            }
        }
        return defaultHandler();
    }


    
}

function defaultHandler(): (req: any, res: any) => void {


    return (req: any, res: any) => {
        const filePath = "resources" + req.url;
        fs.access(filePath, fs.constants.R_OK, err => {
            if(err){
                res.writeHead(200);
                res.end(template("index"));

            }
            else{
                fs.createReadStream(filePath).pipe(res);
            }
        });
    }
}

export const router: Router = new Router();
