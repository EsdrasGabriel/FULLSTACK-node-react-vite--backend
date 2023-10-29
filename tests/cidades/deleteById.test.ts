import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Delete By Id", () => {
    it ("Deletar Registro", async () => {

        const res1 = await testServer
            .delete("/cidades/1");

        expect(res1.statusCode).toEqual(StatusCodes.OK);
    });
    it ("Tentativa de deletar registro com id inválido", async () => {

        const res1 = await testServer
            .delete("/cidades/0");

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.params.id");
    });
});
