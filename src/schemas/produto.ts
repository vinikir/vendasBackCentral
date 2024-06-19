import { Schema, model, Document } from "mongoose";


interface ProdutoInterface extends Document {
    ativo: Boolean;
    nome:String
    codIntegracao:String
    valor:Array<Object>
}

export const ProdutoSchema = new Schema({
    ativo: Boolean,
    nome: String,
    codIntegracao: String,
    valor: Array
    
}, {
    timestamps: true
})

export default model<ProdutoInterface>('produto',ProdutoSchema)