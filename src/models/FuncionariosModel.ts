import Funcionarios from "../schemas/Funcionarios"
import { CargosTiposEnums } from "../enums/CargosEnum"
import { FuncionariosInterface } from "../interfaces/FuncionarioInterface"

class FuncionariosModel {

    public async getAll() {
        console.log(await Funcionarios.find())
    }

    public async salvar(infos: object): Promise<FuncionariosInterface> {

        try {

            const funcionario = await Funcionarios.create(infos)
            return funcionario.toObject();

        } catch (e) {

            console.log(e)
            throw new Error(e.message)
        }

    }







    public async atualizar(id: string, infos: object) {
        try {
            return await Funcionarios.updateOne({ _id: id }, infos, { new: true })

        } catch (e) {

            console.log(e)
            throw new Error(e.message)

        }
    }

    public async buscar(infos: object, limit: number, ofset: number) {

        try {
            return await Funcionarios.find(infos, { nome: 1, cpfCnpj: 1 }).sort({ 'nome': 1 }).limit(limit).skip(ofset)

        } catch (e) {

            throw new Error(e.message)

        }

    }





    public async buscaPorId(valor: string) {
        try {

            return await Funcionarios.find({ _id: valor })

        } catch (e) {

            throw new Error(e.message)

        }
    }

    public async findPorLogin(login: string) {

        try {

            return await Funcionarios.find({ login: login })

        } catch (e) {


            throw new Error(e.message)

        }
    }

    public async buscaVendedor() {
        try {

            return await Funcionarios.find({cargo: {$in: [CargosTiposEnums.administrador, CargosTiposEnums.vendedor]}})
            

        } catch (e) {


            throw new Error(e.message)

        }
    }



}

export default new FuncionariosModel()