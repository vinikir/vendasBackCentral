
import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao, ReturnErro, ReturnErroCatch } from "../helpers/helper"
import bcrypt from 'bcrypt'
import UserModel from "../models/UserModel";
import dotenv from 'dotenv'
import { UserInterface, UserParaCriar, ValidarLoginInterface } from "../interfaces/Interface";
import { ValidarCpfCnpj } from "../helpers/Funcoes";
import { UserSearchParams } from "../interfaces/Interface";
import { ajustarPesquisaParaBuscaLike } from "../helpers/Funcoes";
import { TipoUsuariosEnums } from "../enums/TipoUsuariosEnums";
import * as uuid from 'uuid'
import PermissoesModel from "../models/PermissoesModel";
import FuncionariosModel from "../models/FuncionariosModel";
import { CargosTiposEnums } from "../enums/CargosEnum";
class UserControlle {

    public async buscarTodos(req: Request, res: Response): Promise<object> {
        const users = UserModel.getAll()
        return res.json({ status: "ok" })
    }


    private async validaLogin (login:string): Promise<ValidarLoginInterface>{
        const funcionario = await FuncionariosModel.findPorLogin(login)

        if(funcionario.length <= 0){
            return{
                permitido:true,
                msg:""
            }
        }

        return{
            permitido:false,
            msg:"Login já cadastrado"
        }
    }

    private aplicarMascaraCpfCnpj(valor: string) {
        // Remover qualquer caractere que não seja número
        const valorLimpo = valor.replace(/\D/g, '');

        // Verificar se é CPF (11 dígitos) ou CNPJ (14 dígitos)
        if (valorLimpo.length === 11) {
            // CPF - Formato: 123.***.***-45
            return valorLimpo.replace(/^(\d{3})\d{6}(\d{2})$/, '$1.***.***-$2');
        } else if (valorLimpo.length === 14) {
            // CNPJ - Formato: 123.***.***/****-45
            return valorLimpo.replace(/^(\d{3})\d{9}(\d{2})$/, '$1.***.***/****-$2');
        } else {
            // Se não for CPF nem CNPJ válido
            return 'Número inválido';
        }
    }



    public async buscar(req: Request, res: Response): Promise<object> {
        try {

            let infos: any = {}
            let limit: number = 50
            let offset: number = 0

            const query: UserSearchParams = req.query

            if (typeof query != "undefined" && typeof query.id != "undefined") {
                infos._id = query.id
            }

            if (typeof query != "undefined" && typeof query.tipo != "undefined") {
                infos.tipo = query.tipo
            }


            if (typeof query?.search === 'string' && query.search.trim() !== '') {
                
                const busca = ajustarPesquisaParaBuscaLike(query.search)
              
                if ( !isNaN(Number(busca))) {
                    infos.cpfCnpj =  busca
                    
                } else {
                    if(Array.isArray(busca)){
                        infos = { $and : busca.map((item: RegExp) => ({
                           nome: item
                        })) }
                    } else {
                        infos.nome =  busca
                    }
                   
                    
                }

            }

            if (typeof query != "undefined" && typeof query.limit != "undefined") {

                limit = query.limit

            }

            if (typeof query != "undefined" && typeof query.offset != "undefined") {

                offset = query.offset

            }


            let usuario = await UserModel.buscar(infos, limit, offset)



            for (let index = 0; index < usuario.length; index++) {
                const element = usuario[index];
                usuario[index].cpfCnpj = this.aplicarMascaraCpfCnpj(element.cpfCnpj)
            }

            return ReturnSucesso(res, usuario)

        } catch (e: unknown) {

            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")

        }
    }

    public async buscarClientes(req: Request, res: Response): Promise<object> {
        try {

            let infos: any = {}
            let limit: number = 50
            let offset: number = 0

            const query: UserSearchParams = req.query

            if (typeof query != "undefined" && typeof query.id != "undefined") {
                infos._id = query.id
            }


            if (typeof query != "undefined" && typeof query.search != "undefined" && query.search != "undefined" && query.search != "") {

                const busca = ajustarPesquisaParaBuscaLike(query.search)
               
                if (typeof busca === "string" && !isNaN(Number(busca))) {
                    infos.cpfCnpj = {
                        $regex:busca
                    }
                } else {
                    if(Array.isArray(busca)){
                        infos = { $and : busca.map((item: RegExp) => ({
                           nome: item
                        })) }
                    } else {
                        infos.nome =  busca
                    }
                   
                }

            }

            if (typeof query != "undefined" && typeof query.limit != "undefined") {

                limit = query.limit

            }

            if (typeof query != "undefined" && typeof query.offset != "undefined") {

                offset = query.offset

            }



            let usuario = await UserModel.buscar(infos, limit, offset)



            for (let index = 0; index < usuario.length; index++) {
                const element = usuario[index];
                usuario[index].cpfCnpj = this.aplicarMascaraCpfCnpj(element.cpfCnpj)
            }

            return ReturnSucesso(res, usuario)

        } catch (e: unknown) {

            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")

        }
    }

    public async create(req: Request, res: Response): Promise<object> {
        try {
            const {
                ativo,
                nome,
                login,
                senha,
                cpfCnpj,
                tipo,
                permissoes,
                telefone,
                email,
                cargo
            } = req.body;

            const ehFuncionario = tipo === TipoUsuariosEnums.funcionario 

            if (ehFuncionario && (!senha || senha.trim() === "")) {
                return ReturnErroPadrao(res, 0);
            }

            if (ehFuncionario && (!cpfCnpj || cpfCnpj.trim() === "")) {
                return ReturnErroPadrao(res, 6);
            }

            if (!tipo || tipo.trim?.() === "") {
                return ReturnErroPadrao(res, 7);
            }

            if (ehFuncionario && (!permissoes || permissoes.length === 0)) {
                return ReturnErroPadrao(res, 19);
            }

            
            const resultadoValidacao = ValidarCpfCnpj(cpfCnpj);

            if (!resultadoValidacao.valido) {
                return ReturnErro(res, `${resultadoValidacao.tipo} invalido.`, 998);
            }

           
            const cpfCnpjLimpo = resultadoValidacao.valor;

            const jaCadastrado = await UserModel.validaCpfCnpjCadastrado(cpfCnpjLimpo);
            if (jaCadastrado.length > 0) {
                return ReturnErroPadrao(res, 18);
            }

            let telefoneLimpo
            if(typeof telefone != "undefined"){
                telefoneLimpo = telefone.replace(/\D/g, '')
            }
           
            const user: UserParaCriar = {
                ativo: ativo !== undefined ? ativo : true,
                nome,
                cpfCnpj: cpfCnpjLimpo,
                email,
                telefone:telefoneLimpo
            };

            if (ehFuncionario) {

                if (!login) return ReturnErroPadrao(res, 1);

                if (!cargo) return ReturnErroPadrao(res, 24);

                if(cargo != CargosTiposEnums.administrador && cargo != CargosTiposEnums.vendedor){
                    return ReturnErroPadrao(res, 25)
                }

                const loginPermitido: ValidarLoginInterface = await this.validaLogin(login);

                if (!loginPermitido.permitido) {

                    return ReturnErro(res, loginPermitido.msg, 500);

                }

                const permissoesValidas = await PermissoesModel.buscarPorId(permissoes);

                if (!permissoesValidas || permissoesValidas == null) {
                    return ReturnErroPadrao(res, 20);
                }

            }


            const usuarioSalvo:UserInterface = await UserModel.salvar(user);


            if (ehFuncionario) {
                

                try{

                   const hashPassword = await bcrypt.hash(senha, 8)
    
                    await FuncionariosModel.salvar(
                        {
                            userId:usuarioSalvo._id,
                            ativo: true, 
                            cargo:cargo,
                            permissao:permissoes,
                            login,
                            senha:hashPassword
                        }
                    )

                }catch(e:any){

                    await UserModel.deletePorId(usuarioSalvo._id)

                    throw new Error(e.message)

                }
               
            } 


            return ReturnSucesso(res, usuarioSalvo);

        } catch (e: unknown) {

            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")

        }
    }


    

    

    

}

export default new UserControlle()