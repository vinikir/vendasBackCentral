import FaturadoSchema from "../schemas/Faturado";

class FaturadoModel {

    public async salvar(infos: object) {
    
        let id = 1

        try {

            const ultimofaturamento = await FaturadoSchema.findOne({}).sort({ faturamentoId: -1 })

            if (ultimofaturamento != null && typeof ultimofaturamento.faturamentoId != "undefined") {
                id = ultimofaturamento.faturamentoId + 1
            }

            infos.faturamentoId = id

            return await FaturadoSchema.create(infos)

        } catch (e) {

            throw new Error(e.message);

        }

    }

    public async busca () {
        try{

            return await FaturadoSchema.find({})
            
        } catch (e) {

            throw new Error(e.message);

        }

      
    }
}

export default new FaturadoModel()
