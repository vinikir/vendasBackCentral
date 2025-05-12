import { UserInterface } from "../interfaces/Interface"
import UsersShema from "../schemas/Users"
class UserModel {

    public async getAll(){
        console.log(await UsersShema.find())
    }

    public async salvar(infos:object): Promise<UserInterface>{

        try{

            const usuario = await UsersShema.create(infos)
            return usuario.toObject();

        }catch(e){

            console.log(e)
            throw new Error(e.message)
        }
        
    }

    public async deletePorId(id:string){

        try{

            return await UsersShema.deleteOne({_id:id})

        }catch(e){

            console.log(e)
            throw new Error(e.message)
        }
        
    }

    

    public async findLogin(login:string):Promise<Array<object>>{

        try{
            
            return await UsersShema.find({login:login})

        }catch(e){

            
            throw new Error(e.message)
            
        }
    }

    public async findPorLogin(login:string){

        try{
            
            return await UsersShema.find({login:login})

        }catch(e){

            console.log(e)
            throw new Error(e.message)
            
        }
    }

    public async atualizar(id:string, infos:object){
        try{
            return await UsersShema.updateOne({_id:id}, infos, { new: true })

        }catch(e){

            console.log(e)
            throw new Error(e.message)
            
        }
    }

    public async buscar(infos:object, limit:number, ofset:number){

        try{
            return await UsersShema.find(infos,{nome:1,cpfCnpj:1}).sort({'nome':1}).limit(limit).skip(ofset)

        }catch(e){
            
            throw new Error(e.message)
            
        }

    }

    public async buscaVendedor(){

        try{
          
            return await UsersShema.find({ $or: [ { tipo:"socio" } , {tipo:"funcionario"} ] },{nome:1,_id:1}).sort({'nome':1})

        }catch(e){
            
            throw new Error(e.message)
            
        }

    }

    public async validaCpfCnpjCadastrado( valor:string) {
        try{
          
            return await UsersShema.find({ cpfCnpj: valor})

        }catch(e){
            
            throw new Error(e.message)
            
        }
    }

    public async buscaPorId( valor:string) {
        try{
          
            return await UsersShema.find({ _id: valor})

        }catch(e){
            
            throw new Error(e.message)
            
        }
    }
    

    
}

export default new UserModel()