import { StatusCodes } from "http-status-codes";
import { testServer } from "../../../../jest.setup";

describe("Cidades - Update By Id", () => {
    let accessToken = "";
    beforeAll(async () => {
        const email = "Test@gmail.com";
        await testServer.post("/cadastrar").send({ nome: "Teste", email, senha: "123qwe" });
        const signInRes = await testServer.post("/entrar").send({ email, senha: "123qwe" });

        accessToken = signInRes.body.accessToken;
    });

    it ("Atualizar Registro sem token de acesso", async () => {
        const resAtualizada = await testServer
            .put("/cidades/1")
            .send({ nome: "Surubim" });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resAtualizada.body).toHaveProperty("errors.default");
    });
    it ("Atualizar Registro", async () => {

        const res1 = await testServer
            .post("/cidades/")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nome: "Surubim"
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: "Surubim" });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it ("Tentativa de atualizar registro inexistente", async () => {

        const res1 = await testServer
            .put("/cidades/99999")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: "Surubim" });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.default");
    });
    
});
