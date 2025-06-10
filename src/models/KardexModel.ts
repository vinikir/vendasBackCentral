import KardexSchema  from "../schemas/Kardex";


class KardexModel {

    public async getAll(){
        return await KardexSchema.find()
    }

    public async salvar(infos:object){

        try{

            return await KardexSchema.create(infos)

        }catch (e: unknown) {


            if (e instanceof Error) {
                throw new Error(e.message);
            }

            throw new Error("Erro inesperado");
        }
        
    }
}

export default new KardexModel()
