import { StatusCodes } from "http-status-codes";
import { testServer } from "../../../../jest.setup";

describe("Cidades - Update By Id", () => {
    it ("Atualizar Registro", async () => {

        const res1 = await testServer
            .post("/cidades/")
            .send({
                nome: "Surubim"
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .send({ nome: "Surubim" });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it ("Tentativa de atualizar registro inexistente", async () => {

        const res1 = await testServer
            .put("/cidades/99999")
            .send({ nome: "Surubim" });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });
    
});
