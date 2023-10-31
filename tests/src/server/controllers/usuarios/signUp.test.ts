import { StatusCodes } from "http-status-codes";
import { testServer } from "../../../../jest.setup";

describe("Usuarios - Sign Up", () => {
    it("Cadastrar usuario 1", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "Esdras Gabriel",
            email: "esdras@gmail.com",
            senha: "123qwe",
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
    });
    it("Cadastrar usuario 2", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "Esdras Gabriel Farias",
            email: "esdrasgab@gmail.com",
            senha: "123qwe",
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
    });
    it("Não pode criar um usuario com email dupicado", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "Esdras Gabriel",
            email: "esdrasdupicado@gmail.com",
            senha: "123qwe",
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");

        const res2 = await testServer.post("/cadastrar").send({
            nome: "Esdras Gabriel Farias",
            email: "esdrasdupicado@gmail.com",
            senha: "123qwe",
        });

        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty("errors.default");
    });
    it("Não pode criar usuário sem nome", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            email: "esdras@gmail.com",
            senha: "123qwe",
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.nome");
    });
    it("Não pode criar usuário sem email", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "Esdras Gabriel",
            senha: "123qwe",
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.email");
    });
    it("Não pode criar usuário sem senha", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "Esdras Gabriel",
            email: "esdras gabriel@gmail.com",
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.senha");
    });
    it("Não pode criar usuário com nome muito curto", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "Es",
            email: "esdras@gmail.com",
            senha: "123qwe",
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.nome");
    });
    it("Não pode criar usuário com email inválido", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "Esdras Gabriel",
            email: "esdras gabriel@gmail.com",
            senha: "123qwe",
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.email");
    });
    it("Não pode criar usuário com senha muito curta", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "Esdras Gabriel",
            email: "esdras gabriel@gmail.com",
            senha: "123",
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.senha");
    });
});
