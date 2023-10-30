import { StatusCodes } from "http-status-codes";
import { testServer } from "../../../../jest.setup";

describe("Cidades - Delete By Id", () => {
    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post("/cidades")
            .send({ nome: "surubim" });

        cidadeId = resCidade.body;
    });
    
    it ("Deletar Registro Existente", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({ 
                nomeCompleto: "Esdras Gabriel",
                email: "esdras@gmail.com",
                cidadeId,
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/cidades/${res1.body}`)
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it ("Deletar Registro Inexistente", async () => {

        const res1 = await testServer
            .delete("/pessoas/99999")
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });
});
