import { Schema, model, Document } from "mongoose";

interface DespesaInterface extends Document {
    recorrente: boolean,
    nome: string,
    observacao: string,
    valor: number,
    tempoDecorrencia: string,
    responsavelId:string,
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