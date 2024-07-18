export interface UserInterface {
    _id?: string;
    ativo: boolean;
    nome: string;
    login: string;
    senha?: string; 
    permisoes?:Array<string>;
    tipo?:String;
    cpfCnpj:String;
}

export interface ValidarLoginInterface{
    permitido:boolean;
    msg:string
}