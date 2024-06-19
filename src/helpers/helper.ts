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
}
const erros_old= {
    0: {
        "msg":"O ambiente é obrigatório",
        "codHttp": 406,
        "codErro":0
    },
    1:{
        "msg":"Valores não informado ou invalido",
        "codHttp": 400,
        "codErro":1
    },
    2:{
        "msg": "Credenciais inválidas",
        "codHttp": 401,
        "codErro": 2
    },
    3:{
        "msg": "A data de agendamento não pode ser retroativa",
        "codHttp": 400,
        "codErro": 3
    },
    4:{
        "msg": "O técnico é obrigatório",
        "codHttp": 400,
        "codErro": 4
    },
    5:{
        "msg": "O formulario não existe ou não faz parte do ambiente",
        "codHttp": 400,
        "codErro": 5
    },
    6:{
        "msg": "A atividade não existe ou não faz parte do ambiente",
        "codHttp": 400,
        "codErro": 6
    },
    7:{
        "msg": "O código de Integração já foi cadastrado",
        "codHttp": 409,
        "codErro": 7
    },
    8:{
        "msg": "Técnico não encontrado com o código de integração informado",
        "codHttp": 400,
        "codErro": 8
    },
    9: {
        "msg": "É necessário informar código de integração ou o ID do técnico",
        "codHttp": 400,
        "codErro": 9
    },
    10: {
        "msg": "A lista deve ser preenchida",
        "codHttp": 400,
        "codErro": 10
    },
    11:{
        "msg": "O historico não existe ou não faz parte do ambiente",
        "codHttp": 404,
        "codErro": 11
    },
    12:{
        "msg":"O codigo de integração é obrigatório",
        "codHttp": 400,
        "codErro": 12
    },
    13:{
        "msg":"Versão não encontrada",
        "codHttp": 404,
        "codErro": 13
    },
    14:{
        "msg": "Token inválido",
        "codHttp": 401,
        "codErro": 14
    },
    15:{
        "msg": "Token não informado",
        "codHttp": 400,
        "codErro": 15
        
    },
    16:{
        "msg":"A seção é obrigatório",
        "codHttp": 400,
        "codErro": 16
    },
    17:{
        "msg":"A senha é obrigatória",
        "codHttp": 400,
        "codErro": 17
    },
    18: {
        "msg": "É necessário informar código de integração ou o ID do formulario",
        "codHttp": 400,
        "codErro": 18
    },
    19: {
        "msg": "Formato da atividade invalido ou incompleto. Aceito string de json ou json e id da atividade obrigatorio",
        "codHttp": 400,
        "codErro": 19
    },
    20: {
        "msg": "A data de inicio obrigatoria",
        "codHttp": 400,
        "codErro": 20
    },
    21: {
        "msg": "A data de termino obrigatoria",
        "codHttp": 400,
        "codErro": 21
    },
    22: {
        "msg": "Tarefa não encontrada",
        "codHttp": 404,
        "codErro": 22
    },
    23: {
        "msg": "É necessário informar o ID da tarefa",
        "codHttp": 404,
        "codErro": 23
    },
    24: {
        "msg": "Tarefa cancelada ou pendente de cancelamento",
        "codHttp": 404,
        "codErro": 24
    },
    25: {
        "msg": "É necessario informar o id da tarefa ou codigo de integração em array",
        "codHttp": 404,
        "codErro": 25
    },
    26: {
        "msg": "O id deve ser informado em array",
        "codHttp": 404,
        "codErro": 26
    },
    27: {
        "msg": "O codigo de integração deve ser informado em array",
        "codHttp": 404,
        "codErro": 27
    },
    28:{
        "msg": "A atividade não existe ou não faz parte do ambiente",
        "codHttp": 400,
        "codErro": 28
    },
    29:{
        "msg": "A tarefa já foi aceita",
        "codHttp": 400,
        "codErro": 29
    },
    30:{
        "msg": "Você não pode aceitar essa tarefa",
        "codHttp": 400,
        "codErro": 30
    },
    31: {
        "msg": "É necessário informar código de integração ou o ID da atividade",
        "codHttp": 400,
        "codErro": 31
    },
    32:{
        "msg": "Informe o CPF",
        "codHttp": 400,
        "codErro": 31
    },
    33:{
        "msg": "Informe o E-mail",
        "codHttp": 400,
        "codErro": 32
    },
    34:{
        "msg": "Informe o CNPJ",
        "codHttp": 400,
        "codErro": 33
    },
    35:{
        "msg": "Informe o login",
        "codHttp": 400,
        "codErro": 33
    },
    36:{
        "msg": "A tarefa já foi concluida",
        "codHttp": 400,
        "codErro": 36
    }
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
    
