import { Schema, model, Document } from "mongoose";
export interface VendaInterface extends Document {
    _id: string;
    vendaId: number;
    data: Date;
    status: string;
    funcionarioId: string;
    [key: string]: any;
}

export type VendaType = Omit<VendaInterface, '_id' | 'createdAt' | 'updatedAt'>;

export const VendaSchema = new Schema({
    user: String,
    userId: String,
    tipoVenda: String,
    produtos: Array,
    data: String,
    vendaId: Number,
    status: String,
    pagamento: Array,
    valor: Number,
    clienteId: String,
    clienteNome: String
}, {
    timestamps: true
})
VendaSchema.index({ vendaId: -1 }, { unique: true });
VendaSchema.index({ userId: 1 });



export default model<VendaInterface>('venda', VendaSchema)