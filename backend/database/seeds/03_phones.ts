import * as Knex from "knex";

const TABLE_NAME = "phone_number";

export async function seed(knex: Knex): Promise<void> {
    await knex(TABLE_NAME).del();
    await knex.schema.raw(`ALTER SEQUENCE ${TABLE_NAME}_id_seq RESTART WITH 1000`);
    return knex(TABLE_NAME).insert([
        {
            id: 1,
            type: 1,
            entity_id: 1,
            phone: "21999998880",
        },
        {
            id: 2,
            type: 1,
            entity_id: 2,
            phone: "21999998881",
        },
        {
            id: 3,
            type: 1,
            entity_id: 3,
            phone: "21999998882",
        },
        {
            id: 4,
            type: 1,
            entity_id: 4,
            phone: "21999998883",
        },
        {
            id: 5,
            type: 1,
            entity_id: 5,
            phone: "21999998884",
        },
        {
            id: 6,
            type: 1,
            entity_id: 6,
            phone: "21999998885",
        },
        {
            id: 7,
            type: 2,
            entity_id: 1,
            phone: "21999998886",
        },
        {
            id: 8,
            type: 2,
            entity_id: 2,
            phone: "21999998887",
        },
        {
            id: 9,
            type: 1,
            entity_id: 7,
            phone: "21999998888",
        },
        {
            id: 10,
            type: 2,
            entity_id: 3,
            phone: "21999998889",
        },
    ]);
}
