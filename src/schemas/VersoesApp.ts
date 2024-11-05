import { Schema, model, Document } from "mongoose";

interface VersoesAppInterface extends Document {
    ativo:Boolean
    id:number
    latestVersion?: string
    releaseNotes?:string
    mandatory?:boolean
    bundleUrl?:string
    releaseDate?:string
    tester?:boolean
}



const VersoesAppSchema = new Schema({
    ativo:Boolean,
    id:Number,
    latestVersion: String,
    releaseNotes:String,
    mandatory:Boolean,
    bundleUrl:String,
    releaseDate:String,
    tester:Boolean
},{
    timestamps:true
})

VersoesAppSchema.index({ id: -1},{ unique:true });

export default model<VersoesAppInterface>('VersoesApp',VersoesAppSchema)

