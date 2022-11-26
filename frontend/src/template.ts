const fs = require("fs");


export function template(name: string): string {
    let result = "";
    try {
        result = fs.readFileSync("./templates/" + name + ".html", "utf8");
    } catch(e) {
        console.log("Error: ", e);
    }

    

    return result;
}