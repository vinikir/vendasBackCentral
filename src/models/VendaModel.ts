import VendaSchema, { VendaInterface, VendaType } from "../schemas/Venda";
import moment from "moment-timezone";
import {  Types } from "mongoose";

class VendaModel {

    public async busca(dataInicio?: string, dataFinal?: string): Promise<VendaInterface[]> {
        try {
            const busca: Record<string, any> = { status: "finalizado" };

            if (dataInicio !== undefined && dataFinal !== undefined) {
                const dataInicioFormatada = `${dataInicio}T00:00:00.000-03:00`;
                const dataFinalFormatada = `${dataFinal}T23:59:59.999-03:00`;

                busca.data = {
                    $gte: new Date(dataInicioFormatada),
                    $lte: new Date(dataFinalFormatada),
                };
            }

            return await VendaSchema.find(busca).sort({ vendaId: -1 });
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw new Error(e.message);
            }
            throw new Error("Erro inesperado");
        }
    }

    public async buscaProVendedor(dataInicio: string | undefined, dataFinal: string | undefined, vendedorId: string): Promise<VendaInterface[]> {
        try {
            const busca: Record<string, any> = { funcionarioId: vendedorId };

            if (dataInicio !== undefined && dataFinal !== undefined) {
                const dataInicioFormatada = `${dataInicio}T00:00:00.000-03:00`;
                const dataFinalFormatada = `${dataFinal}T23:59:59.999-03:00`;

                busca.data = {
                    $gte: new Date(dataInicioFormatada),
                    $lte: new Date(dataFinalFormatada),
                };
            }

            return await VendaSchema.find(busca).sort({ vendaId: -1 });
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw new Error(e.message);
            }
            throw new Error("Erro inesperado");
        }
    }

    public async salvar(infos: Record<string, any>): Promise<VendaInterface> {
        let id = 1;

        try {
            const ultimaVenda = await VendaSchema.findOne({}).sort({ vendaId: -1 });

            if (ultimaVenda != null && typeof ultimaVenda.vendaId !== "undefined") {
                id = ultimaVenda.vendaId + 1;
            }

            infos.vendaId = id;

            return await VendaSchema.create(infos);
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw new Error(e.message);
            }
            throw new Error("Erro inesperado");
        }
    }

    public async buscarPorArray(vendaIds: Types.ObjectId[] | string[]): Promise<VendaInterface[]> {
        try {
            const vendas = await VendaSchema.find({ _id: { $in: vendaIds } });
            return vendas;
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw new Error(e.message);
            }
            throw new Error("Erro inesperado");
        }
    }

   
}

export default new VendaModel()
