import moment from "moment-timezone";
import Investimento from "../schemas/Investimento";

class InvestimentoModel {

    public async salvar(infos: object) {

        try {
            let id = 1
            const ultimaMovimentacao = await Investimento.findOne({}).sort({ id: -1 })

            if (ultimaMovimentacao != null && typeof ultimaMovimentacao.id != "undefined") {
                id = ultimaMovimentacao.id + 1
            }

            infos.id = id

            if(infos.dataMovimentacao != "undefined"){
                infos.dataMovimentacao = moment(infos.dataMovimentacao, 'DD/MM/YYYY').toDate();
            }
            return await Investimento.create(infos)

        } catch (e) {

            console.log(e)
            throw new Error(e.message);

        }

    }

    public async busca(dataInicio: string, dataFinal: string) {

        try {

            let busca = {}

            if (typeof dataInicio != "undefined") {
                dataInicio = moment(dataInicio).toDate()
                dataFinal = moment(dataFinal).toDate()
                busca = {
                    dataMovimentacao: {
                        $gte: dataInicio,
                        $lte: dataFinal,
                    },
                }
            }
           
            return await Investimento.find(busca).sort({ id: -1 })

        } catch (e) {

            console.log(e)
            throw new Error(e.message);

        }

    }

    

}

export default new InvestimentoModel()
