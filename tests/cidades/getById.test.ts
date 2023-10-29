import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Get By Id", () => {
    it("Busca com um id valido", async () => {
        const res1 = await testServer.get("/cidades/1");

        expect(res1.statusCode).toEqual(StatusCodes.OK);
    });
    it("Busca com um id inválido", async () => {
        const res1 = await testServer.get("/cidades/0");

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.params.id");
    });
});
