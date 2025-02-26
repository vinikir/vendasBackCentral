import { Schema, model, Document } from "mongoose";

interface FaturadoInterface extends Document {
    user:string;
    userId: string;
    data:string;
    vendaId:string;
    faturamentoId:number;
    status:string;
    pagamento:Array<object>
    valor:number
    clienteId:string
}

export const FaturadoSchema = new Schema({
    user:String,
    userId: String,
    data:String,
    vendaId:String,
    faturamentoId:Number,
    status:String,
    pagamento:Array,
    valor:Number,
    clienteId:String
}, {
    timestamps: true
})
FaturadoSchema.index({ vendaId: -1},{ unique:true });
FaturadoSchema.index({ userId: 1});



export default model<FaturadoInterface>('faturado',FaturadoSchema)