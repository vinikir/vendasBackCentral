
import { ReturnSucesso, ReturnErroPadrao,ReturnErro, ReturnErroCatch } from "../helpers/helper"
import bcrypt from 'bcrypt'

interface User {
    ativo: boolean;
    nome: string;
    login: string;
    senha: string; 
}

class UserControlle{

    public async create(req: Request<User>, res: Response) : Promise<object>{
        try{

          
            
         const { ativo, nome, login, senha }: User = req.body; 

            
            
            if(!senha || senha == ''){
                return ReturnErroPadrao(res,0)
            }
            
           

            
            const permitidoCadastro = await this.validaLogin( login)
        
            if(!permitidoCadastro.permitido){
                return ReturnErro(res,permitidoCadastro.msg, 500, 9998)
            }
                 
            
         
            const hashPassword = await bcrypt.hash(senha, 8)
    
    
            let user = {
                codIntegracao, email, 
                nome, login, 
                senha: hashPassword, 
                uberizacao: uberizacao,
                status_aprovacao: status_aprovacao,
                tipoPessoa: tipoPessoa, 
                endereco: endereco, 
                habilidades: habilidades,
                dadosPessoa: dadosPessoa, 
                dadosEmpresa: dadosEmpresa
            }


            if(req.body.ativo){
                user.ativo = req.body.ativo
            }else{
                user.ativo =  true
            }
            
            let userCreate : any =  {}

            if(user_id) {
                userCreate  = await UsersModel.atualizarPorId(user_id,user,ambiente)
            }else{
                userCreate = await UsersModel.salvar(user, ambiente)
            }
          
            
            userCreate.senha = undefined

    
            Helper().salvarLog(userCreate, 1, "create", "usuarios")
           
            return Helper().sucesso(res,userCreate)

        }catch(e){

            return Helper().erroCatch(res, e.message)

        }
       
        

    }


}

export default new UserControlle()