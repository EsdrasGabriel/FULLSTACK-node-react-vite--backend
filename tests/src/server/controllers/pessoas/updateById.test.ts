import { StatusCodes } from "http-status-codes";
import { testServer } from "../../../../jest.setup";

describe("Cidades - Update By Id", () => {
    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post("/cidades")
            .send({ nome: "surubim" });

        cidadeId = resCidade.body;
    });
    
    it ("Atualizar Registro", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({ 
                nomeCompleto: "Esdras Gabriel",
                email: "esdras@gmail.com",
                cidadeId
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        
        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
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
            .send({ 
                nomeCompleto: "Esdras Gabriel",
                email: "esdras@gmail.com",
                cidadeId, 
            });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });
    
});
