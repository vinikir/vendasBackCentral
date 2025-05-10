import { Schema, model, Document } from "mongoose";

interface User extends Document {
    ativo: boolean;
    nome:string;
    cpfCnpj:string;
    telefone?:Number;
    email?:string
}

export const UserSchema = new Schema({
    ativo: Boolean,
    nome: String,
    cpfCnpj:String,
    telefone:Number,
    email:String
    
}, {
    timestamps: true
})

UserSchema.index({ cpfCnpj: 1 }, { unique: true });


export default model<User>('user',UserSchema)