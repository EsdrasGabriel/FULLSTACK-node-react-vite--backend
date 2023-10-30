import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const count = async (filter = ""): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.pessoa)
            .where("nomeCompleto", "like", `%${filter}%`)
            .count<[{ count: number }]>("* as count");
        
        if (Number.isInteger(count)) return count;

        return new Error("Erro ao consultar a quantidade total de registros");
    } catch (err) {
        console.log(err);
        return new Error("Erro ao consultar a quantidade total de registros");
    }
};