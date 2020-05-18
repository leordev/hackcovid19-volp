import * as Knex from "knex";

const TABLE_NAME = "donation";

export async function seed(knex: Knex): Promise<void> {
    await knex(TABLE_NAME).del();
    await knex.schema.raw(`ALTER SEQUENCE ${TABLE_NAME}_id_seq RESTART WITH 1000`);
    return knex(TABLE_NAME).insert([
        {
            id: 1,
            donator_id: 2,
            institution_id: 2,
            message: "Força nesse momento! TODOS JUNTOS!",
            service: "",
            amount: 500.48,
            receipt: "http://volp.github.io/receipts/124412.pdf",
            is_valid: false,
        },
        {
            id: 2,
            donator_id: 3,
            institution_id: 1,
            message: "Foi muito bom poder ajudar com o que eu sei.",
            service: `
            Doei uma landing page para a instuição com as seguintes funcionalidades:
            - Botão para arrecadar doações
            - listar as necessidades atuais
            - formulário de contato
            `,
            amount: 0.0,
            receipt: "http://arrecada-covid-19.volp.github.io",
            is_valid: true,
        },
    ]);
}
