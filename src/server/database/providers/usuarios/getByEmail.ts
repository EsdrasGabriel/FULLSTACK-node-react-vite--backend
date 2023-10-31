import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models";

export const getById = async (email: string): Promise<IUsuario | Error> => {
    try {
        const result = await Knex(ETableNames.usuario)
            .select("*")
            .where("email", "=", email)
            .first();
        
        if (result) return result;
        
        return new Error("Registro não encontrado");
    } catch (err) {
        console.log(err);
        return new Error("Erro ao tentar achar registro");
    }
};