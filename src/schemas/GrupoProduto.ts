import { Schema, model, Document } from "mongoose";

export interface GrupoProdutoInterface extends Document {
    id:Number,
    nome: String,
   
}

export const GrupoProdutoSchema = new Schema({
    id:Number,
    nome: String,
    
}, {
    timestamps: true
})


export default model<GrupoProdutoInterface>('grupo_produto', GrupoProdutoSchema)