export interface UserInterface {
    _id: string;
    ativo: boolean;
    nome: string;
    cpfCnpj:string;
    telefone?:string;
    email?:string
}

export type UserParaCriar = Omit<UserInterface, "_id">;


export interface ErrorInterface{
    erro:boolean,
    valor:string|object,
    codigo:number
}

export interface ValidarLoginInterface{
    permitido:boolean;
    msg:string
}

export interface ProductSearchParams{
    limit?: number;  
    offset?: number;  
    search?: string;
    tipo?: string;
    id?: string;
}

export interface UserSearchParams{
    limit?: number;  
    offset?: number;  
    search?: string;
    id?: string;
    cpfCnpj?: string;
    nome?: string;
    tipo?:string|null
    
}

