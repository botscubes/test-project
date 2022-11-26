
import { template } from "./template";



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
        return (req, res) => {
            res.writeHead(404);
            res.end(template("404"));
        }
    }

}



export const router: Router = new Router();
