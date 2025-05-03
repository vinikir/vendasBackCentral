import { ReturnErro, ReturnSucesso } from "../helpers/helper";
import PermissoesModel from "../models/PermissoesModel";
class PermissoesControlle{

    public async getPermissoes(req: any, res: any) {

        try {

            const { id } = req.params
            const retorno = await PermissoesModel.buscarPorId(id)
            return ReturnSucesso(res, retorno)

        } catch (e) {

            throw new Error(e.message);

        }
    }

    public async getPermissoesTodos(req: any, res: any) {

        try {

            const retorno = await PermissoesModel.buscarTodos()
            return ReturnSucesso(res, retorno)

        } catch (e) {

            throw new Error(e.message);

        }
    }
    public async salvarPermissao(req: any, res: any) {
        try {

            const retorno = await PermissoesModel.salvar(req.body)
            return ReturnSucesso(res, retorno)

        } catch (e) {

            throw new Error(e.message);

        }
    }
}

export default new PermissoesControlle()