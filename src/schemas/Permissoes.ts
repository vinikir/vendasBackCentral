import { Schema, model } from "mongoose";
import { PermissaoInterface } from "../interfaces/PermissaoInterface";

const PermissaoSchema = new Schema<PermissaoInterface>(
    {
        ativo: { type: Boolean, default: true },
        nome: { type: String, required: true},
        permissoes: {
            web: [
            {
                recurso: { type: String, required: true },
                acoes: [{ type: String, required: true }],
            },
            ],
            mobile: [
            {
                recurso: { type: String, required: true },
                acoes: [{ type: String, required: true }],
            },
            ],
        },
    },
    { timestamps: true }
  );
  
  // Índice opcional se quiser garantir um único registro por usuário
  PermissaoSchema.index({ usuarioId: 1 }, { unique: true });
  
  export default model<PermissaoInterface>("permissoes", PermissaoSchema);
  