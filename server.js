const http = require("http");
const handleRoute = require("./routes");

const Port = 3000;

const server = http.createServer((req,res)=>{
   handleRoute(req,res);
})
 

server.listen(3000,(req,res)=>{
    console.log("Server is Running at http://localhost:3000");
});
