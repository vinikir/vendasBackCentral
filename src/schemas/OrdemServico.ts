import { Schema, model, Document } from "mongoose";

export interface OrdemServicoInterface extends Document {
    _id?:String;
    ordemServicoId:Number;
    user:String;
    userId: String;
    vendedorId:String,
    vendedor:String,
    mecanico?:Array<object>;
    produtos:Array<object>;
    dataAbertura:String;
    dataFechamento?:String;
    marca:String;
    modelo:String;
    placa:String;
    cor:String;
    ano:Number;
    checkList?:Array<object>;
    status:String;
    km:Number
}

export const OrdemServicoSchema = new Schema({
    ordemServicoId:Number,
    user:String,
    userId: String,
    vendedorId:String,
    vendedor:String,
    mecanico:Array,
    produtos:Array,
    dataAbertura:String,
    dataFechamento:String,
    marca:String,
    modelo:String,
    placa:String,
    cor:String,
    ano:Number,
    checkList:Array,
    status:String,
    km:Number
}, {
    timestamps: true
})

OrdemServicoSchema.index({ ordemServicoId: -1},{ unique:true });
OrdemServicoSchema.index({ userId: 1});



export default model<OrdemServicoInterface>('ordemServico',OrdemServicoSchema)