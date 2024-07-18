import { Schema, model, Document } from "mongoose";

interface User extends Document {
    ativo: Boolean;
    nome:String;
    login:String;
    senha:String;
    permisoes:Array<string>;
    tipo:String;
    cpfCnpj:String;

}

export const UserSchema = new Schema({
    ativo: Boolean,
    nome: String,
    login:String,
    senha:String,
    permisoes:Array,
    tipo:String,
    cpfCnpj:String

    
}, {
    timestamps: true
})

UserSchema.index({ login: 1 }, { unique: true });

export default model<User>('user',UserSchema)