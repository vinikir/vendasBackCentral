import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao,ReturnErro, ReturnErroCatch } from "../helpers/helper"
import OrdemServicoModel from "../models/OrdemServicoModel";
import { OrdemServicoStatus } from "../enums/OrdemServicoEstado";
import moment from "moment-timezone";

class OrdemServicoController {
    public async salvar (req: Request, res: Response) {

        try{


            let infos = req.body
            infos.status = OrdemServicoStatus.Aberto
            infos.dataAbertura = moment().tz("America/Sao_Paulo").format()

            const res_salvar = await OrdemServicoModel.salvar(infos)

            return ReturnSucesso(res,res_salvar )
        }catch(e){
            return ReturnErroCatch(res, e.message)
        }
    }
}
export default new OrdemServicoController() 