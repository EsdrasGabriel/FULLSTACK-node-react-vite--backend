import { StatusCodes } from "http-status-codes";
import { testServer } from "../../../../jest.setup";

describe("Cidades - Get All", () => {
    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post("/cidades")
            .send({ nome: "surubim" });

        cidadeId = resCidade.body;
    });

    it ("Buscar todos os registros", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({ 
                nomeCompleto: "Esdras Gabriel",
                email: "esdras@gmail.com",
                cidadeId,
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get("/pessoas")
            .send();

        expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});