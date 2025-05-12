import app from "./app";
import dotenv from "dotenv"
import carregarSwagger from "./swagger";

dotenv.config()


var port = process.env.APP_PORT || 80;

console.log("server aberto on *:"+port)



app.use((err, req, res, next) => {
    console.error(err.stack);
    //res.status(500).send('Algo deu errado!');
});


carregarSwagger(app);

try{
    const host:string = "0.0.0.0"
    app.listen(port, host)

}catch(e){
    console.log("server",e)
}