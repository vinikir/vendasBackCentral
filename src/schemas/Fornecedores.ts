import { Schema, model, Document } from "mongoose";

export interface FornecedoresInterface extends Document {
  nome: string;
  documento: string; // pode ser CPF ou CNPJ
  inscricaoEstadual?: string;
  telefone: string;
  email?: string;
  endereco: {
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  contato: {
    nome: string;
    telefone: string;
    email: string;
  };
  tipoFornecedor: string;
  produtosFornecidos: string[];
  ativo: boolean;
  observacoes?: string;
}

const EnderecoSchema = new Schema({
  rua: String,
  numero: String,
  complemento: String,
  bairro: String,
  cidade: String,
  estado: String,
  cep: String
}, { _id: false });

const ContatoSchema = new Schema({
  nome: String,
  telefone: String,
  email: String
}, { _id: false });

export const FornecedoresSchema = new Schema<FornecedoresInterface>({
  nome: { type: String, required: true },
  documento: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => /^\d{11}$|^\d{14}$/.test(v),
      message: "Documento inválido: deve conter 11 (CPF) ou 14 (CNPJ) dígitos."
    }
  },
  inscricaoEstadual: { type: String },
  telefone: { type: String, required: true },
  email: { type: String },
  endereco: { type: EnderecoSchema, required: true },
  contato: { type: ContatoSchema, required: true },
  tipoFornecedor: { type: String, required: true },
  produtosFornecidos: [{ type: String }],
  ativo: { type: Boolean, default: true },
  observacoes: { type: String }
}, {
  timestamps: true
});

export default model<FornecedoresInterface>('fornecedores', FornecedoresSchema);
