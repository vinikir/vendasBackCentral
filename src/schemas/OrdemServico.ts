import { Schema, model, Document } from "mongoose";

export interface OrdemServicoInterface extends Document {
    _id?:string;
    ordemServicoId:number;
    user:string;
    userId: string;
    vendedorId:string,
    vendedor:string,
    mecanico?:Array<object>;
    produtos:Array<object>;
    dataAbertura:string;
    dataFechamento?:string;
    marca:string;
    modelo:string;
    placa:string;
    cor:string;
    ano:number;
    checkList?:Array<object>;
    status:string;
    km:number
    clienteId:string
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
    km:Number,
    clienteId:String
}, {
    timestamps: true
})

OrdemServicoSchema.index({ ordemServicoId: -1},{ unique:true });
OrdemServicoSchema.index({ userId: 1});



export default model<OrdemServicoInterface>('ordemServico',OrdemServicoSchema)