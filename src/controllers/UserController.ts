
import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao,ReturnErro, ReturnErroCatch } from "../helpers/helper"
import bcrypt from 'bcrypt'
import UserModel from "../models/userModel";
import dotenv from 'dotenv'
import { UserInterface, ValidarLoginInterface } from "../interfaces/Interface";

class UserControlle{

    public async buscarTodos(req: Request, res: Response) : Promise<object>{
        const users = UserModel.getAll()
        return res.json({status:"ok"})
    }

    public async create(req: Request, res: Response) : Promise<object>{
        try{

          
            
            const { ativo, nome, login, senha }: UserInterface = req.body; 

            
                
            if(!senha || senha == ''){
                return ReturnErroPadrao( res, 0)
            }
            
            const permitidoCadastro:ValidarLoginInterface = await this.validaLogin( login, res)
            
            if(!permitidoCadastro.permitido){

                return ReturnErro(res,permitidoCadastro.msg, 500)

            }
         
            const hashPassword = await bcrypt.hash(senha, 8)
           
            let user:UserInterface = {
                ativo: true,
                nome, 
                login, 
                senha: hashPassword, 
               
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

    private async validaLogin( login:string, res:Response) {
        try{

            const res_login:UserInterface = await UserModel.findLogin(login)
           
            if(typeof res_login != "undefined" && res_login.length > 0 || res_login.login){
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

            return ReturnErroCatch(res, e.message)

        }
        

    }

    public async login(req: Request, res: Response):  Promise<Response>{

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
            console.error(e.stack);
            return ReturnErroCatch(res, e.message)
        }
    }


}

export default new UserControlle()