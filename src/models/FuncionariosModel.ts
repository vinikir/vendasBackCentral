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

        } catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }

    }







    public async atualizar(id: string, infos: object) {
        try {
            return await Funcionarios.updateOne({ _id: id }, infos, { new: true })

        } catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }
    }

    public async buscar(infos: object, limit: number, ofset: number) {

        try {
            return await Funcionarios.find(infos, { nome: 1, cpfCnpj: 1 }).sort({ 'nome': 1 }).limit(limit).skip(ofset)

        } catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }

    }





    public async buscaPorId(valor: string) {
        try {

            return await Funcionarios.find({ _id: valor })

        } catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }
    }

    public async findPorLogin(login: string) {

        try {

            return await Funcionarios.find({ login: login })

        } catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }
    }

    public async buscaVendedor() {
        try {

            return await Funcionarios.find({cargo: {$in: [CargosTiposEnums.administrador, CargosTiposEnums.vendedor]}})
            

        } catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }
    }



}

export default new FuncionariosModel()