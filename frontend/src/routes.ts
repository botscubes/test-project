import { router } from "./router";
import { template } from "./template"


router.route('/', (req: any, res: any) => {
    res.writeHead(200);
    res.end(template("index"));
});

