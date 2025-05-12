import { Schema, model, Document } from "mongoose";

export interface Funcionarios extends Document {
    ativo: boolean;
    userId:string;
    cargo:string;
    permissao:string;
    login:string;
    senha:string;
}

export const FuncionariosSchema = new Schema({
    ativo: Boolean,
    userId:String,
    cargo: String,
    permissao:String,
    login:String,
    senha:String,
    
}, {
    timestamps: true
})

FuncionariosSchema.index({ login: 1 }, { unique: true });



export default model<Funcionarios>('funcionarios',FuncionariosSchema)