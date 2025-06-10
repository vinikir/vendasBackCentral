import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import routes from "./routes/routes";
import carregarSwagger from "./swagger";
import { connectDatabase } from "./database";

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

    private async database():Promise<void> {
        try{
            
            await connectDatabase(process.env.MONGO_URI || "mongodb://localhost:27017/vendas");

          
        }catch(e:any){
            console.log(e.message)
        }
        
    }

    private routes() {
        this.express.use(routes)
    }

}

export default new App().express
