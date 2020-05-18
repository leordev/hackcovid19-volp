import * as Knex from "knex";

const TABLE_NAME = "user";

export function up(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments("id").primary();
        table.text("name").notNullable();
        table.date("birthdate").notNullable();
        table.text("email").notNullable();
        table.string("unique_document").notNullable();
        table.boolean("is_helper").notNullable();
        table.text("profile_picture").notNullable();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo("epoch");

        table.unique(["email"]);

        // speed up searches from emails
        table.index("email");
    });
}

export function down(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.dropTable(TABLE_NAME);
}
