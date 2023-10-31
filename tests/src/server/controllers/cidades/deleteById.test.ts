import { StatusCodes } from "http-status-codes";
import { testServer } from "../../../../jest.setup";

describe("Cidades - Delete By Id", () => {
    let accessToken = "";
    beforeAll(async () => {
        const email = "Test@gmail.com";
        await testServer.post("/cadastrar").send({ nome: "Teste", email, senha: "123qwe" });
        const signInRes = await testServer.post("/entrar").send({ email, senha: "123qwe" });

        accessToken = signInRes.body.accessToken;
    });

    it ("Deletar sem token de acesso", async () => {
        const resApagada = await testServer
            .delete("/cidades/1")
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resApagada.body).toHaveProperty("errors.default");
    });
    it ("Deletar Registro Existente", async () => {
        const res1 = await testServer
            .post("/cidades")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: "Surubim"});

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/cidades/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it ("Deletar Registro Inexistente", async () => {

        const res1 = await testServer
            .delete("/cidades/99999")
            .set({ Authorization: `Bearer ${accessToken}` });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.default");
    });
});
