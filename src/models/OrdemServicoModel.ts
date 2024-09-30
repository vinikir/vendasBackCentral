import OrdemServico,  {OrdemServicoInterface} from "../schemas/OrdemServico";

class OrdemServicoModel {
    public async salvar(infos:object):Promise<object>{

        let id = 1

        try{

            const ultimoOcamento:OrdemServicoInterface = await OrdemServico.findOne({}).sort({ ordemServicoId: -1 })
            
            if(ultimoOcamento != null && typeof ultimoOcamento.ordemServicoId != "undefined"   ){
                id = ultimoOcamento.ordemServicoId +1
            }

            infos.ordemServicoId =id
            
            return await OrdemServico.create(infos)

        }catch(e){

            throw new Error(e.message);

        }
        
    }
}

export default new OrdemServicoModel()
