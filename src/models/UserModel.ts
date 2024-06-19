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
}

export default new UserModel()