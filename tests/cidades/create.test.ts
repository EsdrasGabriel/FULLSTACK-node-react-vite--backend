import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Create", () => {
    it ("Criar registro", async () => {

        const res1 = await testServer
            .post("/cidades")
            .send({
                nome: "Surubim"
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
    });
    it ("Não pode criar registro com nome muito curto ou sem nome", async () => {

        const res1 = await testServer
            .post("/cidades")
            .send({
                nome: "Su"
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.nome");
    });
});
