const http = require("http");
const  handleRoute  = require("./routes");

const PORT = process.env.PORT || 3000;



module.exports = (req,res)=>{
    handleRoute(req,res)
}

if(require.main===module){
    const server = http.createServer((req,res)=>{
        handleRoute(req,res);
    })
}


 

server.listen(PORT, () => {
    console.log(`Server is Running at http://localhost:${PORT}`);
});
