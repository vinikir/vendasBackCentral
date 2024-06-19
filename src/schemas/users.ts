import { Schema, model, Document } from "mongoose";


interface UserInterface extends Document {
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

export default model<UserInterface>('user',UserSchema)