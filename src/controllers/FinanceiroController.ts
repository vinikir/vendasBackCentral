import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao,ReturnErro, ReturnErroCatch } from "../helpers/helper"
import InvestimentoModel from "../models/InvestimentoModel";
import moment  from "moment-timezone";
import VendaModel from '../models/VendaModel'


class FinanceiroController {

    public async EntradaInvestimento (req: Request, res: Response) {
        try{

            const {  valor, dataMovimentacao, socio } = req.body;

            if(typeof valor == "undefined" || valor == ""){
                return ReturnErroPadrao(res, 5)
            } 

            if(typeof dataMovimentacao == "undefined" || dataMovimentacao == ""){
                return ReturnErroPadrao(res, 5)
            } 

            const infos = {
                tipo:"entrada",
                dataSalvou:moment().tz("America/Sao_Paulo").format(),
                dataMovimentacao:dataMovimentacao,
                valor:valor,
                socio:socio
            }
 
            const resSalvar = await InvestimentoModel.salvar(infos)

            return ReturnSucesso(res, resSalvar)

        }catch(e){
            return  ReturnErroCatch(res, e.message)
        }
        

    }

    

    public async SaidaInvestimentoMercadoria(req: Request, res: Response) {
        try{

            const {  valor, dataMovimentacao, informacoes } = req.body;

            if(typeof valor == "undefined" || valor == ""){
                return ReturnErroPadrao(res, 5)
            } 

            if(typeof dataMovimentacao == "undefined" || dataMovimentacao == ""){
                return ReturnErroPadrao(res, 5)
            } 

            const infos = {
                tipo:"compra mercadoria",
                dataSalvou:moment().tz("America/Sao_Paulo").format(),
                dataMovimentacao:dataMovimentacao,
                valor:valor,
                informacoes:informacoes
            }
    
            const resSalvar = await InvestimentoModel.salvar(infos)

            return ReturnSucesso(res, resSalvar)

        }catch(e){
            return  ReturnErroCatch(res, e.message)
        }
        

    }


    public ordenarPorData(arrayDeObjetos) {
        // Converter as datas para o formato Date do JavaScript
        const arrayOrdenado = arrayDeObjetos.map(objeto => {
          const [dia, mes, ano] = objeto.data.split('/');
          objeto.data = new Date(ano, mes - 1, dia); // mês é zero-indexado
          return objeto;
        });
      
        // Ordenar o array pelo atributo data (agora no formato Date)
        arrayOrdenado.sort((a, b) => a.data - b.data);
      
        // Converter as datas de volta para o formato "DD/MM/YYYY"
        arrayOrdenado.forEach(objeto => {
          const dia = objeto.data.getDate().toString().padStart(2, '0');
          const mes = (objeto.data.getMonth() + 1).toString().padStart(2, '0');
          const ano = objeto.data.getFullYear();
          objeto.data = `${dia}/${mes}/${ano}`;
        });
      
        return arrayOrdenado;
      }

    public async BuscaCaixa (req: Request, res: Response) {
        try{

            const {inicial, final} = req.query

            let retono:Array<object> = []
            
            const investimentos = await InvestimentoModel.busca(inicial, final)
            

            for (let index = 0; index < investimentos.length; index++) {
                const investimento = investimentos[index];
                
                retono.push({
                    data:moment(investimento.dataMovimentacao).format("DD/MM/YYYY"),
                    valor:investimento.valor,
                    tipo:investimento.tipo,
                    informacoes:investimento.informacoes ? investimento.informacoes: investimento.socio ,
                })
            }


            const vendas = await VendaModel.busca(inicial, final)

            
            for (let index = 0; index < vendas.length; index++) {
                const venda = vendas[index];
                retono.push({
                    data:moment(venda.data).format("DD/MM/YYYY"),
                    valor:venda.valor,
                    tipo:"venda",
                    informacoes:venda.user,
                })
            }
            return ReturnSucesso(res, this.ordenarPorData(retono))

        }catch(e){
            return  ReturnErroCatch(res, e.message)
        }
    }

    public async BuscaInvetimentos (req: Request, res: Response) {
        try{

            const {inicial, final} = req.query

            let retono:object = {valorTotal:"", investimetos:[]}
            
            const investimentos = await InvestimentoModel.buscaInvestimentos(inicial, final)
            let valorTotal = 0

            for (let index = 0; index < investimentos.length; index++) {
                const investimento = investimentos[index];
                
                retono.investimetos.push({
                    data:moment(investimento.dataMovimentacao).format("DD/MM/YYYY"),
                    valor:investimento.valor,
                    tipo:investimento.tipo,
                    informacoes:investimento.informacoes ? investimento.informacoes: investimento.socio ,
                })
                valorTotal = valorTotal+investimento.valor
            }


            retono.valorTotal = valorTotal.toFixed(2)
            return ReturnSucesso(res, retono)

        }catch(e){
            return  ReturnErroCatch(res, e.message)
        }
    }

    public async BuscaVendas (req: Request, res: Response) {
        try{

            const {inicial, final} = req.query

            let retono:object = {valorTotal:"", vendas:[]}
            
            let valorTotal = 0

            const vendas = await VendaModel.busca(inicial, final)

            
            for (let index = 0; index < vendas.length; index++) {
                const venda = vendas[index];
                retono.vendas.push({
                    data:moment(venda.data).format("DD/MM/YYYY"),
                    valor:venda.valor,
                    tipo:"venda",
                    informacoes:venda.user,
                })
                valorTotal = valorTotal+venda.valor
            }

            retono.valorTotal = valorTotal.toFixed(2)
            return ReturnSucesso(res, retono)

        }catch(e){
            return  ReturnErroCatch(res, e.message)
        }
    }

}

export default new FinanceiroController()