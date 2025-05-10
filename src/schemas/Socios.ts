import { Schema, model, Document } from "mongoose";

interface Socios extends Document {
    ativo: boolean;
    nome:string;
    percenTualLucro:number
    cpf:string
}

export const SociosSchema = new Schema({
    ativo: Boolean,
    nome:String,
    percenTualLucro: Number,
    cpf:String,
    
}, {
    timestamps: true
})

SociosSchema.index({ cpf: 1 }, { unique: true });


export default model<Socios>('socios',SociosSchema)