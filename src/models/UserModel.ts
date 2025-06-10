import { UserInterface } from "../interfaces/Interface"
import UsersShema from "../schemas/Users"
class UserModel {

    public async getAll() {
        console.log(await UsersShema.find())
    }

    public async salvar(infos: object): Promise<UserInterface> {

        try {

            const usuario = await UsersShema.create(infos)
            return usuario.toObject();

        } catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }

    }

    public async deletePorId(id: string) {

        try {

            return await UsersShema.deleteOne({ _id: id })

        }catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }

    }



    public async findLogin(login: string): Promise<Array<object>> {

        try {

            return await UsersShema.find({ login: login })

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

            return await UsersShema.find({ login: login })

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
            return await UsersShema.updateOne({ _id: id }, infos, { new: true })

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
            return await UsersShema.find(infos, { nome: 1, cpfCnpj: 1 }).sort({ 'nome': 1 }).limit(limit).skip(ofset)

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

            return await UsersShema.find({ $or: [{ tipo: "socio" }, { tipo: "funcionario" }] }, { nome: 1, _id: 1 }).sort({ 'nome': 1 })

        }catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }

    }

    public async validaCpfCnpjCadastrado(valor: string): Promise<Array<UserInterface>> {
        try {

            return await UsersShema.find({ cpfCnpj: valor })

        } catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }
    }

    public async buscaPorId(valor: string): Promise<Array<UserInterface>> {
        try {

            return await UsersShema.find({ _id: valor })

        } catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }
    }
    public async buscaPorArrayId(valor: Array<string>):Promise<Array<UserInterface>> {
        try {

            return await UsersShema.find({ _id: { $in: valor } })

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

export default new UserModel()