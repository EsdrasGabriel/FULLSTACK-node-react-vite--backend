import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Update By Id", () => {
    it ("Atualizar Registro", async () => {

        const res1 = await testServer
            .put("/cidades/1")
            .send({
                nome: "Surubim"
            });

        expect(res1.statusCode).toEqual(StatusCodes.OK);
    });
    it ("Tentativa de atualizar com id inválido", async () => {

        const res1 = await testServer
            .put("/cidades/0")
            .send({
                nome: "Surubim"
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.params.id");
    });
    it ("Tentativa de atualizar com nome inválido", async () => {

        const res1 = await testServer
            .put("/cidades/1")
            .send({
                nome: "Su"
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.nome");
    });
    it ("Tentativa de atualizar com id e nome inválido", async () => {

        const res1 = await testServer
            .put("/cidades/0")
            .send({
                nome: "Su"
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.params.id");
        expect(res1.body).toHaveProperty("errors.body.nome");
    });
});
