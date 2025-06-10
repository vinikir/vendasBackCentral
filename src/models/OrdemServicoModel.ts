import OrdemServico,  {OrdemServicoInterface} from "../schemas/OrdemServico";

class OrdemServicoModel {
    public async salvar(infos:OrdemServicoInterface):Promise<OrdemServicoInterface>{

        let id = 1

        try{

            const ultimoOcamento = await OrdemServico.findOne({}).sort({ ordemServicoId: -1 })
            
            if(ultimoOcamento != null && typeof ultimoOcamento.ordemServicoId != "undefined"   ){
                id = ultimoOcamento.ordemServicoId +1
            }

            infos.ordemServicoId =id
            
            return await OrdemServico.create(infos)

        }catch (e: unknown) {


            if (e instanceof Error) {
                throw new Error(e.message);
            }

            throw new Error("Erro inesperado");
        }
        
    }
}

export default new OrdemServicoModel()
