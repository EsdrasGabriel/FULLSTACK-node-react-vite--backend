import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Get All", () => {
    it ("Recebeu os dados corretamente", async () => {
        const res1 = await testServer.get("/cidades");

        expect(res1.statusCode).toEqual(StatusCodes.OK);
    });
    it ("tentou passar uma pagina menor ou igual a 0", async () => {
        const res1 = await testServer.get("/cidades?page=0");

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.query.page");
    });
    it ("tentou passar um limite menor ou igual a 0", async () => {
        const res1 = await testServer.get("/cidades?limit=0");

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.query.limit");
    });
    it ("tentou passar um filtro muito curto", async () => {
        const res1 = await testServer.get("/cidades?filter=");

        expect(res1.statusCode).toEqual(StatusCodes.OK);
    });
    it ("tentou passar uma pagina e um limite menor ou igual a 0", async () => {
        const res1 = await testServer.get("/cidades?page=0&limit=0");

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.query");
    });
});