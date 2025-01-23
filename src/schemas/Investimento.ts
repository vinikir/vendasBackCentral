import { Schema, model, Document } from "mongoose";


interface InvestimentoInterface extends Document {
    id:Number,
    tipo: String,
    valor: Number,
    dataSalvou: String,
    dataMovimentacao: Date,
    informacoes:String,
    socio:String
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