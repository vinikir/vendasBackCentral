import Aportes from "../schemas/Aportes";

class AporteModel {

    public async salvar(infos: object) {

        try {

            return await Aportes.create(infos)

        } catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }

    }

    public async busca () {
        try{

            return await Aportes.find({})
            
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

export default new AporteModel()
