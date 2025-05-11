import Aportes from "../schemas/Aportes";

class AporteModel {

    public async salvar(infos: object) {

        try {

            return await Aportes.create(infos)

        } catch (e) {

            throw new Error(e.message);

        }

    }

    public async busca () {
        try{

            return await Aportes.find({})
            
        } catch (e) {

            throw new Error(e.message);

        }

      
    }
}

export default new AporteModel()
