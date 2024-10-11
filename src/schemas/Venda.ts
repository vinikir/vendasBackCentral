import { Schema, model, Document } from "mongoose";
interface VendaInterface extends Document {
    user:String;
    userId: String;
    tipoVenda:String;
    produtos:Array<object>;
    data:String;
    vendaId:Number;
    status:String;
    pagamento:Array<object>
    valor:Number
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
    valor:Number
}, {
    timestamps: true
})
VendaSchema.index({ vendaId: -1},{ unique:true });
VendaSchema.index({ userId: 1});



export default model<VendaInterface>('venda',VendaSchema)