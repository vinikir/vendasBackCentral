import { Schema, model, Document } from "mongoose";

interface AportesInterface extends Document {
    socioId: string,
    socioNome:string,
    valor: number,
    dataSalvou: Date,
    dataMovimentacao: Date,
    descricao: string,
    id:number
}

export const AportesSchema = new Schema({
    socioId: String,
    socioNome: String,
    valor: Number,
    dataSalvou: Date,
    dataMovimentacao: Date,
    descricao: String,
    id: Number
}, {
    timestamps: true
})


export default model<AportesInterface>('aportes', AportesSchema)