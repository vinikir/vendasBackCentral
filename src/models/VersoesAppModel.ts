import VersoesApp from "../schemas/VersoesApp"

class VersoesAppModel {

    public async buscaUltimoId(){

        return await VersoesApp.findOne({},{id:true}).sort({ id: -1 })
        
    }

    public async salvar(infos:object){

        

        try{

            return await VersoesApp.create(infos)

        }catch(e){

            throw new Error(e.message);

        }
        
    }
}

export default new VersoesAppModel()
