const fs = require("fs");
const path = require("path");

const basePath = path.join(__dirname, "pages");

function handleRoute(req, res) {
  const url = req.url;

 
  if (url === "/" || url === "/home") {
    fs.readFile(path.join(basePath, "index.html"), (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end("Server Error");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

  else if (url === "/style.css") {
    fs.readFile(path.join(__dirname, "public", "style.css"), (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });
  }


  else if (url === "/index.js") {
    fs.readFile(path.join(__dirname, "public", "index.js"), (err, data) => {
      res.writeHead(200, { "Content-Type": "application/javascript" });
      res.end(data);
    });
  }

  
  else if (url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>About Laundry Service</h1>");
  }

  else if (url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Contact: test@gmail.com</h1>");
  }

  else if (url === "/service") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Our Services Page</h1>");
  }



}

module.exports = handleRoute;