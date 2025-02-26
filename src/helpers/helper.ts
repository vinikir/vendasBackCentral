import { Response } from "express";
import { ErrorInterface } from "../interfaces/Interface";
const erros = {
    0:{
        "msg":"A senha é obrigatória.",
        "codHttp": 400,
    },
    1:{
        "msg": "Informe o login.",
        "codHttp": 400,
    },
    2:{
        "msg": "Credenciais inválidas.",
        "codHttp": 401,
        
    },
    3:{
        "msg": "A quantidade para estoque é obrigatório.",
        "codHttp": 400,
    },
    4:{
        "msg": "Margem não pode ser menor que 10.",
        "codHttp": 400,
    },
    5:{
        "msg": "O valor é obrigatório.",
        "codHttp": 400,
    },
    6:{
        "msg": "CPF ou CNPJ é obrigatório.",
        "codHttp": 400,
    },
    7:{
        "msg": "O tipo do usuário é obrigatório.",
        "codHttp": 400,
    },
    8:{
        "msg": "O tipo do produto é inválido.",
        "codHttp": 400,
    },
    9:{
        "msg": "O id do funcionario é obrigatoiro.",
        "codHttp": 400,
    },
    10:{
        "msg": "A categoria é obrigatória.",
        "codHttp": 400,
    },
    11:{
        "msg": "Formato da categoria inválido. O formato esperado é um array de strings.",
        "codHttp": 400,
    },
    12:{
        "msg": "A categoria não pode ser um array vazio. É necessário fornecer pelo menos uma categoria.",
        "codHttp": 400,
    },
    13:{
        "msg": `Categoria inválida informada. As categorias disponíveis são: Motor, Suspensao, Roda, Carenagem, Acessorio, Eletronico, Cabo, Eletrica, Pneu e Freio.`,
        "codHttp": 400,
    },
    14:{
        "msg": "Nenhum arquivo foi enviado.",
        "codHttp": 400,
    },
    15:{
        "msg": "Produto não encontrado.",
        "codHttp": 400,
    },
    16:{
        "msg": "O Cliente é obrigatorio para faturar.",
        "codHttp": 400,
    },
    17:{
        "msg": "O login é obrigatorio.",
        "codHttp": 400,
    },
    18:{
        "msg": "CPF ou CNP já cadastrado.",
        "codHttp": 400,
    },
}


export const ReturnSucesso = (res:Response, valor:any):Response => {
    return res.json( {
        "erro":false,
        "valor":valor
    })
}

export const ReturnErro = (res:Response, msg :string, status:number):Response => {
    return res.status(status).json( {
        "erro":true,
        "valor":msg,
        "codigo":9998
    })
}

export const ReturnErroPadrao = (res:Response, cod:number):Response => {
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

export const ReturnErroCatch = (res: Response, msg: string): Response => {
    const erroResponse: ErrorInterface = {
      erro: true,
      valor: msg,
      codigo: 9999,
    };
  
    return res.status(500).json(erroResponse);
};
    
