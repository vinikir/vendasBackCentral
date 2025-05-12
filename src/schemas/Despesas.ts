import { Schema, model, Document } from "mongoose";

export interface DespesaInterface extends Document {
    valor: number;
    dataSalvou: Date;
    dataMovimentacao: Date;
    descricao?: string;
    categoria: string; // ex: "compra", "salario", "imposto", "retirada"
    formaPagamento: string;
    fornecedorId?: string;
    fornecedorNome?: string;
    funcionarioId?: string;
    funcionarioNome?: string;
    observacao?: string;
}

export const DespesaSchema = new Schema<DespesaInterface>({
    valor: { type: Number, required: true },
    dataSalvou: { type: Date, required: true },
    dataMovimentacao: { type: Date, required: true },
    descricao: { type: String },
    categoria: { type: String, required: true },
    formaPagamento: { type: String, required: true },
    fornecedorId: { type: String },
    fornecedorNome: { type: String },
    funcionarioId: { type: String },
    funcionarioNome: { type: String },
    observacao: { type: String }
}, {
    timestamps: true
});

export default model<DespesaInterface>('despesas', DespesaSchema);
