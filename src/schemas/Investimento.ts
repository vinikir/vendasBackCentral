import { Schema, model, Document } from "mongoose";


interface InvestimentoInterface extends Document {
    tipo: String,
    valor: Number,
    dataSalvou: String,
    dataMovimentacao: String,
    informacoes:String,
    socio:String
}

export const InvestimentoSchema = new Schema({
    tipo: String,
    valor: Number,
    dataSalvou: String,
    dataMovimentacao: String,
    informacoes:String,
    socio:String
}, {
    timestamps: true
})

InvestimentoSchema.index({ tipo: 1});
InvestimentoSchema.index({ data: -1});


export default model<InvestimentoInterface>('investimento',InvestimentoSchema)