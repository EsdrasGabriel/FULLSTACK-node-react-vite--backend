import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
    return knex.schema
        .createTable(ETableNames.usuario, (table) => {
            table.bigIncrements("id").primary().index();
            table.string("nome").notNullable().checkLength(">=", 3);
            table.string("email").unique().notNullable().checkLength(">=", 5);
            table.string("senha").index().notNullable().checkLength(">=", 6);

            table.comment("Tabela usada para armazenar usuários no sistema.");
        })
        .then(() => {
            console.log(`# Create Table ${ETableNames.usuario}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.usuario).then(() => {
        console.log(`# Dropped Table ${ETableNames.usuario}`);
    });
}
