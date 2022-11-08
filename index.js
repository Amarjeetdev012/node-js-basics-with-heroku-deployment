const http = require("http")
const path = require("path")
const fs = require("fs")


const server = http.createServer((req,res) => {
// if(req.url === "/"){
//     fs.readFile(
//         path.join(__dirname, "public", "index.html"), (err, content) => {
// if(err) {
//     throw err
// }
// res.writeHead(200, {"content-type" : "text/html"})
// res.end(content)
//         }
//     )   
// }

// if(req.url === "/about"){
//     fs.readFile(
//         path.join(__dirname, "public", "about.html"), (err, content) => {
// if(err) {
//     throw err
// }
// res.writeHead(200, {"content-type" : "text/html"})
// res.end(content)
//         }
//     )   
// }

// if(req.url === "/api/users"){
//     const users = [
//         {name:"bob smith", age:40},
//         {name:"jon doe", age:30}
//     ] 
//     res.writeHead(200, {"content-type" : "application/json"})
// res.end(JSON.stringify(users))
// }

// build file path
let filePath = path.join(__dirname, "public", req.url === "/" ? "index.html": req.url)

// extension of file
let extname = path.extname(filePath)

// initial content type 
let contentType = "text/html"

// check extension name and set content type
switch(extname){
    case ".js" : contentType = "text/javascript";
    break;
    case ".css" : contentType = "text/css";
    break; 
    case ".json" : contentType = "application/json";
    break; 
    case ".png" : contentType = "image/png";
    break; 
    case ".jpg" : contentType = "image/jpg";
    break;
}
  
// check if contentType is text/html but o .html file extension
if(contentType == "text/html" && extname == "") filePath += ".html"

// log the filepath
console.log(filePath)

    // read file
    fs.readFile(filePath, (err,content) => {
        if(err) {
            if(err.code == "ENOENT"){
            // page not found
            fs.readFile(path.join(__dirname, "public", "404.html"),(err,content) => {
                res.writeHead(200, {"Content-Type": "text/html"})
                res.end(content, "utf8")
            } )
            }  
            else {
                // some sserver error 
                res.writeHead(500) 
                res.end(`Server error: ${err.code}`)
            }
        }
        else {
            // success
            res.writeHead(200, {"Content-Type" : contentType})
            res.end(content, "utf8")
        }
    });

}
) 



const PORT = process.env.PORT || 5000
server.listen( PORT, () => {
    console.log(`server are running on ${PORT}`)
})