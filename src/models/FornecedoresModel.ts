import Fornecedores from "../schemas/Fornecedores";

class FornecedorModel {

	public async salvar(infos: object) {
		try {
			return await Fornecedores.create(infos);
		}catch (e: unknown) {

           
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            throw new Error("Erro inesperado");
        }
	}

	public async buscarPorId(id: string) {
		try {
			return await Fornecedores.findById(id);
		} catch (e: unknown) {

           
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            throw new Error("Erro inesperado");
        }
	}

	public async buscarPorDocumento(documento: string) {
		try {
			return await Fornecedores.findOne({ documento });
		} catch (e: unknown) {

           
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            throw new Error("Erro inesperado");
        }
	}

	public async buscarPorNome(nome: string) {
		try {
			return await Fornecedores.find({
				nome: { $regex: new RegExp(nome, "i") },
			});
		} catch (e: unknown) {

           
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            throw new Error("Erro inesperado");
        }
	}

	public async atualizarPorId(id: string, dados: object) {
		try {
			return await Fornecedores.findByIdAndUpdate(id, dados, { new: true });
		} catch (e: unknown) {

           
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            throw new Error("Erro inesperado");
        }
	}

	public async listarTodos() {
		try {
			return await Fornecedores.find({});
		}catch (e: unknown) {

           
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            throw new Error("Erro inesperado");
        }

	}
}

export default new FornecedorModel();
