import  OrcamentoSchema, {OrcamentoInterface, OrcamentoInterfaceSalvar} from "../schemas/Orcamento"

class VendaModel {

    public async getAll(){
        return await OrcamentoSchema.find().sort({ vendaId: -1 })
    }

    public async salvar(infos:OrcamentoInterfaceSalvar ) :Promise<OrcamentoInterface>{

        let id = 1

        try{

            const ultimoOcamento = await OrcamentoSchema.findOne({}).sort({ orcamentoId: -1 })
            
            if(ultimoOcamento != null && typeof ultimoOcamento.orcamentoId != "undefined"   ){
                id = ultimoOcamento.orcamentoId +1
            }

            infos.orcamentoId = id
            
            return await OrcamentoSchema.create(infos)

        }catch (e: unknown) {


            if (e instanceof Error) {
                throw new Error(e.message);
            }

            throw new Error("Erro inesperado");
        }
        
    }
}

export default new VendaModel()
