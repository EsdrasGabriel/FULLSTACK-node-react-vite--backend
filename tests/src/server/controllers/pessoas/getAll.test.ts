import { StatusCodes } from "http-status-codes";
import { testServer } from "../../../../jest.setup";

describe("Pessoas - Get All", () => {
    let accessToken = "";
    beforeAll(async () => {
        const email = "Test@gmail.com";
        await testServer.post("/cadastrar").send({ nome: "Teste", email, senha: "123qwe" });
        const signInRes = await testServer.post("/entrar").send({ email, senha: "123qwe" });
    
        accessToken = signInRes.body.accessToken;
    });

    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post("/cidades")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: "surubim" });
        
        cidadeId = resCidade.body;
    });

    it ("Buscar todos os registros sem token de acesso", async () => {
        const resBuscada = await testServer
            .get("/pessoas")
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resBuscada.body).toHaveProperty("errors.default");
    });
    it ("Buscar todos os registros", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ 
                nomeCompleto: "Esdras Gabriel",
                email: "esdras@gmail.com",
                cidadeId,
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get("/pessoas")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});