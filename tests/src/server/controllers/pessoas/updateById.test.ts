import { StatusCodes } from "http-status-codes";
import { testServer } from "../../../../jest.setup";

describe("Pessoas - Update By Id", () => {
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
    
    it ("Atualizar registro sem token de acesso", async () => {
        const resAtualizada = await testServer
            .put("/pessoas/1")
            .send({ 
                nomeCompleto: "Maria Clara",
                email: "esdras@gmail.com",
                cidadeId,
            });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resAtualizada.body).toHaveProperty("errors.default");
    });
    it ("Atualizar Registro", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ 
                nomeCompleto: "Esdras Gabriel",
                email: "esdras@gmail.com",
                cidadeId
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        
        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ 
                nomeCompleto: "Maria Clara",
                email: "esdras@gmail.com",
                cidadeId,
            });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it ("Tentativa de atualizar registro inexistente", async () => {
        const res1 = await testServer
            .put("/pessoas/99999")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ 
                nomeCompleto: "Esdras Gabriel",
                email: "esdras@gmail.com",
                cidadeId, 
            });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });
    
});
