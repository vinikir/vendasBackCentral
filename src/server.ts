import app from "./app";
import dotenv from "dotenv"

dotenv.config()

console.log("server aberto on *:"+process.env.APP_PORT)


var port = process.env.APP_PORT || 3300;

app.use((err, req, res, next) => {
    console.error(err.stack);
    //res.status(500).send('Algo deu errado!');
});

try{
    const host:string = "0.0.0.0"
    app.listen(port)

}catch(e){
    console.log("server",e)
}