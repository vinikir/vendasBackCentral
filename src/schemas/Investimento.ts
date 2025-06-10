import { Schema, model, Document } from "mongoose";


export interface InvestimentoInterface extends Document {
    id:number,
    tipo: string,
    valor: number,
    dataSalvou: string,
    dataMovimentacao: string | Date,
    informacoes:string,
    socio:string
}

export interface CompraMercadoriaInterface {
    id?:number,
    tipo: string,
    valor: number,
    dataSalvou: string,
    dataMovimentacao: string | Date,
    informacoes:string,
    
}

export const InvestimentoSchema = new Schema({
    id:Number,
    tipo: String,
    valor: Number,
    dataSalvou: String,
    dataMovimentacao: Date,
    informacoes:String,
    socio:String
}, {
    timestamps: true
})

InvestimentoSchema.index({ tipo: 1});
InvestimentoSchema.index({ data: -1});


export default model<InvestimentoInterface>('investimento',InvestimentoSchema)