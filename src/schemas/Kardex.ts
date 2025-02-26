import { Schema, model, Document } from "mongoose";

interface KardexInterface extends Document {
    tipo: string,
    nome: string,
    idProduto: string,
    valor: number,
    data: string,
    observasao:string,
    qtd:number,
    vendaId:string
}

export const KardexSchema = new Schema({
    tipo: String,
    nome: String,
    idProduto: String,
    valor: Number,
    data: String,
    observasao:String,
    qtd:Number,
    vendaId:String
}, {
    timestamps: true
})

KardexSchema.index({ idProduto: 1});


export default model<KardexInterface>('kerdex',KardexSchema)