import  VendaSchema from "../schemas/Venda";


class VendaModel {

    public async getAll(){
        return await VendaSchema.find()
    }

    public async salvar(infos:object){

        try{

            return await VendaSchema.create(infos)

        }catch(e){

            throw new Error(e.message);

        }
        
    }
}

export default new VendaModel()
