import Investimento from "../schemas/Investimento";


class InvestimentoModel {

    public async salvar(infos:object){

        try{

            return await Investimento.create(infos)

        }catch(e){

            console.log(e)
            throw new Error(e.message);

        }
        
    }
    
}

export default new InvestimentoModel()
