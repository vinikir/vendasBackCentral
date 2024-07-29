import { Response } from "express";

const erros = {
    0:{
        "msg":"A senha é obrigatória",
        "codHttp": 400,
    },
    1:{
        "msg": "Informe o login",
        "codHttp": 400,
    },
    2:{
        "msg": "Credenciais inválidas",
        "codHttp": 401,
        
    },
    3:{
        "msg": "A quantidade para estoque é obrigatório",
        "codHttp": 400,
    },
    4:{
        "msg": "Margem não pode ser menor que 10",
        "codHttp": 400,
    },
    5:{
        "msg": "O valor é obrigatório",
        "codHttp": 400,
    },
    6:{
        "msg": "CPF ou CNPJ é obrigatório",
        "codHttp": 400,
    },
    7:{
        "msg": "O tipo do usuário é obrigatório",
        "codHttp": 400,
    },
    8:{
        "msg": "O tipo do produto é invalido",
        "codHttp": 400,
    },
    9:{
        "msg": "O id do funcionario é obrigatoiro",
        "codHttp": 400,
    },
}


export const ReturnSucesso = (res:Response, valor:any) => {
    return res.json( {
        "erro":false,
        "valor":valor
    })
}

export const ReturnErro = (res:Response, msg :string, status:number) => {
    return res.status(status).json( {
        "erro":true,
        "valor":msg,
        "codigo":9998
    })
}

export const ReturnErroPadrao = (res:Response, cod:number) => {
    if(!erros[cod]){
        return res.status(500).
        json({
            
            "erro":true,
            "valor":"Erro inesperado",
            "codigo":0
            
        })
    }

    return res.status(erros[cod].codHttp).json({
        "erro":true,
        "valor":erros[cod].msg,
        "codigo":cod
    })
}

export const ReturnErroCatch = (res:Response,msg:string) => {
    return res.status(500).json( {
        "erro":true,
        "valor":msg,
        "codigo":9999
    })
}
    
