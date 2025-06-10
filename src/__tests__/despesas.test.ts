import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import { connectDatabase } from "../database";

beforeAll(async () => {
    await connectDatabase("mongodb://localhost:27017/vendas_test_");
});

afterAll(async () => {
    //await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe("Despesas API", () => {

    let despesaId: string;

    it("deve cadastrar uma nova despesa", async () => {
        const response = await request(app).post("/despesas").send({
            valor: 100.5,
            dataMovimentacao: "2025-05-10T12:00:00.000Z",
            categoria: "compra",
            formaPagamento: "pix",
            descricao: "Compra de óleo",
            fornecedorId: "123",
            fornecedorNome: "Distribuidora XPTO"
        });

        expect(response.status).toBe(200);
        expect(response.body.dados).toHaveProperty("_id");

        despesaId = response.body.dados._id;
    });

    it("deve buscar a despesa pelo ID", async () => {
        const response = await request(app).get(`/despesas/${despesaId}`);
        expect(response.status).toBe(200);
        expect(response.body.dados._id).toBe(despesaId);
    });

    it("deve atualizar a despesa", async () => {
        const response = await request(app).put(`/despesas/${despesaId}`).send({
            descricao: "Compra atualizada",
            valor: 150.75
        });

        expect(response.status).toBe(200);
        expect(response.body.dados.descricao).toBe("Compra atualizada");
    });

    it("deve listar todas as despesas", async () => {
        const response = await request(app).get("/despesas");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.dados)).toBe(true);
    });

    it("deve filtrar por categoria", async () => {
        const response = await request(app).get("/despesas-filtro?categoria=compra");
        expect(response.status).toBe(200);
        expect(response.body.dados.length).toBeGreaterThan(0);
    });
});
