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
        mongoose.connect("mongodb://localhost:27017/vendas")
    }

    private routes() {
        this.express.use(routes)
    }

}

export default new App().express