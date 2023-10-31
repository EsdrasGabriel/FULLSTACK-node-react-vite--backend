import { StatusCodes } from "http-status-codes";
import { testServer } from "../../../../jest.setup";

describe("Cidades - Create", () => {
    let accessToken = "";
    beforeAll(async () => {
        const email = "Test@gmail.com";
        await testServer.post("/cadastrar").send({ nome: "Teste", email, senha: "123qwe" });
        const signInRes = await testServer.post("/entrar").send({ email, senha: "123qwe" });

        accessToken = signInRes.body.accessToken;
    });
    
    it ("Criar sem token de acesso", async () => {

        const res1 = await testServer
            .post("/cidades")
            .send({
                nome: "Surubim"
            });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty("errors.default");
    });
    it ("Criar registro", async () => {

        const res1 = await testServer
            .post("/cidades")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nome: "Surubim"
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
    });
    it ("Não pode criar registro com nome muito curto ou sem nome", async () => {

        const res1 = await testServer
            .post("/cidades")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nome: "Su"
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.nome");
    });
});
