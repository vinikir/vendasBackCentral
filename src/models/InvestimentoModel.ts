import moment from "moment-timezone";
import Investimento, { InvestimentoInterface, CompraMercadoriaInterface } from "../schemas/Investimento";
class InvestimentoModel {

public async salvar(infos: InvestimentoInterface | CompraMercadoriaInterface ) : Promise<InvestimentoInterface> {

        try {
            let id = 1
            const ultimaMovimentacao = await Investimento.findOne({}).sort({ id: -1 })

            if (ultimaMovimentacao != null && typeof ultimaMovimentacao.id != "undefined") {
                id = ultimaMovimentacao.id + 1
            }

            infos.id = id

            if (typeof infos.dataMovimentacao === "string" && infos.dataMovimentacao.trim() !== "") {
                infos.dataMovimentacao = moment(infos.dataMovimentacao, 'DD/MM/YYYY').toDate();
            }

            return await Investimento.create(infos)

        } catch (e: unknown) {


            if (e instanceof Error) {
                throw new Error(e.message);
            }

            throw new Error("Erro inesperado");
        }

    }

    public async busca(dataInicio: string | Date, dataFinal: string | Date) {

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

        } catch (e: unknown) {


            if (e instanceof Error) {
                throw new Error(e.message);
            }

            throw new Error("Erro inesperado");
        }

    }


    public async buscaInvestimentos(dataInicio: string | Date, dataFinal: string | Date) {

        try {

            let busca = { tipo: "entrada", dataMovimentacao: {} }

            if (typeof dataInicio != "undefined") {
                dataInicio = moment(dataInicio).toDate()
                dataFinal = moment(dataFinal).toDate()
                busca = {
                    dataMovimentacao: {
                        $gte: dataInicio,
                        $lte: dataFinal,
                    },
                    tipo: "entrada",

                }
            }
            console.log(busca)
            return await Investimento.find(busca).sort({ id: -1 })

        } catch (e: unknown) {


            if (e instanceof Error) {
                throw new Error(e.message);
            }

            throw new Error("Erro inesperado");
        }

    }



}

export default new InvestimentoModel()
