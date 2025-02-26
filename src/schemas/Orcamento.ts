import { Schema, model, Document } from "mongoose";

export interface OrcamentoInterface extends Document {
    user:string;
    userId: string;
    tipoVenda:string;
    produtos:Array<object>;
    data:string;
    orcamentoId:number;
    status:string;
    clienteId:string
}

export const OrcamentoSchema = new Schema({
    user:String,
    userId: String,
    tipoVenda:String,
    produtos:Array,
    data:String,
    orcamentoId:Number,
    status:String,
    clienteId:String
}, {
    timestamps: true
})
OrcamentoSchema.index({ orcamentoId: -1},{ unique:true });
OrcamentoSchema.index({ userId: 1});



export default model<OrcamentoInterface>('orcamento',OrcamentoSchema)