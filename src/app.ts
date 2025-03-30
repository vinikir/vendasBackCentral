import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import routes from "./routes/routes";
class App {

    public express: express.Application

    public constructor(){
        this.express = express()

        this.middlewares()
		this.routes()
        this.database()
    }

    private middlewares(): void {
        this.express.use(express.json())
        this.express.use(cors())
    }

    private database():void{
        try{
            //mongoose.connect("mongodb+srv://vinikir:bZGelmKUSysEoXQ1@gem.2hrtlg6.mongodb.net/vendas?retryWrites=true&w=majority&appName=GEM")
            mongoose.connect("mongodb://localhost:27017/vendas")
            //mongoose.connect("mongodb://localhost:27017/vendas_teste")
        }catch(e){
            console.log(e.message)
        }
        
    }

    private routes() {
        this.express.use(routes)
    }

}

export default new App().express
