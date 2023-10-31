import { StatusCodes } from "http-status-codes";
import { testServer } from "../../../../jest.setup";

describe("Pessoas - Create", () => {
    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post("/cidades")
            .send({ nome: "surubim" });

        cidadeId = resCidade.body;
    });

    it ("Criar registro", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "Esdras Gabriel",
                email: "esdras@gmail.com",
                cidadeId,
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
    });
    it ("Cadastrar registro 2", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "Esdras Gabriel",
                email: "esdras2@gmail.com",
                cidadeId,
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
    });
    it ("Tenta criar registro com email duplicado", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "Esdras Gabriel",
                email: "esdrasduplicado@gmail.com",
                cidadeId,
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
        
        const res2 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "Esdras Gabriel",
                email: "esdrasduplicado@gmail.com",
                cidadeId,
            });
        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty("errors.default");
    });
    it ("Tenta criar registro com nomeCompleto muito curto", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "Es",
                email: "esdrasduplicado@gmail.com",
                cidadeId,
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.nomeCompleto");        
    });
    it ("Tenta criar registro sem o nomeCompleto", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({
                email: "esdrasduplicado@gmail.com",
                cidadeId,
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.nomeCompleto");        
    });
    it ("Tenta criar registro sem o email", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "Esdras Gabriel",
                cidadeId,
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.email");        
    });
    it ("Tenta criar registro com o email inválido", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "Esdras Gabriel",
                email: "esdras gabriel@gmail.com",
                cidadeId,
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.email");        
    });
    it ("Tenta criar registro sem cidadeId", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "Esdras Gabriel",
                email: "esdras@gmail.com",
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.cidadeId");        
    });
    it ("Tenta criar registro com cidadeId inexistente", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "Esdras Gabriel",
                email: "esdras@gmail.com",
                cidadeId: 99999,
            });
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });
    it ("Tenta criar registro com cidadeId inválido", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "Esdras Gabriel",
                email: "esdras gabriel@gmail.com",
                cidadeId: "teste",
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.cidadeId");        
    });
    it ("Tenta criar registro sem enviar nenhuma propriedade", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({});
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.nomeCompleto");        
        expect(res1.body).toHaveProperty("errors.body.email");        
        expect(res1.body).toHaveProperty("errors.body.cidadeId");        
    });
});
