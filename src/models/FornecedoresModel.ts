import Fornecedores from "../schemas/Fornecedores";

class FornecedorModel {

	public async salvar(infos: object) {
		try {
			return await Fornecedores.create(infos);
		} catch (e: any) {
			throw new Error(e.message);
		}
	}

	public async buscarPorId(id: string) {
		try {
			return await Fornecedores.findById(id);
		} catch (e: any) {
			throw new Error(e.message);
		}
	}

	public async buscarPorDocumento(documento: string) {
		try {
			return await Fornecedores.findOne({ documento });
		} catch (e: any) {
			throw new Error(e.message);
		}
	}

	public async buscarPorNome(nome: string) {
		try {
			return await Fornecedores.find({
				nome: { $regex: new RegExp(nome, "i") },
			});
		} catch (e: any) {
			throw new Error(e.message);
		}
	}

	public async atualizarPorId(id: string, dados: object) {
		try {
			return await Fornecedores.findByIdAndUpdate(id, dados, { new: true });
		} catch (e: any) {
			throw new Error(e.message);
		}
	}

	public async listarTodos() {
		try {
			return await Fornecedores.find({});
		} catch (e: any) {
			throw new Error(e.message);
		}
	}
}

export default new FornecedorModel();
