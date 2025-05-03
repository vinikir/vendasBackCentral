import VendaSchema from "../schemas/Venda";
import moment from "moment-timezone";
class VendaModel {

    public async busca(dataInicio, dataFinal) {

        let busca = {status: "finalizado"}

        if (typeof dataInicio != "undefined") {
            dataInicio = `${dataInicio}T00:00:00.000-03:00`;
            dataFinal = `${dataFinal}T23:59:59.999-03:00`;
            busca.data = {
                    $gte: dataInicio,
                    $lte: dataFinal,
                }
            
        }

        return await VendaSchema.find(busca).sort({ vendaId: -1 })

    }

    public async buscaProVendedor(dataInicio, dataFinal, vendedorId:string) {

        let busca = {userId: vendedorId}

        if (typeof dataInicio != "undefined") {
            dataInicio = `${dataInicio}T00:00:00.000-03:00`;
            dataFinal = `${dataFinal}T23:59:59.999-03:00`;
            busca.data = {
                    $gte: dataInicio,
                    $lte: dataFinal,
                }
            
            
        }

        return await VendaSchema.find(busca).sort({ vendaId: -1 })

    }

    public async salvar(infos: object) {

        let id = 1

        try {

            const ultimavenda = await VendaSchema.findOne({}).sort({ vendaId: -1 })

            if (ultimavenda != null && typeof ultimavenda.vendaId != "undefined") {
                id = ultimavenda.vendaId + 1
            }

            infos.vendaId = id

            return await VendaSchema.create(infos)

        } catch (e) {

            throw new Error(e.message);

        }

    }
}

export default new VendaModel()
