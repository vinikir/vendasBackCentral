import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao, ReturnErroCatch } from "../helpers/helper";
import moment from "moment-timezone";
import DespesasModel from "../models/DespesasModel";
class DespesaController {

    public async salvar(req: Request, res: Response) {
        try {
            const {
                valor,
                dataMovimentacao,
                descricao,
                categoria,
                formaPagamento,
                fornecedorId,
                fornecedorNome,
                funcionarioId,
                funcionarioNome,
                observacao
            } = req.body;

            if (!valor || !dataMovimentacao || !categoria || !formaPagamento) {
                return ReturnErroPadrao(res, 5);
            }

            const dataSalvou = moment().tz("America/Sao_Paulo").toDate();

            const resultado = await DespesasModel.salvar({
                valor: parseFloat(valor),
                dataSalvou,
                dataMovimentacao,
                descricao,
                categoria,
                formaPagamento,
                fornecedorId,
                fornecedorNome,
                funcionarioId,
                funcionarioNome,
                observacao
            });

            return ReturnSucesso(res, resultado);
        } catch (e: unknown) {
          
            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")
            
        }
    }

    public async listarTodos(_: Request, res: Response) {
        try {
            const resultado = await DespesasModel.listarTodos();
            return ReturnSucesso(res, resultado);
        } catch (e: unknown) {
          
            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")
            
        }
    }

    public async buscarPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) return ReturnErroPadrao(res, 5);

            const resultado = await DespesasModel.buscarPorId(id);
            return ReturnSucesso(res, resultado);
        } catch (e: unknown) {
          
            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")
            
        }
    }

    public async atualizarPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) return ReturnErroPadrao(res, 5);

            const resultado = await DespesasModel.atualizarPorId(id, req.body);
            return ReturnSucesso(res, resultado);
        } catch (e: unknown) {
          
            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")
            
        }
    }

    public async listarComFiltro(req: Request, res: Response) {
        try {
            const { categoria, formaPagamento, fornecedorId, funcionarioId } = req.query;

            const filtros: any = {};

            if (categoria) filtros.categoria = categoria;
            if (formaPagamento) filtros.formaPagamento = formaPagamento;
            if (fornecedorId) filtros.fornecedorId = fornecedorId;
            if (funcionarioId) filtros.funcionarioId = funcionarioId;

            const resultado = await DespesasModel.listarComFiltro(filtros);
            return ReturnSucesso(res, resultado);
        } catch (e: unknown) {
          
            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")
            
        }
    }

}

export default new DespesaController();
