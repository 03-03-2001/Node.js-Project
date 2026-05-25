const http = require("http");
const  handleRoute  = require("./routes");

const PORT = process.env.PORT || 3000;



const server = http.createServer((req,res)=>{
   handleRoute(req,res);
})
 

server.listen(PORT, (req, res) => {
    console.log(`Server is Running at http://localhost:${PORT}`);
});
