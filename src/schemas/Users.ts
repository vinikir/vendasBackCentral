import { Schema, model, Document } from "mongoose";

interface User extends Document {
    ativo: boolean;
    nome:string;
    login?:string;
    senha?:string;
    permissoes?:string;
    tipo:string;
    cpfCnpj:string;
}

export const UserSchema = new Schema({
    ativo: Boolean,
    nome: String,
    login:String,
    senha:String,
    permissoes:String,
    tipo:String,
    cpfCnpj:String

    
}, {
    timestamps: true
})

UserSchema.index({ login: 1 }, { unique: true });
UserSchema.index({ cpfCnpj: 1 }, { unique: true });


export default model<User>('user',UserSchema)