import KardexSchema  from "../schemas/Kardex";


class KardexModel {

    public async getAll(){
        return await KardexSchema.find()
    }

    public async salvar(infos:object){

        try{

            return await KardexSchema.create(infos)

        }catch(e){

            console.log(e)
            throw new Error(e.message);

        }
        
    }
}

export default new KardexModel()
