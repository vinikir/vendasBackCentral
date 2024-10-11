import Investimento from "../schemas/Investimento";


class InvestimentoModel {

    public async salvar(infos:object){

        try{
            let id = 1
            const ultimaMovimentacao = await Investimento.findOne({}).sort({ id: -1 })
            
            if(ultimaMovimentacao != null && typeof ultimaMovimentacao.id != "undefined"   ){
                id = ultimaMovimentacao.id +1
            }
            
            infos.id = id

            return await Investimento.create(infos)

        }catch(e){

            console.log(e)
            throw new Error(e.message);

        }
        
    }

    public async busca(){

        try{

            return await Investimento.find({}).sort({id:-1})

        }catch(e){

            console.log(e)
            throw new Error(e.message);

        }
        
    }
    
}

export default new InvestimentoModel()
