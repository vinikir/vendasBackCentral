import { Schema, model, Document } from "mongoose";
import mongoose from "mongoose";
import moment from "moment-timezone";

export interface ProdutoInterface extends Document {
    ativo: Boolean,
    nome: string | undefined,
    valorVenda: Number,
    valorCompra: Number,
    estoque: number | string,
    margem:number,
    descontoMaximo:number,
    descricao?:string | undefined,
    tipo:string,
    marca:String,
    sku?:String | undefined,
    codigoBarra?:String | undefined,
    aplicacao?:String | undefined,
    observacao?:String | undefined,
    img?:String | undefined,
}

export interface ProdutoInterfaceUpdate extends Document {
    ativo?: Boolean,
    nome?: string,
    valorVenda?: Number,
    valorCompra?: Number,
    estoque?: number,
    margem?:number,
    descontoMaximo?:number,
    descricao?:string,
    tipo?:string,
    marca?:String,
    sku?:String,
    codigoBarra?:String,
    aplicacao?:String,
    observacao?:String,
    img?:String,
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
    tipo:String,
    marca:String,
    sku:String,
    codigoBarra:String,
    aplicacao:String,
    observacao:String,
    img:String,

}, {
    timestamps: true
})

ProdutoSchema.index({ nome: 1});

export default model<ProdutoInterface>('produto',ProdutoSchema)