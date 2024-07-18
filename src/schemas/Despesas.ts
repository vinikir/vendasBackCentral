import { Schema, model, Document } from "mongoose";

interface DespesaInterface extends Document {
    recorrente: Boolean,
    nome: String,
    observacao: String,
    valor: Number,
    tempoDecorrencia: String,
    responsavelId:String,
}

export const DespesaSchema = new Schema({
    recorrente: Boolean,
    nome: String,
    observacao: String,
    valor: Number,
    tempoDecorrencia: String,
    responsavelId:String,
}, {
    timestamps: true
})


export default model<DespesaInterface>('despesas',DespesaSchema)