import { Schema, model, Document } from "mongoose";

export interface OrcamentoInterface extends Document {
    user:String;
    userId: String;
    tipoVenda:String;
    produtos:Array<object>;
    data:String;
    orcamentoId:Number;
    status:String;
    
}

export const OrcamentoSchema = new Schema({
    user:String,
    userId: String,
    tipoVenda:String,
    produtos:Array,
    data:String,
    orcamentoId:Number,
    status:String,
}, {
    timestamps: true
})
OrcamentoSchema.index({ orcamentoId: -1},{ unique:true });
OrcamentoSchema.index({ userId: 1});



export default model<OrcamentoInterface>('orcamento',OrcamentoSchema)