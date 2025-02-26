
import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao,ReturnErro, ReturnErroCatch } from "../helpers/helper"
import bcrypt from 'bcrypt'
import UserModel from "../models/UserModel";
import dotenv from 'dotenv'
import {  UserInterface, ValidarLoginInterface } from "../interfaces/Interface";
import { ValidarCpfCnpj } from "../helpers/Funcoes";
import { UserSearchParams } from "../interfaces/Interface";
import { ajustarPesquisaParaBuscaLike } from "../helpers/Funcoes";
import { TipoUsuariosEnums } from "../enums/TipoUsuariosEnums";
class UserControlle{

    public async buscarTodos(req: Request, res: Response) : Promise<object>{
        const users = UserModel.getAll()
        return res.json({status:"ok"})
    }

    private aplicarMascaraCpfCnpj(valor:string) {
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

   

    public async buscar(req: Request, res: Response): Promise<object>{
        try{

            let infos:any = { }
            let limit:number = 50
            let offset:number = 0
         
            const query:UserSearchParams = req.query

            if(typeof query != "undefined" && typeof query.id  != "undefined"){
                infos._id = query.id
            }

            if(typeof query != "undefined" && typeof query.tipo  != "undefined"){
                infos.tipo = query.tipo
            }

           
            if(typeof query != "undefined" && typeof query.search  != "undefined" && query.search  != "undefined" && query.search  != ""){

                query.search = ajustarPesquisaParaBuscaLike(query.search)

                if(!isNaN(query.search)){
                    infos.cpfCnpj ={ 
                        $regex: new RegExp(query.search, 'i') 
                    }
                }else{

                    infos.nome ={ 
                        $regex: new RegExp(query.search, 'i') 
                    }
                }
                
            }
            
            if(typeof query != "undefined" && typeof  query.limit  != "undefined" ){

                limit = query.limit

            }

            if(typeof query != "undefined" && typeof  query.offset  != "undefined" ){

                offset = query.offset

            }

            

            let usuario = await UserModel.buscar(infos, limit, offset)

           

            for (let index = 0; index < usuario.length; index++) {
                const element = usuario[index];
                usuario[index].cpfCnpj =  this.aplicarMascaraCpfCnpj(element.cpfCnpj) 
            }
           
            return ReturnSucesso(res,usuario)

        }catch(e){
            return ReturnErroCatch(res, e.message)
        }
    }

    public async buscarClientes(req: Request, res: Response): Promise<object>{
        try{

            let infos:any = {
                "tipo":"cliente"
            }
            let limit:number = 50
            let offset:number = 0
         
            const query:UserSearchParams = req.query

            if(typeof query != "undefined" && typeof query.id  != "undefined"){
                infos._id = query.id
            }

           
            if(typeof query != "undefined" && typeof query.search  != "undefined" && query.search  != "undefined" && query.search  != ""){

                query.search = ajustarPesquisaParaBuscaLike(query.search)
                console.log(isNaN(query.search))
                if(isNaN(query.search)){
                    infos.cpfCnpj ={ 
                        $regex: new RegExp(query.search, 'i') 
                    }
                }else{

                    infos.nome ={ 
                        $regex: new RegExp(query.search, 'i') 
                    }
                }
                
            }
            
            if(typeof query != "undefined" && typeof  query.limit  != "undefined" ){

                limit = query.limit

            }

            if(typeof query != "undefined" && typeof  query.offset  != "undefined" ){

                offset = query.offset

            }

            

            let usuario = await UserModel.buscar(infos, limit, offset)

           

            for (let index = 0; index < usuario.length; index++) {
                const element = usuario[index];
                usuario[index].cpfCnpj =  this.aplicarMascaraCpfCnpj(element.cpfCnpj) 
            }
           
            return ReturnSucesso(res,usuario)

        }catch(e){
            return ReturnErroCatch(res, e.message)
        }
    }

    public async create(req: Request, res: Response) : Promise<object>{
        try{
            
            const { ativo, nome, login, senha, cpfCnpj, tipo }: UserInterface = req.body; 
              
            if(( typeof senha == "undefined" || senha == '' ) &&  ( tipo == TipoUsuariosEnums.funcionario || tipo == TipoUsuariosEnums.socio ) ){
                return ReturnErroPadrao( res, 0)
            }

            if( ( typeof cpfCnpj == "undefined" || cpfCnpj == '' ) &&  ( tipo == TipoUsuariosEnums.funcionario || tipo == TipoUsuariosEnums.socio )  ){

                return ReturnErroPadrao( res, 6)

            }

            if( typeof tipo == "undefined" || tipo == ''){

                return ReturnErroPadrao( res, 7)

            }
            
            const resValidaCnpj = ValidarCpfCnpj(cpfCnpj)
            
            if(resValidaCnpj.valido == false){

                return ReturnErro(res,resValidaCnpj.tipo, 998 )

            }

            const cpfCnpjLimpo = resValidaCnpj.valor

            const resValidaCnpjCadastrado = await UserModel.validaCpfCnpjCadastrado( cpfCnpjLimpo )

            if(resValidaCnpjCadastrado.length > 0){

                return ReturnErroPadrao( res, 18)

            }
          

            let user:UserInterface = {
                ativo: true,
                nome, 
                cpfCnpj:cpfCnpjLimpo,
                tipo:tipo
            }
            
            if( tipo == TipoUsuariosEnums.funcionario ||  tipo ==  TipoUsuariosEnums.socio ){

                if(typeof login == "undefined"){

                    return ReturnErroPadrao(res, 17 )

                }

                const permitidoCadastro:ValidarLoginInterface  = await this.validaLogin( login )

                
                if(!permitidoCadastro.permitido){
    
                    return ReturnErro(res,permitidoCadastro.msg, 500)
    
                }
                const hashPassword =  await bcrypt.hash( senha, 8)
                user.login = login
                user.senha = hashPassword

            }

            if(typeof ativo != "undefined"){
                user.ativo = ativo
            }
            
            let userCreate : any =  {}
          
            userCreate = await UserModel.salvar(user)
            
            userCreate.senha = undefined
           
            return ReturnSucesso(res,userCreate)

        }catch(e){

            return ReturnErroCatch(res, e.message)

        }
       
        

    }

    public async trocarSenha(req: Request, res: Response){
        try{
            const {  senha, id } = req.body; 

            if(typeof senha == "undefined" || senha == ''){
                return ReturnErroPadrao( res, 0)
            }

            if(typeof id == "undefined" || id == ''){
                return ReturnErroPadrao( res, 9)
            }

            const hashPassword = await bcrypt.hash(senha, 8)


            const res_up = await UserModel.atualizar(id, {senha: hashPassword})

            return ReturnSucesso(res,res_up)

        }catch(e){

            return ReturnErroCatch(res, e.message)

        }
    }

    private async validaLogin( login:string ):Promise<ValidarLoginInterface> {
        try{
            
            const res_login:UserInterface = await UserModel.findLogin(login)

            

            if( ( typeof res_login != "undefined" && res_login.length > 0 ) || res_login.login){
                return {
                    permitido:false,
                    msg:"Login já cadastrado"
                }
            }
            
            return {
                permitido:true,
                msg:""
            }

        }catch(e){

            throw new Error(e.message)

        }
        

    }

    public async login(req: Request, res: Response):  Promise<Response> {

        try{
            
          

            const {login, senha} = req.body

            dotenv.config()

            let sucess:Object

            if (typeof login == "undefined" || login == ""){
                return ReturnErroPadrao(res,1)
            }

            

            let userLogin:Array<UserInterface> = await UserModel.findPorLogin(login)
            
            if(!userLogin){
                return ReturnErroPadrao(res,2)
            }
                
            if (userLogin == null) {
                
                return ReturnErroPadrao(res,2)

            }

            if(userLogin.length == 0){
                return ReturnErroPadrao(res,2)
            }

            const usuario:UserInterface = userLogin[0]
            
            let senhaCompare:string = usuario.senha
            
            const passwordVerify = await bcrypt.compare(senha, senhaCompare)
                
            if (senha.length <= 0) {

                return ReturnErroPadrao(res,1)
            
            }

            if (!passwordVerify) {

                return ReturnErroPadrao(res,2)
            
            
            }
               
            sucess = {
                "Nome": `${usuario.nome}`,
                "ID": `${usuario._id}`,
            }
            
            return ReturnSucesso(res, sucess)
            
        }catch(e){
            
            return ReturnErroCatch(res, e.message)
        }
    }

    public async listarVendedor(req: Request, res: Response):Promise<Response>{
        try{

            const res_buscaVendedor = await UserModel.buscaVendedor()
            return ReturnSucesso(res, res_buscaVendedor)

        }catch(e){
            
            return ReturnErroCatch(res, e.message)
        }
    }


}

export default new UserControlle()