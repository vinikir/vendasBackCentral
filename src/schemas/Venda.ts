import { Schema, model, Document } from "mongoose";

interface VendaInterface extends Document {
    userId: String;
    tipoVenda:String;
    produtos:Array<object>;
    data:String;
}

export const VendaSchema = new Schema({
    userId: String,
    tipoVenda:String,
    produtos:Array,
    data:String
}, {
    timestamps: true
})

export default model<VendaInterface>('venda',VendaSchema)