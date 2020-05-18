import * as Knex from "knex";

const TABLE_NAME = "address";

export async function seed(knex: Knex): Promise<void> {
    await knex(TABLE_NAME).del();
    await knex.schema.raw(`ALTER SEQUENCE ${TABLE_NAME}_id_seq RESTART WITH 1000`);
    return knex(TABLE_NAME).insert([
        {
            id: 1,
            type: 2,
            entity_id: 1,
            address1: "Rua Alzira Brandão, 281",
            address2: "Tijuca",
            city: "Rio de Janeiro",
            state: "RJ",
            zip_code: "20520070",
            country: "BR",
            latitude: -22.9201,
            longitude: -43.22504,
        },
        {
            id: 2,
            type: 2,
            entity_id: 2,
            address1: "Rua São Francisco Xavier, 75",
            address2: "Tijuca",
            city: "Rio de Janeiro",
            state: "RJ",
            zip_code: "20550012",
            country: "BR",
            latitude: -22.91657,
            longitude: -43.226,
        },
        {
            id: 3,
            type: 2,
            entity_id: 3,
            address1: "Rua Conde de Bonfim, 1033",
            address2: "Tijuca",
            city: "Rio de Janeiro",
            state: "RJ",
            zip_code: "20530001",
            country: "BR",
            latitude: -22.938277,
            longitude: -43.250622,
        },
        {
            id: 4,
            type: 1,
            entity_id: 2,
            address1: "Rua Morais e Silva, 51",
            address2: "Apto Play, Bl 3, Tijuca",
            city: "Rio de Janeiro",
            state: "RJ",
            zip_code: "20271030",
            country: "BR",
            latitude: -22.9315801,
            longitude: -43.2587466,
        },
        {
            id: 5,
            type: 1,
            entity_id: 1,
            address1: "Rua Morais e Silva, 51",
            address2: "Apto 1004, Bl 1, Tijuca",
            city: "Rio de Janeiro",
            state: "RJ",
            zip_code: "20271030",
            country: "BR",
            latitude: -22.931682,
            longitude: -43.258847,
        },
    ]);
}
