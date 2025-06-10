import FaturadoSchema from "../schemas/Faturado";
import { FaturadoInterface } from "../schemas/Faturado";
class FaturadoModel {

    public async salvar(infos: FaturadoInterface): Promise<FaturadoInterface> {
    
        let id = 1

        try {

            const ultimofaturamento = await FaturadoSchema.findOne({}).sort({ faturamentoId: -1 })

            if (ultimofaturamento != null && typeof ultimofaturamento.faturamentoId != "undefined") {
                id = ultimofaturamento.faturamentoId + 1
            }

            infos.faturamentoId = id

            return await FaturadoSchema.create(infos)

        }catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }

    }

    public async busca () {
        try{

            return await FaturadoSchema.find({})
            
        } catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }

      
    }
}

export default new FaturadoModel()
