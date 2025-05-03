import { Schema, model, Document } from "mongoose";
interface VendaInterface extends Document {
    user:string;
    userId: string;
    tipoVenda:string;
    produtos:Array<object>;
    data:string;
    vendaId:number;
    status:string;
    pagamento:Array<object>
    valor:number
    clienteId:string
    clienteNome:string
}

export const VendaSchema = new Schema({
    user:String,
    userId: String,
    tipoVenda:String,
    produtos:Array,
    data:String,
    vendaId:Number,
    status:String,
    pagamento:Array,
    valor:Number,
    clienteId:String,
    clienteNome:String
}, {
    timestamps: true
})
VendaSchema.index({ vendaId: -1},{ unique:true });
VendaSchema.index({ userId: 1});



export default model<VendaInterface>('venda',VendaSchema)