import { Schema, model, Document } from "mongoose";


interface ProdutoInterface extends Document {
    ativo: Boolean,
    nome: string,
    valorVenda: Number,
    valorCompra: Number,
    estoque: number,
    margem:number,
    descontoMaximo:number,
    descricao:string,
    tipo:string
}

export const ProdutoSchema = new Schema({
    ativo: Boolean,
    nome: String,
    valorVenda: Number,
    valorCompra: Number,
    estoque: Number,
    margem:Number,
    descontoMaximo:Number,
    descricao:String,
    tipo:String
}, {
    timestamps: true
})

ProdutoSchema.index({ nome: 1},{ unique:true });


export default model<ProdutoInterface>('produto',ProdutoSchema)