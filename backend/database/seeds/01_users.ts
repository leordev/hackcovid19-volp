import * as Knex from "knex";

const TABLE_NAME = "user";

export async function seed(knex: Knex): Promise<void> {
    await knex(TABLE_NAME).del();
    await knex.schema.raw(`ALTER SEQUENCE ${TABLE_NAME}_id_seq RESTART WITH 1000`);
    return knex(TABLE_NAME).insert([
        {
            id: 1,
            name: "Leo Ribeiro",
            birthdate: "1990-02-25",
            email: "leo@hackcovid-volp.com",
            unique_document: "12345678900",
            is_helper: true,
            profile_picture: "https://picsum.photos/80",
        },
        {
            id: 2,
            name: "Philipe Lopes",
            birthdate: "1990-02-14",
            email: "philipe@hackcovid-volp.com",
            unique_document: "12345678902",
            is_helper: false,
            profile_picture: "https://picsum.photos/80",
        },
        {
            id: 3,
            name: "Gabriel Vaz",
            birthdate: "1998-05-05",
            email: "gabe@hackcovid-volp.com",
            unique_document: "12345678903",
            is_helper: true,
            profile_picture: "https://picsum.photos/80",
        },
        {
            id: 4,
            name: "Julio Damigo",
            birthdate: "1989-10-23",
            email: "juliao@hackcovid-volp.com",
            unique_document: "12345678904",
            is_helper: false,
            profile_picture: "https://picsum.photos/80",
        },
        {
            id: 5,
            name: "Ana Maria",
            birthdate: "1979-05-23",
            email: "anamaria@hackcovid-volp.com",
            unique_document: "12345678905",
            is_helper: false,
            profile_picture: "https://picsum.photos/80",
        },
        {
            id: 6,
            name: "Roberto Silva",
            birthdate: "1969-04-11",
            email: "rsilva@hackcovid-volp.com",
            unique_document: "12345678906",
            is_helper: true,
            profile_picture: "https://picsum.photos/80",
        },
        {
            id: 7,
            name: "Jorge Silva",
            birthdate: "1975-01-02",
            email: "jorgesilva@hackcovid-volp.com",
            unique_document: "12345678907",
            is_helper: false,
            profile_picture: "https://picsum.photos/80",
        },
    ]);
}
