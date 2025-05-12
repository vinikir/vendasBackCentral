import moment from "moment-timezone";
import GrupoProduto from "../schemas/GrupoProduto";
import Produto from "../schemas/Produto";

class GrupoProdutosModel {

    public async salvar(nome: string) {

        try {
            
            let id = 1
            let infos = {nome:nome, id:id}

            const existe = await GrupoProduto.find({nome: { 
                $regex: new RegExp( nome, 'i') 
            }}).sort({ id: -1 })

            if(existe.length > 0){
                throw new Error("Produto já cadastrado.");
            }
            
            const ultimaMovimentacao = await GrupoProduto.findOne({}).sort({ id: -1 })

            if (ultimaMovimentacao != null && typeof ultimaMovimentacao.id != "undefined") {
                id = ultimaMovimentacao.id + 1
            }

            infos.id = id
           
            return await GrupoProduto.create(infos)

        } catch (e) {

            console.log(e)
            throw new Error(e.message);

        }

    }

    public async busca( nome: string) {

        try {
           
            return await GrupoProduto.find({nome: { 
                $regex: new RegExp( nome, 'i') 
            }}).sort({ nome: 1 })

        } catch (e) {

            console.log(e)
            throw new Error(e.message);

        }

    }

    

}

export default new GrupoProdutosModel()
