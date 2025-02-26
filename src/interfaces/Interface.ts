export interface UserInterface {
    _id?: string;
    ativo: boolean;
    nome: string;
    login?: string;
    senha?: string; 
    permisoes?:Array<string>;
    tipo:string;
    cpfCnpj:string;
}

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
}

