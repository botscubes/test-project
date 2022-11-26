
import { router } from "./router";
import "./routes";



const http = require('http');

const requestListener = function (req: any, res: any) {
  
  router.getHandler(req.url)(req, res);

}

const server = http.createServer(requestListener);
server.listen(8080);


