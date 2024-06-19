export interface UserInterface {
    _id?: string;
    ativo: boolean;
    nome: string;
    login: string;
    senha: string; 
}

export interface ValidarLoginInterface{
    permitido:boolean;
    msg:string
}