import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao, ReturnErroCatch } from "../helpers/helper";
import FornecedoresModel from "../models/FornecedoresModel";

class FornecedorController {

    public async salvar(req: Request, res: Response) {
        try {
            let {
                nome,
                documento,
                inscricaoEstadual,
                telefone,
                email,
                endereco,
                contato,
                tipoFornecedor,
                produtosFornecidos,
                observacoes
            } = req.body;

            if (!nome || !documento || !telefone || !email || !endereco || !contato || !tipoFornecedor) {
                return ReturnErroPadrao(res, 5); // ou crie códigos mais específicos para campos obrigatórios
            }

            documento = documento.replace(/[^\d]/g, "");


            const fornecedorCriado = await FornecedoresModel.salvar({
                nome,
                documento,
                inscricaoEstadual,
                telefone,
                email,
                endereco,
                contato,
                tipoFornecedor,
                produtosFornecidos,
                observacoes
            });

            return ReturnSucesso(res, fornecedorCriado);
        } catch (e: any) {
            return ReturnErroCatch(res, e.message);
        }
    }

    public async buscarPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) return ReturnErroPadrao(res, 5);

            const resultado = await FornecedoresModel.buscarPorId(id);
            return ReturnSucesso(res, resultado);
        } catch (e: any) {
            return ReturnErroCatch(res, e.message);
        }
    }

    public async buscarPorDumento(req: Request, res: Response) {
        try {
            const { documento } = req.params;

            if (!documento) return ReturnErroPadrao(res, 5);

            const resultado = await FornecedoresModel.buscarPorDocumento(documento);
            return ReturnSucesso(res, resultado);
        } catch (e: any) {
            return ReturnErroCatch(res, e.message);
        }
    }

    public async buscarPorNome(req: Request, res: Response) {
        try {
            const { nome } = req.query;
            
            if (!nome || typeof nome !== "string") return ReturnErroPadrao(res, 5);

            const resultado = await FornecedoresModel.buscarPorNome(nome);
            return ReturnSucesso(res, resultado);
        } catch (e: any) {
            return ReturnErroCatch(res, e.message);
        }
    }

    public async atualizarPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const dados = req.body;

            if (!id) return ReturnErroPadrao(res, 5);

            const resultado = await FornecedoresModel.atualizarPorId(id, dados);
            return ReturnSucesso(res, resultado);
        } catch (e: any) {
            return ReturnErroCatch(res, e.message);
        }
    }

    public async listarTodos(_: Request, res: Response) {
        try {
            const resultado = await FornecedoresModel.listarTodos();
            return ReturnSucesso(res, resultado);
        } catch (e: any) {
            return ReturnErroCatch(res, e.message);
        }
    }
}

export default new FornecedorController();
