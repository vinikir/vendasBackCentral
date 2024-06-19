import { Schema, model, Document } from "mongoose";

export interface UserInterface {
    ativo: Boolean;
    nome:String
    login:String
    senha:String
}
interface User extends Document {
    ativo: Boolean;
    nome:String
    login:String
    senha:String
}

export const UserSchema = new Schema({
    ativo: Boolean,
    nome: String,
    login:String,
    senha:String
    
}, {
    timestamps: true
})

UserSchema.index({ login: 1 }, { unique: true });

export default model<User>('user',UserSchema)