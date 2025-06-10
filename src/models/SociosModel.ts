import Socios from "../schemas/Socios";

class SociosModel {

    public async getAll(){
        return await Socios.find({})
    }

    public async salvar(infos:object){
    
        try{

            return await Socios.create(infos)

        }catch (e: unknown) {


            if (e instanceof Error) {
                throw new Error(e.message);
            }

            throw new Error("Erro inesperado");
        }
            
    }

}

export default new SociosModel()