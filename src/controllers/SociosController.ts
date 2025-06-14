import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao, ReturnErro, ReturnErroCatch } from "../helpers/helper"
import SociosModel from "../models/SociosModel";
import { ValidarCpfCnpj, contemCaracterNaoNumerico } from "../helpers/Funcoes";

class SociosControlle {


    public async buscarTodos(req: Request, res: Response): Promise<Response> {
        try {

            const res_busca = await SociosModel.getAll()

            return ReturnSucesso(res, res_busca)


        } catch (e: unknown) {

            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")

        }
    }


    public async salvar(req: Request, res: Response): Promise<Response> {
        try {

            const {
                nome,
                percenTualLucro,
                cpf
            } = req.body

            if (typeof nome == "undefined" || nome.trim() == "") {

                return ReturnErroPadrao(res, 21)

            }

            if (typeof percenTualLucro == "undefined") {

                return ReturnErroPadrao(res, 22)

            }

            if (contemCaracterNaoNumerico(percenTualLucro)) {

                return ReturnErroPadrao(res, 23)

            }

            const resultadoValidacao = ValidarCpfCnpj(cpf)

            if (!resultadoValidacao.valido) {

                return ReturnErro(res, `${resultadoValidacao.tipo} invalido.`, 998);

            }


            const infos = {
                nome,
                cpf,
                ativo: true,
                percenTualLucro


            }

            const res_salvar = await SociosModel.salvar(infos)

            return ReturnSucesso(res, res_salvar)

        } catch (e: unknown) {

            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")

        }
    }
}
export default new SociosControlle()