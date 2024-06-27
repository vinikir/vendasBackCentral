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
        //mongodb://mongo:mNIRjLXQBTuSCWwQFYNDCPUGlRaBbvVE@mongodb.railway.internal:27017
        //mongodb://mongo:mNIRjLXQBTuSCWwQFYNDCPUGlRaBbvVE@roundhouse.proxy.rlwy.net:42024
        mongoose.connect("mongodb://mongo:VuRYKjifhiuGBjQokLcDmgxAJXSlSIGB@mongodb.railway.internal:27017")
        //mongoose.connect("mongodb://localhost:27017/vendas_teste")
    }

    private routes() {
        this.express.use(routes)
    }

}

export default new App().express
