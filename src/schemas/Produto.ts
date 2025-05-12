import { Schema, model, Document } from "mongoose";
import mongoose from "mongoose";
import moment from "moment-timezone";

export interface ProdutoInterface extends Document {
    ativo: boolean,
    nome: string | undefined,
    valorVenda: number,
    valorCompra: number,
    estoque: number,
    margem:number,
    descontoMaximo:number,
    descricao?:string | undefined,
    tipo:string,
    marca:string,
    sku?:string | undefined,
    codigoBarra?:string | undefined,
    aplicacao?:string | undefined,
    observacao?:string | undefined,
    img?:string | undefined,
    imgAdicional?:Array<string>,
    categoria?:Array<string>
    grupo:string,
    localizacao:Array<object>
}

export interface ProdutoInterfaceUpdate  {
    ativo?: boolean,
    nome?: string,
    valorVenda?: number,
    valorCompra?: number,
    estoque?: number,
    estoque_reservado?: number,
    margem?:number,
    descontoMaximo?:number,
    descricao?:string,
    tipo?:string,
    marca?:string,
    sku?:string,
    codigoBarra?:string,
    aplicacao?:string,
    observacao?:string,
    img?:string,
    imgAdicional?:Array<string>,
    categoria?:Array<string>,
    grupo?:string,
    localizacao?:Array<object>
}

export const ProdutoSchema = new Schema({
    ativo: Boolean,
    nome: String,
    valorVenda: Number,
    valorCompra: Number,
    estoque: Number,
    estoque_reservado: Number,
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
    imgAdicional:Array,
    categoria:Array,
    grupo:String,
    localizacao:Array
}, {
    timestamps: true
})

ProdutoSchema.index({ nome: 1});

export default model<ProdutoInterface>('produto',ProdutoSchema)