import UsersShema from "../schemas/Users"

class UserModel {

    public async getAll(){
        console.log(await UsersShema.find())
    }

    public async salvar(infos:object){

        try{

            return await UsersShema.create(infos)

        }catch(e){

            console.log(e)

        }
        
    }

    

    public async findLogin(login:string){

        try{

            return await UsersShema.find({login:login}).select('login')

        }catch(e){

            console.log(e)
            throw e.message
            
        }
    }

    public async findPorLogin(login:string){

        try{
            
            return await UsersShema.find({login:login})

        }catch(e){

            console.log(e)
            throw e.message
            
        }
    }

    public async atualizar(id:string, infos:object){
        try{
            return await UsersShema.updateOne({_id:id}, infos, { new: true })

        }catch(e){

            console.log(e)
            throw e.message
            
        }
    }

    public async buscar(infos:object, limit:number, ofset:number){

        try{
           
            return await UsersShema.find(infos,{nome:1,cpfCnpj:1}).sort({'nome':1}).limit(limit).skip(ofset)

        }catch(e){
            
            throw e.message
            
        }

    }

    
}

export default new UserModel()