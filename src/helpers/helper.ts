import { Response } from "express";
import { ErrorInterface } from "../interfaces/Interface";
// const erros = {
//     0:{
//         "msg":"A senha é obrigatória.",
//         "codHttp": 400,
//     },
//     1:{
//         "msg": "Informe o login.",
//         "codHttp": 400,
//     },
//     2:{
//         "msg": "Credenciais inválidas.",
//         "codHttp": 401,

//     },
//     3:{
//         "msg": "A quantidade para estoque é obrigatório.",
//         "codHttp": 400,
//     },
//     4:{
//         "msg": "Margem não pode ser menor que 10.",
//         "codHttp": 400,
//     },
//     5:{
//         "msg": "O valor é obrigatório.",
//         "codHttp": 400,
//     },
//     6:{
//         "msg": "CPF ou CNPJ é obrigatório.",
//         "codHttp": 400,
//     },
//     7:{
//         "msg": "O tipo do usuário é obrigatório.",
//         "codHttp": 400,
//     },
//     8:{
//         "msg": "O tipo do produto é inválido.",
//         "codHttp": 400,
//     },
//     9:{
//         "msg": "O id do funcionario é obrigatoiro.",
//         "codHttp": 400,
//     },
//     10:{
//         "msg": "A categoria é obrigatória.",
//         "codHttp": 400,
//     },
//     11:{
//         "msg": "Formato da categoria inválido. O formato esperado é um array de strings.",
//         "codHttp": 400,
//     },
//     12:{
//         "msg": "A categoria não pode ser um array vazio. É necessário fornecer pelo menos uma categoria.",
//         "codHttp": 400,
//     },
//     13:{
//         "msg": `Categoria inválida informada. As categorias disponíveis são: Motor, Suspensao, Roda, Carenagem, Acessorio, Eletronico, Cabo, Eletrica, Pneu e Freio.`,
//         "codHttp": 400,
//     },
//     14:{
//         "msg": "Nenhum arquivo foi enviado.",
//         "codHttp": 400,
//     },
//     15:{
//         "msg": "Produto não encontrado.",
//         "codHttp": 400,
//     },
//     16:{
//         "msg": "O Cliente é obrigatorio para faturar.",
//         "codHttp": 400,
//     },
//     17:{
//         "msg": "O login é obrigatorio.",
//         "codHttp": 400,
//     },
//     18:{
//         "msg": "CPF ou CNP já cadastrado.",
//         "codHttp": 400,
//     },
//     19:{
//         "msg": "A permissão é obrigatoria.",
//         "codHttp": 400,
//     },
//     20:{
//         "msg": "Permissão não encontrada.",
//         "codHttp": 400,
//     },
//     21:{
//         "msg": "O nome do socioe é obrigatorio.",
//         "codHttp": 400,
//     },
// }

const erros: Record<number, { msg: string; codHttp: number }> = {
	0: {
		msg: "A senha é obrigatória.",
		codHttp: 422,
	},
	1: {
		msg: "O login é obrigatório.",
		codHttp: 422,
	},
	2: {
		msg: "Credenciais inválidas.",
		codHttp: 401,
	},
	3: {
		msg: "A quantidade em estoque é obrigatória.",
		codHttp: 422,
	},
	4: {
		msg: "A margem não pode ser menor que 10%.",
		codHttp: 422,
	},
	5: {
		msg: "O valor do produto é obrigatório.",
		codHttp: 422,
	},
	6: {
		msg: "CPF ou CNPJ é obrigatório.",
		codHttp: 422,
	},
	7: {
		msg: "O tipo de usuário é obrigatório.",
		codHttp: 422,
	},
	8: {
		msg: "Tipo de produto inválido.",
		codHttp: 422,
	},
	9: {
		msg: "O ID do funcionário é obrigatório.",
		codHttp: 422,
	},
	10: {
		msg: "A categoria é obrigatória.",
		codHttp: 422,
	},
	11: {
		msg: "Formato inválido para categoria. Esperado: array de strings.",
		codHttp: 422,
	},
	12: {
		msg: "A categoria não pode ser um array vazio. Informe pelo menos uma.",
		codHttp: 422,
	},
	13: {
		msg: "Categoria inválida. Use: Motor, Suspensao, Roda, Carenagem, Acessorio, Eletronico, Cabo, Eletrica, Pneu ou Freio.",
		codHttp: 422,
	},
	14: {
		msg: "Nenhum arquivo foi enviado.",
		codHttp: 400,
	},
	15: {
		msg: "Produto não encontrado.",
		codHttp: 404,
	},
	16: {
		msg: "Cliente obrigatório para faturar.",
		codHttp: 422,
	},
	17: {
		msg: "Cliente não encontrado.",
		codHttp: 404,
	},
	18: {
		msg: "CPF ou CNPJ já cadastrado.",
		codHttp: 409,
	},
	19: {
		msg: "A permissão é obrigatória.",
		codHttp: 422,
	},
	20: {
		msg: "Permissão não encontrada.",
		codHttp: 404,
	},
	21: {
		msg: "O nome do sócio é obrigatório.",
		codHttp: 422,
	},
	22: {
		msg: "O percentual do sócio é obrigatório.",
		codHttp: 422,
	},
	23: {
		msg: "O percentual do sócio está invalido.",
		codHttp: 422,
	},
	24: {
		msg: "O cargo é obrigatorio.",
		codHttp: 422,
	},
	25: {
		msg: "O cargo informado é invalido.",
		codHttp: 422,
	},
};



export const ReturnSucesso = (res: Response, valor: any): Response => {
	return res.json({
		"erro": false,
		"valor": valor
	})
}

export const ReturnErro = (res: Response, msg: string, status: number): Response => {
	return res.status(status).json({
		"erro": true,
		"valor": msg,
		"codigo": 9998
	})
}

export const ReturnErroPadrao = (res: Response, cod: number): Response => {
	if (!erros[cod]) {
		return res.status(500).
			json({

				"erro": true,
				"valor": "Erro inesperado",
				"codigo": 0

			})
	}

	return res.status(erros[cod].codHttp).json({
		"erro": true,
		"valor": erros[cod].msg,
		"codigo": cod
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


