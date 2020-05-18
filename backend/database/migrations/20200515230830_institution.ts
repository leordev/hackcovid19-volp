import * as Knex from "knex";

const TABLE_NAME = "institution";

export function up(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments("id").primary();
        table.text("name").notNullable();
        table.text("unique_document").notNullable();
        table.integer("owner_id").notNullable();
        table.text("description").notNullable();
        table.text("bank_info").notNullable();
        table.text("profile_picture").notNullable();
        table.text("website_url").notNullable();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

        table.unique(["unique_document"]);

        table.index(["owner_id"]);

        table.foreign("owner_id").references("user.id");
    });
}

export function down(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.dropTable(TABLE_NAME);
}
