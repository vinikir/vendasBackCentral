import  VendaSchema from "../schemas/Venda";


class VendaModel {

    public async busca(){
        return await VendaSchema.find({status:"finalizado"}).sort({ data: -1 })
    }

    public async salvar(infos:object){

        let id = 1

        try{

            const ultimavenda = await VendaSchema.findOne({}).sort({ vendaId: -1 })
            
            if(ultimavenda != null && typeof ultimavenda.vendaId != "undefined"   ){
                id = ultimavenda.vendaId +1
            }

            infos.vendaId =id
            
            return await VendaSchema.create(infos)

        }catch(e){

            throw new Error(e.message);

        }
        
    }
}

export default new VendaModel()
