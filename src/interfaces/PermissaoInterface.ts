import { Schema, model, Document } from "mongoose";

type Recurso = "usuarios" | "relatorios" | "visitas" | "*";
type Acao = "visualizar" | "criar" | "editar" | "excluir" | "*";

interface Permissao {
    recurso: Recurso;
    acoes: Acao[];
}

export interface PermissaoInterface extends Document {
    ativo?: boolean;
    nome: string;   
    permissoes: {
        web: Permissao[];
        mobile: Permissao[];
    };
}
