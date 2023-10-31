import { StatusCodes } from "http-status-codes";
import { testServer } from "../../../../jest.setup";

describe("Usuarios - Sign In", () => {
    beforeAll(async () => {
        await testServer.post("/cadastrar").send({
            nome: "Esdras Gabriel",
            email: "esdras@gmail.com",
            senha: "123qwe",
        });
    });

    it("Login válido", async () => {
        const res1 = await testServer.post("/entrar").send({
            email: "esdras@gmail.com",
            senha: "123qwe",
        });

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body).toHaveProperty("accessToken");
    });
    it("Login sem email", async () => {
        const res1 = await testServer.post("/entrar").send({
            senha: "123qwe",
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.email");
    });
    it("Login sem senha", async () => {
        const res1 = await testServer.post("/entrar").send({
            email: "esdras@gmail.com",
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.senha");
    });
    it("Login com email inváido", async () => {
        const res1 = await testServer.post("/entrar").send({
            email: "esdras gabriel@gmail.com",
            senha: "123qwe",
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.email");
    });
    it("Login com senha inválida", async () => {
        const res1 = await testServer.post("/entrar").send({
            email: "esdras@gmail.com",
            senha: "123qwe123",
        });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty("errors.default");
    });
    it("Login com email inexistente", async () => {
        const res1 = await testServer.post("/entrar").send({
            email: "esdrasgabriel@gmail.com",
            senha: "123qwe",
        });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty("errors.default");
    });
    it("Login com senha muito curta", async () => {
        const res1 = await testServer.post("/entrar").send({
            email: "esdras@gmail.com",
            senha: "123",
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.senha");
    });
    
});
