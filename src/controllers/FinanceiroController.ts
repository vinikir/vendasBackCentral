import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao, ReturnErro, ReturnErroCatch } from "../helpers/helper"
import InvestimentoModel from "../models/InvestimentoModel";
import moment from "moment-timezone";
import VendaModel from '../models/VendaModel'
import { CompraMercadoriaInterface } from "../schemas/Investimento";
interface ObjetoComData {
    data: string;
    [key: string]: any;
}

interface CaixaItem {
    data: string;
    valor: number;
    tipo: string;
    informacoes: any;
}

interface InvestimentoItem {
    data: string;            // "DD/MM/YYYY"
    valor: number;
    tipo: string;
    informacoes: any;        // Pode refinar conforme o tipo de `informacoes` ou `socio`
}

interface RetornoInvestimentos {
    valorTotal: string;
    investimetos: InvestimentoItem[];
}

interface VendaItem {
    data: string;            // formato "DD/MM/YYYY"
    valor: number;
    tipo: string;            // sempre será "venda"
    informacoes: any;        // pode refinar se souber a estrutura de `venda.user`
}

interface RetornoVendas {
    valorTotal: string;
    vendas: VendaItem[];
}

class FinanceiroController {


    public async SaidaInvestimentoMercadoria(req: Request, res: Response) {
        try {

            const { valor, dataMovimentacao, informacoes } = req.body;

            if (typeof valor == "undefined" || valor == "") {
                return ReturnErroPadrao(res, 5)
            }

            if (typeof dataMovimentacao == "undefined" || dataMovimentacao == "") {
                return ReturnErroPadrao(res, 5)
            }

            const infos: CompraMercadoriaInterface = {
                tipo: "compra mercadoria",
                dataSalvou: moment().tz("America/Sao_Paulo").format(),
                dataMovimentacao: dataMovimentacao,
                valor: valor,
                informacoes: informacoes
            }

            const resSalvar = await InvestimentoModel.salvar(infos)

            return ReturnSucesso(res, resSalvar)

        } catch (e: unknown) {

            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")

        }


    }


    public ordenarPorData(arrayDeObjetos: ObjetoComData[]): ObjetoComData[] {

        const arrayOrdenado = arrayDeObjetos.map((objeto) => {
            const [dia, mes, ano] = objeto.data.split('/');
            const dataConvertida = new Date(Number(ano), Number(mes) - 1, Number(dia));
            return {
                ...objeto,
                data: dataConvertida,
            };
        });

        arrayOrdenado.sort((a, b) => (a.data as Date).getTime() - (b.data as Date).getTime());

        const arrayFinal = arrayOrdenado.map((objeto) => {
            const data = objeto.data as Date;
            const dia = data.getDate().toString().padStart(2, '0');
            const mes = (data.getMonth() + 1).toString().padStart(2, '0');
            const ano = data.getFullYear();
            return {
                ...objeto,
                data: `${dia}/${mes}/${ano}`,
            };
        });

        return arrayFinal;
    }

    public async BuscaCaixa(req: Request, res: Response) {
        try {
            const inicial = req.query.inicial as string;
            const final = req.query.final as string;



            const retono: CaixaItem[] = [];

            const investimentos = await InvestimentoModel.busca(inicial, final);

            for (const investimento of investimentos) {
                retono.push({
                    data: moment(investimento.dataMovimentacao).format("DD/MM/YYYY"),
                    valor: investimento.valor,
                    tipo: investimento.tipo,
                    informacoes: investimento.informacoes ?? investimento.socio,
                });
            }

            const vendas = await VendaModel.busca(inicial, final);

            for (const venda of vendas) {
                retono.push({
                    data: moment(venda.data).format("DD/MM/YYYY"),
                    valor: venda.valor,
                    tipo: "venda",
                    informacoes: venda.user,
                });
            }

            return ReturnSucesso(res, this.ordenarPorData(retono));

        } catch (e: unknown) {
            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message);
            }
            return ReturnErroCatch(res, "Erro inesperado");
        }
    }

    public async BuscaInvetimentos(req: Request, res: Response) {
        try {

            const inicial = req.query.inicial as string;
            const final = req.query.final as string;

            const retono: RetornoInvestimentos = {
                valorTotal: "",
                investimetos: [],
            };

            const investimentos = await InvestimentoModel.buscaInvestimentos(inicial, final)
            let valorTotal = 0

            for (let index = 0; index < investimentos.length; index++) {
                const investimento = investimentos[index];

                retono.investimetos.push({
                    data: moment(investimento.dataMovimentacao).format("DD/MM/YYYY"),
                    valor: investimento.valor,
                    tipo: investimento.tipo,
                    informacoes: investimento.informacoes ? investimento.informacoes : investimento.socio,
                })
                valorTotal = valorTotal + investimento.valor
            }


            retono.valorTotal = valorTotal.toFixed(2)
            return ReturnSucesso(res, retono)

        } catch (e: unknown) {

            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")

        }
    }

    public async BuscaVendas(req: Request, res: Response) {
        try {

            const inicial = req.query.inicial as string;
            const final = req.query.final as string;

            const retono: RetornoVendas = {
                valorTotal: "",
                vendas: [],
            };


            let valorTotal = 0

            const vendas = await VendaModel.busca(inicial, final)


            for (let index = 0; index < vendas.length; index++) {
                const venda = vendas[index];
                retono.vendas.push({
                    data: moment(venda.data).format("DD/MM/YYYY"),
                    valor: venda.valor,
                    tipo: "venda",
                    informacoes: venda.user,
                })
                valorTotal = valorTotal + venda.valor
            }

            retono.valorTotal = valorTotal.toFixed(2)
            return ReturnSucesso(res, retono)

        } catch (e: unknown) {

            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")

        }
    }

}

export default new FinanceiroController()