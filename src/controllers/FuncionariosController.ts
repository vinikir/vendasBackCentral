
import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao, ReturnErro, ReturnErroCatch } from "../helpers/helper"
import bcrypt from 'bcrypt'
import UserModel from "../models/UserModel";
import dotenv from 'dotenv'

import PermissoesModel from "../models/PermissoesModel";
import FuncionariosModel from "../models/FuncionariosModel";

class UserControlle {

    public async trocarSenha(req: Request, res: Response) {
        try {
            const { senha, id } = req.body;

            if (typeof senha == "undefined" || senha == '') {
                return ReturnErroPadrao(res, 0)
            }

            if (typeof id == "undefined" || id == '') {
                return ReturnErroPadrao(res, 9)
            }

            const hashPassword = await bcrypt.hash(senha, 8)

            const res_up = await FuncionariosModel.atualizar(id, { senha: hashPassword })

            return ReturnSucesso(res, res_up)

        } catch (e: unknown) {
          
            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")
            
        }
    }


    public async login(req: Request, res: Response): Promise<Response> {

        try {



            const { login, senha, acesso } = req.body

            dotenv.config()

            let sucess: Object

            if (typeof login == "undefined" || login == "") {
                return ReturnErroPadrao(res, 1)
            }

            let funcionarioLogin = await FuncionariosModel.findPorLogin(login)

            if (!funcionarioLogin) {
                return ReturnErroPadrao(res, 2)
            }

            if (funcionarioLogin == null) {

                return ReturnErroPadrao(res, 2)

            }

            if (funcionarioLogin.length == 0) {
                return ReturnErroPadrao(res, 2)
            }

            const funcionario = funcionarioLogin[0]


            let senhaCompare: string = funcionario.senha

            const passwordVerify = await bcrypt.compare(senha, senhaCompare)

            if (senha.length <= 0) {

                return ReturnErroPadrao(res, 1)

            }

            if (!passwordVerify) {

                return ReturnErroPadrao(res, 2)


            }

            const res_buscaPemissao = await PermissoesModel.buscarPorId(funcionario.permissao)

            if (res_buscaPemissao == null) {

                return ReturnErroPadrao(res, 2)

            }


            if (acesso == "web" && res_buscaPemissao.permissoes.web.length == 0) {

                return ReturnErroPadrao(res, 2)

            }

            if (acesso == "mobile" && res_buscaPemissao.permissoes.mobile.length == 0) {

                return ReturnErroPadrao(res, 2)

            }

            const usuario = await UserModel.buscaPorId(funcionario.userId)

            sucess = {
                "Nome": `${usuario[0].nome}`,
                "nome": `${usuario[0].nome}`,
                "id": `${funcionario._id}`,
                "ID": `${funcionario._id}`,
                "userId": `${usuario[0]._id}`,
                "funcionarioId": `${funcionario._id}`,
                "permissoes": res_buscaPemissao
            }

            return ReturnSucesso(res, sucess)

        } catch (e: unknown) {
          
            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")
            
        }
    }

    public async listarVendedor(req: Request, res: Response): Promise<Response> {
        try {

            const res_buscaVendedor = await FuncionariosModel.buscaVendedor()

            const userIds = res_buscaVendedor.map(f => f.userId?.toString()).filter((id, i, arr) => id && arr.indexOf(id) === i);

            const usuarios = await UserModel.buscaPorArrayId(userIds);

            const mapUsuarios = new Map(usuarios.map(user => [user._id.toString(), user.nome]));

            const resultado = res_buscaVendedor.map(f => ({
                ...f.toObject?.() ?? f, 
                nome: mapUsuarios.get(f.userId?.toString()) || null
            }));

            return ReturnSucesso(res, resultado)

        } catch (e: unknown) {
          
            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")
            
        }
    }


}

export default new UserControlle()