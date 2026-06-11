
const fs = require("fs");
const path = require("path");

function handleRoute(req, res) {
    const url = req.url.split("?")[0];

    switch (url) {
        case "/":
            serveFile(res, 'index.html', 'text/html');
            break;

        case "/about":
            serveFile(res, 'pages/About.html', 'text/html');
            break;

        case "/contact":
            serveFile(res, 'pages/Contact.html', 'text/html');
            break;

        case "/services":
            serveFile(res, 'pages/Services.html', 'text/html');
            break;


        //css
         case "/style.css":
            serveFile(res, "style.css", "text/css");
            break;

        case "/index.css":
            serveFile(res, 'index.css', 'text/css');
            break;

        case "/about.css":
            serveFile(res, 'About.css', 'text/css');
            break;

        case "/contact.css":
            serveFile(res, 'Contact.css', 'text/css');
            break;

        case "/services.css":
            serveFile(res, 'Services.css', 'text/css');
            break;


        //in java-script

        case "/script.js":
            serveFile(res, 'script.js', 'application/javascript');
            break;


        case "/favicon.ico":
            serveFile(res, "favicon.ico", "image/x-icon");
            break;

        default:
              if (url.startsWith("/images/")) {
                const imgExt = path.extname(url).toLowerCase();
                const mimeTypes = {
                    ".png":  "image/png",
                    ".jpg":  "image/jpeg",
                    ".jpeg": "image/jpeg",
                    ".gif":  "image/gif",
                    ".svg":  "image/svg+xml",
                    ".ico":  "image/x-icon",
                    ".webp": "image/webp"
                };
                const contentType = mimeTypes[imgExt] || "image/png";
                serveFile(res, url.slice(1), contentType); // removes leading /
                break;
            }

            res.writeHead(404, { "Content-Type": 'text/html' });
            res.end('<h1>404 - file not found</h1>');



    }
}


function serveFile(res, fileName, ContentType) {
    const filePath = path.join(process.cwd(), 'public', fileName);
     console.log("Looking for:", filePath);

    

    fs.readFile(filePath, (error, data) => {
        if (error) {
            console.log("file not found", filePath);
            console.log('error reading file:',error.message)
            res.writeHead(404, { "Content-Type": 'text/html' });
            res.end('<h1>404 - file not found</h1>');
            return;
        }
        res.writeHead(200, { 'Content-Type': ContentType });
        res.end(data);
    })
}

module.exports = (req, res) => {
    handleRoute(req, res);
}