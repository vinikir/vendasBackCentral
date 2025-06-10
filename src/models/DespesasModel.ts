import Despesas from "../schemas/Despesas";

class DespesaModel {

    public async salvar(infos: object) {
        try {
            return await Despesas.create(infos);
        } catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }
    }

    public async listarTodos() {
        try {
            return await Despesas.find().sort({ dataMovimentacao: -1 });
        } catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }
    }

    public async buscarPorId(id: string) {
        try {
            return await Despesas.findById(id);
        } catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }
    }

    public async atualizarPorId(id: string, dados: object) {
        try {
            return await Despesas.findByIdAndUpdate(id, dados, { new: true });
        } catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }
    }

    public async listarComFiltro(filtros: any = {}) {
        try {
            return await Despesas.find(filtros).sort({ dataMovimentacao: -1 });
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

export default new DespesaModel();
