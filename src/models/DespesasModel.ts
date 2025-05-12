import Despesas from "../schemas/Despesas";

class DespesaModel {

    public async salvar(infos: object) {
        try {
            return await Despesas.create(infos);
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    public async listarTodos() {
        try {
            return await Despesas.find().sort({ dataMovimentacao: -1 });
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    public async buscarPorId(id: string) {
        try {
            return await Despesas.findById(id);
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    public async atualizarPorId(id: string, dados: object) {
        try {
            return await Despesas.findByIdAndUpdate(id, dados, { new: true });
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    public async listarComFiltro(filtros: any = {}) {
        try {
            return await Despesas.find(filtros).sort({ dataMovimentacao: -1 });
        } catch (e: any) {
            throw new Error(e.message);
        }
    }
}

export default new DespesaModel();
