
const fs = require("fs");
const path = require("path");

function handleRoute  (req,res){
    const url = req.url.split("?")[0];

    switch(url){
        case"/":
        serveFile(res,'index.html','text/html');
        break;

        case "/about":
            serveFile(res,'about.html', 'text/html');
            break;

        case"/contact":
            serveFile(res,'contact.html','text/html');
            break;
            
         case"/services":
             serveFile(res,'services.html','text/html');
             break;
             
             
             //css

         case "/index.css":
            serveFile(res,'index.css','text/css');
            break;

          case "/about.css":
            serveFile(res,'about.css','text/css');
            break;
            
           case "/contact.css":
              serveFile(res, 'contact.css','text/css');
              break;
              
            case "/services.css":
                serveFile(res,'services.css','text/css');
                break;  


             //in java-script
             
             case"/script.js":
               serveFile(res,'script.js','application/javascript');
               break;

               default:
                res.writeHead(404, {"Content-Type": 'text/html'});
                res.end('<h1>404 - file not found</h1>');



    }
}


function serveFile(res,fileName, ContentType) {
    const filePath = path.join(__dirname,'public',fileName);

    fs.readFile(filePath,(error,data)=>{
        if(error){
            console.log("file not found", filePath);
            res.writeHead (404, {"Content-Type":'text/html'});
            res.end('<h1>404 - file not found</h1>');
            return;
        }
      res.writeHead(200, { 'Content-Type': ContentType });
        res.end(data);
    })
}

module.exports = (req,res)=>{
    handleRoute(req,res);
}