import { StatusCodes } from "http-status-codes";
import { testServer } from "../../../../jest.setup";

describe("Cidades - Get By Id", () => {
    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post("/cidades")
            .send({ nome: "surubim" });

        cidadeId = resCidade.body;
    });
    
    it("Busca registro por id", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({ 
                nomeCompleto: "Esdras Gabriel",
                email: "esdras@gmail.com",
                cidadeId,
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get(`/pessoas/${res1.body}`)
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty("nomeCompleto");
    });
    it("Busca com um id inexistente", async () => {
        const res1 = await testServer
            .get("/pessoas/99999")
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });
});
