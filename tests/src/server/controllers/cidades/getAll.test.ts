import { StatusCodes } from "http-status-codes";
import { testServer } from "../../../../jest.setup";

describe("Cidades - Get All", () => {
    let accessToken = "";
    beforeAll(async () => {
        const email = "Test@gmail.com";
        await testServer.post("/cadastrar").send({ nome: "Teste", email, senha: "123qwe" });
        const signInRes = await testServer.post("/entrar").send({ email, senha: "123qwe" });

        accessToken = signInRes.body.accessToken;
    });

    it ("Buscar sem token de acesso", async () => {
        const resBuscada = await testServer
            .get("/cidades")
            .send();
        
        expect(resBuscada.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resBuscada.body).toHaveProperty("errors.default");
    });
    it ("Buscar todos os registros", async () => {
        const res1 = await testServer
            .post("/cidades")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: "Surubim"});

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get("/cidades")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});