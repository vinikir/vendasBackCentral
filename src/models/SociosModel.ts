import Socios from "../schemas/Socios";

class SociosModel {

    public async getAll(){
        return await Socios.find({})
    }

    public async salvar(infos:object){
    
        try{

            return await Socios.create(infos)

        }catch(e){

            console.log(e)
            throw new Error(e.message)
        }
            
    }

}

export default new SociosModel()